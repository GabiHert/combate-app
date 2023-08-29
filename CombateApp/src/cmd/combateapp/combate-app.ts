import { PermissionsAndroid } from "react-native";
import { CONSTANTS } from "../../internal/config/config";
import { RequestDto } from "../../internal/core/dto/request-dto";
import { ResponseDto } from "../../internal/core/dto/response-dto";
import { EventEnum } from "../../internal/core/enum/event";
import {
  ProtocolVersion,
  ProtocolVersionEnum,
} from "../../internal/core/enum/protocol-version";
import { PError } from "../../internal/core/error/error-port";
import { MaxVelocityErrorType } from "../../internal/core/error/error-type";
import { CbServiceFactory } from "../../internal/core/factory/cb-service-factory";
import { RequestFactory } from "../../internal/core/factory/request-factory";
import { PCbService } from "../../internal/core/port/cb-service-port";
import { PCsvTableService } from "../../internal/core/port/csv-table-service-port";
import { PLogger } from "../../internal/core/port/logger-port";
import { ProtocolRules } from "../../internal/core/rules/protocol-rules";
import { PCombateApp } from "../port/combate-app-port";

export class CombateApp implements PCombateApp {
  private _protocolVersion: ProtocolVersion;
  private _cbService: PCbService;
  private _filePath: string;
  private _lastRequestTime: number;
  private _velocityExceededRecord: Array<number>;
  private _systematicMetersBetweenDose: number;
  private _distanceRan: number;
  private _requestDto: RequestDto;
  private _responseDto: ResponseDto;

  constructor(
    private readonly _logger: PLogger,
    private readonly _cbServiceFactory: CbServiceFactory,
    private readonly _csvTableService: PCsvTableService,
    private readonly _requestFactory: RequestFactory,
    private readonly _protocolRules: ProtocolRules
  ) {
    this._velocityExceededRecord = [];
    this._distanceRan = 0;
  }

  private async _syncProtocolVersion(requestDto: RequestDto): Promise<void> {
    const requestDtoCpy = { ...requestDto };
    try {
      const request = this._requestFactory.factory(
        requestDtoCpy,
        ProtocolVersionEnum.V4
      );
      const cbV4Service = this._cbServiceFactory.factory(
        ProtocolVersionEnum.V4
      );
      const responseDto = await cbV4Service.request(request);
      this._lastRequestTime = new Date().getTime();
      this._protocolVersion =
        this._protocolRules.getProtocolVersion(responseDto);
      this._cbService = this._cbServiceFactory.factory(this._protocolVersion);
    } catch (err) {
      requestDtoCpy.newId = undefined;
      const request = this._requestFactory.factory(
        requestDtoCpy,
        ProtocolVersionEnum.V5
      );
      const cbV5Service = this._cbServiceFactory.factory(
        ProtocolVersionEnum.V5
      );
      const responseDto = await cbV5Service.request(request);
      this._lastRequestTime = new Date().getTime();
      this._protocolVersion =
        this._protocolRules.getProtocolVersion(responseDto);
      this._cbService = this._cbServiceFactory.factory(this._protocolVersion);
    }
  }

  async permissions() {
    this._logger.info({
      event: "CombateApp.permissions",
      details: "Process started",
    });

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Pernissão para escrita de arquivos",
        message:
          "O aplicativo necessita desta autorização para realizar a escrita de arquivos.",
        buttonNegative: "Negar",
        buttonPositive: "OK",
      }
    );

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Permissão para buscar dispositivos bluetooth ",
        message:
          "O aplicativo necessita desta autorização para buscar dispositivos bluetooth.",
        buttonNegative: "Negar",
        buttonPositive: "OK",
      }
    );

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Permissão para conexão com dispositivos bluetooth ",
        message:
          "O aplicativo necessita desta autorização para realizar a conexão bluetooth.",
        buttonNegative: "Negar",
        buttonPositive: "OK",
      }
    );

    this._logger.info({
      event: "CombateApp.permissions",
      details: "Process finished",
    });
  }

  async begin(
    filePath: string,
    systematicMetersBetweenDose: number
  ): Promise<void> {
    this._logger.info({
      event: "CombateApp.begin",
      details: "Process started",
      filePath,
      systematicMetersBetweenDose,
    });
    this._protocolVersion = undefined;
    this._cbService = undefined;
    this._filePath = filePath;
    this._systematicMetersBetweenDose = systematicMetersBetweenDose - 1;
    await this._csvTableService.begin(this._filePath);
    this._logger.info({
      event: "CombateApp.begin",
      details: "Process finished",
    });
  }

  async request(
    requestDto: RequestDto,
    doseCallback: (
      requestDto: RequestDto,
      responseDto: ResponseDto
    ) => Promise<void>
  ): Promise<ResponseDto> {
    try {
      this._logger.info({
        event: "CombateApp.request",
        details: "Process started",
        requestDto,
      });

      this._requestDto = requestDto;

      if (!this._cbService || !this._protocolVersion) {
        await this._syncProtocolVersion(requestDto);
        this._cbService = this._cbServiceFactory.factory(this._protocolVersion);
      }

      const request = this._requestFactory.factory(
        requestDto,
        this._protocolVersion
      );

      const responseDto = await this._cbService.request(request, doseCallback);

      this._responseDto = responseDto;

      await this._csvTableService.insert(
        this._filePath,
        requestDto,
        responseDto
      );

      await this._appRules(responseDto, requestDto, doseCallback);

      this._lastRequestTime = new Date().getTime();

      this._logger.info({
        event: "CombateApp.request",
        details: "Process finished",
        responseDto,
      });
      return this._responseDto;
    } catch (err) {
      this._logger.error({
        event: "CombateApp.request",
        details: "Process error",
        error: err.message,
      });
      if (err instanceof PError) {
        err.requestDto = this._requestDto;
        err.responseDto = this._responseDto;
      }
      throw err;
    }
  }

  private async _appRules(
    responseDto: ResponseDto,
    requestDto: RequestDto,
    doseCallback: (
      requestDto: RequestDto,
      responseDto: ResponseDto
    ) => Promise<void>
  ) {
    try {
      this._logger.info({
        event: "CombateApp._appRules",
        details: "Process started",
        requestDto,
        responseDto,
      });

      this._requestDto = requestDto;
      this._responseDto = responseDto;

      const velocity = Number(responseDto.gps.speed);

      const velocityMS = velocity / 3.6;
      const elapsedTimeS =
        (new Date().getTime() - this._lastRequestTime) / 1000;
      const distanceM = velocityMS * elapsedTimeS;

      this._distanceRan += distanceM;

      const metersBetweenDose = this._systematicMetersBetweenDose - velocityMS;

      if (this._requestDto.dose && this._requestDto.dose.amount > 0) {
        this._distanceRan = 0;
      } else if (this._distanceRan >= metersBetweenDose) {
        this._requestDto.dose = {
          amount: 1,
          centerApplicator: this._responseDto.centerApplicator,
          leftApplicator: this._responseDto.leftApplicator,
          rightApplicator: this._responseDto.rightApplicator,
        };
        this._requestDto.event = EventEnum.Systematic.name;
        const request = this._requestFactory.factory(
          this._requestDto,
          this._protocolVersion
        );
        this._distanceRan = 0;

        const responseDto = await this._cbService.request(
          request,
          doseCallback
        );

        this._lastRequestTime = new Date().getTime();

        this._responseDto = responseDto;

        await this._csvTableService.insert(
          this._filePath,
          requestDto,
          responseDto
        );
      }

      if (velocity < requestDto.maxVelocity) {
        this._velocityExceededRecord = [];
      } else {
        this._velocityExceededRecord.push(velocity);
      }

      if (this._velocityExceededRecord.length >= 4) {
        let sum = 0;
        this._velocityExceededRecord.forEach((v) => {
          sum += v;
        });
        const average = sum / this._velocityExceededRecord.length;
        this._velocityExceededRecord = [];

        if (average >= requestDto.maxVelocity) {
          throw new MaxVelocityErrorType(CONSTANTS.ERRORS.MAX_VELOCITY);
        }
      }

      this._logger.info({
        event: "CombateApp._appRules",
        details: "Process finished",
      });
    } catch (err) {
      this._logger.error({
        event: "CombateApp._appRules",
        details: "Process error",
        error: err.message,
      });

      if (err instanceof PError) {
        err.requestDto = this._requestDto;
        err.responseDto = this._responseDto;
      }

      throw err;
    }
  }
}
