import { RequestDto } from '../../internal/core/dto/request-dto';
import { ResponseDto } from '../../internal/core/dto/response-dto';
import { EventEnum } from '../../internal/core/enum/event';
import { ProtocolVersion, ProtocolVersionEnum } from '../../internal/core/enum/protocol-version';
import { PError } from '../../internal/core/error/error-port';
import { CbServiceFactory } from '../../internal/core/factory/cb-service-factory';
import { RequestFactory } from '../../internal/core/factory/request-factory';
import { PCbService } from '../../internal/core/port/cb-service-port';
import { PCsvTableService } from '../../internal/core/port/csv-table-service-port';
import { PLogger } from '../../internal/core/port/logger-port';
import { ProtocolRules } from '../../internal/core/rules/protocol-rules';
import { distanceCalculator } from '../../internal/core/utils/distance-caluclator';
import { PCombateApp } from '../port/combate-app-port';

export class CombateApp implements PCombateApp {
  private _doseCallback: (done: number, target: number) => void;
  private _protocolVersion: ProtocolVersion;
  private _cbService: PCbService;
  private _filePath: string;
  private _latitude: number;
  private _longitude: number;
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
    this._protocolVersion = this._protocolRules.getProtocolVersion(responseDto);
    this._latitude = responseDto.gps.latitude;
    this._longitude = responseDto.gps.longitude;
    this._cbService = this._cbServiceFactory.factory(this._protocolVersion);
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
    await this._csvTableService.save(this._filePath);
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

      this._csvTableService.insert(requestDto, responseDto);

      await this._appRules(responseDto, requestDto);

      if (requestDto.event === EventEnum.EndTrackPoint.name) {
        await this._csvTableService.save(this._filePath);
      }

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

      const velocity = Number(responseDto.gps.speed);
      let error: PError = undefined;

      const distance = distanceCalculator(
        this._latitude,
        this._longitude,
        responseDto.gps.latitude,
        responseDto.gps.longitude
      );

      this._latitude = responseDto.gps.latitude;
      this._longitude = responseDto.gps.longitude;

      if (velocity >= requestDto.maxVelocity) {
      }

      if (distance >= this._systematicMetersBetweenDose) {
        const systematicRequestDto = requestDto;
        systematicRequestDto.dose.amount = 1;
        systematicRequestDto.event = EventEnum.Systematic.name;
        await this.request(systematicRequestDto);
      }

      if (error) throw error;

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
