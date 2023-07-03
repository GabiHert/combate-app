import { PermissionsAndroid } from 'react-native';
import { CONSTANTS } from '../../internal/config/config';
import { RequestDto } from '../../internal/core/dto/request-dto';
import { ResponseDto } from '../../internal/core/dto/response-dto';
import { EventEnum } from '../../internal/core/enum/event';
import { ProtocolVersion, ProtocolVersionEnum } from '../../internal/core/enum/protocol-version';
import { DoseProcessTimeOut, GenericErrorType, GpsErrorType, MaxVelocityErrorType, PermissionsErrorType, ValidationErrorType } from '../../internal/core/error/error-type';
import { CbServiceFactory } from '../../internal/core/factory/cb-service-factory';
import { RequestFactory } from '../../internal/core/factory/request-factory';
import { PCbService } from '../../internal/core/port/cb-service-port';
import { PCsvTableService } from '../../internal/core/port/csv-table-service-port';
import { PLogger } from '../../internal/core/port/logger-port';
import { ProtocolRules } from '../../internal/core/rules/protocol-rules';
import { PCombateApp } from '../port/combate-app-port';

export class CombateApp implements PCombateApp {
  private _doseCallback: (done: number, target: number) => void;
  private _protocolVersion: ProtocolVersion;
  private _cbService: PCbService;
  private _filePath: string;
  private _lastRequestTime;
  private _systematicMetersBetweenDose: number;


  constructor(
    private readonly _logger: PLogger,
    private readonly _cbServiceFactory: CbServiceFactory,
    private readonly _csvTableService: PCsvTableService,
    private readonly _requestFactory: RequestFactory,
    private readonly _protocolRules: ProtocolRules
  ) {}

  private async _syncProtocolVersion(requestDto: RequestDto): Promise<void> {
    const request = this._requestFactory.factory(requestDto, ProtocolVersionEnum.V4);
    const cbV4Service = this._cbServiceFactory.factory(ProtocolVersionEnum.V4);
    const responseDto = await cbV4Service.request(request);
    this._lastRequestTime = new Date().getTime();
    this._protocolVersion = this._protocolRules.getProtocolVersion(responseDto);
    this._cbService = this._cbServiceFactory.factory(this._protocolVersion);
  }

  async permissions() {
    this._logger.info({
      event: 'CombateApp.permissions',
      details: 'Process started',
    });

    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Pernissão para escrita de arquivos',
        message: 'O aplicativo necessita desta autorização para realizar a escrita de arquivos.',
        buttonNegative: 'Negar',
        buttonPositive: 'OK',
      }
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new PermissionsErrorType(CONSTANTS.ERRORS.PERMISSIONS.WRITE_STORAGE_PERMISSION);
    }

    this._logger.info({
      event: 'CombateApp.permissions',
      details: 'Process finished',
    });
  }

  async begin(
    filePath: string,
    systematicMetersBetweenDose: number,
    doseCallback?: (done: number, target: number) => void
  ): Promise<void> {
    this._logger.info({
      event: 'CombateApp.begin',
      details: 'Process started',
      filePath,
      systematicMetersBetweenDose,
      doseCallback: doseCallback != undefined,
    });

    this._filePath = filePath;
    this._systematicMetersBetweenDose = systematicMetersBetweenDose;
    this._doseCallback = doseCallback;
    await this._csvTableService.begin(this._filePath);
    this._logger.info({
      event: 'CombateApp.begin',
      details: 'Process finished',
    });
  }

  async request(requestDto: RequestDto): Promise<ResponseDto> {
    try {
      this._logger.info({
        event: 'CombateApp.request',
        details: 'Process started',
        requestDto,
      });

      if (!this._cbService || !this._protocolVersion) {
        await this._syncProtocolVersion(requestDto);
        this._cbService = this._cbServiceFactory.factory(this._protocolVersion);
      }

      const request = this._requestFactory.factory(requestDto, this._protocolVersion);

      const responseDto = await this._cbService.request(request, this._doseCallback);

      this._lastRequestTime = new Date().getTime();

      await this._csvTableService.insert(this._filePath,requestDto, responseDto);

      await this._appRules(responseDto, requestDto);

      this._logger.info({
        event: 'CombateApp.request',
        details: 'Process finished',
        responseDto,
      });
      return responseDto;
    } catch (err) {
      this._logger.error({
        event: 'CombateApp.request',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }

  private async _appRules(responseDto: ResponseDto, requestDto: RequestDto) {
    try {
      this._logger.info({
        event: 'CombateApp._appRules',
        details: 'Process started',
        requestDto,
        responseDto,
      });

      if (responseDto.errorCode != "000"){
        const errors = {
          "001":new ValidationErrorType("Validação requisição [CB]"),
          "002":new DoseProcessTimeOut("Dose demorando para finalizar [CB]"),
          "003":new GpsErrorType("GPS demorando para responder [CB]"),
        }
        if(errors[responseDto.errorCode]){
          throw new errors[responseDto.errorCode]
        }else{
          throw new GenericErrorType("Código de erro CB não mapeado ("+responseDto.errorCode+")")
        }
      }

      const velocity = Number(responseDto.gps.speed);

      if (velocity >= requestDto.maxVelocity) {
        throw new MaxVelocityErrorType(CONSTANTS.ERRORS.MAX_VELOCITY) 
      }

      const elapsedTimeH =( this._lastRequestTime - new Date().getTime())/3600000;
  
      const distanceM = (velocity * elapsedTimeH)/1000

      if (distanceM >= this._systematicMetersBetweenDose) {
        const systematicRequestDto = requestDto;
        systematicRequestDto.dose.amount = 1;
        systematicRequestDto.event = EventEnum.Systematic.name;
        await this.request(systematicRequestDto);
      }

      this._logger.info({
        event: 'CombateApp._appRules',
        details: 'Process finished',
      });
    } catch (err) {
      this._logger.error({
        event: 'CombateApp._appRules',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }
}
