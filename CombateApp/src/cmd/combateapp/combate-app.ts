import { PermissionsAndroid } from "react-native";
import { CONSTANTS } from "../../internal/config/config";
import { RequestDto } from "../../internal/core/dto/request-dto";
import { ResponseDto } from "../../internal/core/dto/response-dto";
import { PError } from "../../internal/core/error/error-port";
import { MaxVelocityErrorType } from "../../internal/core/error/error-type";
import { RequestFactory } from "../../internal/core/factory/request-factory";
import { PCbService } from "../../internal/core/port/cb-service-port";
import { PCsvTableService } from "../../internal/core/port/csv-table-service-port";
import { PLogger } from "../../internal/core/port/logger-port";
import { PCombateApp } from "../port/combate-app-port";

export class CombateApp implements PCombateApp {
  private _filePath: string;
  private _velocityExceededRecord: Array<number>;
  private _requestDto: RequestDto;
  private _responseDto: ResponseDto;

  constructor(
    private readonly _logger: PLogger,
    private readonly _cbService: PCbService,
    private readonly _csvTableService: PCsvTableService,
    private readonly _requestFactory: RequestFactory
  ) {
    this._velocityExceededRecord = [];
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

      const request = this._requestFactory.factory(requestDto);

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
