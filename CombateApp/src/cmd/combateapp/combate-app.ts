import { PermissionsAndroid } from "react-native";
import { CONSTANTS } from "../../internal/config/config";
import { RequestDto } from "../../internal/core/dto/request-dto";
import { ResponseDto } from "../../internal/core/dto/response-dto";
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
  private _velocityExceededRecord: Array<number>;
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
  }

  private async _syncProtocolVersion(
    requestDto: RequestDto,
    doseCallback: (
      requestDto: RequestDto,
      responseDto: ResponseDto
    ) => Promise<void>
  ): Promise<void> {
    const requestDtoCpy = { ...requestDto };
    requestDtoCpy.newId = undefined;
    const request = this._requestFactory.factory(
      requestDtoCpy,
      ProtocolVersionEnum.V5
    );
    const cbV5Service = this._cbServiceFactory.factory(ProtocolVersionEnum.V5);
    const responseDto = await cbV5Service.request(request, doseCallback);
    this._protocolVersion = this._protocolRules.getProtocolVersion(responseDto);
    this._cbService = this._cbServiceFactory.factory(this._protocolVersion);
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

  async begin(filePath: string): Promise<void> {
    this._logger.info({
      event: "CombateApp.begin",
      details: "Process started",
      filePath,
    });
    this._protocolVersion = undefined;
    this._cbService = undefined;
    this._filePath = filePath;
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
        await this._syncProtocolVersion(requestDto, doseCallback);
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

      await this._appRules(responseDto, requestDto);

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

  private async _appRules(responseDto: ResponseDto, requestDto: RequestDto) {
    try {
      this._logger.info({
        event: "CombateApp._appRules",
        details: "Process started",
        requestDto,
        responseDto,
      });
      const velocity = Number(responseDto.gps.speed);

      if (velocity < requestDto.maxVelocity) {
        this._velocityExceededRecord = [];
      } else {
        this._velocityExceededRecord.push(velocity);
      }

      if (this._velocityExceededRecord.length >= 2) {
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
