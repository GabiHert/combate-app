import { CONSTANTS } from "../../config/config";
import { RequestDto } from "../dto/request-dto";
import { ResponseDto } from "../dto/response-dto";
import { StatusEnum } from "../enum/status";
import {
  ApplicatorNotConnectedErrorType,
  BluetoothErrorType,
  DoseProcessTimeOut as DoseProcessTimeOutErrorType,
  GenericErrorType,
  GpsErrorType,
  RenameErrorType,
  ValidationErrorType,
} from "../error/error-type";
import { ResponseDtoParser } from "../parser/response-dto-parser";
import { PBluetooth } from "../port/bluetooth-port";
import { PCbService } from "../port/cb-service-port";
import { PLogger } from "../port/logger-port";
import { PRequest } from "../port/request-port";
import { timeout } from "../utils/timeout";

export class CbV5Service implements PCbService {
  constructor(
    private readonly _logger: PLogger,
    private _bluetooth: PBluetooth,
    private _responseDtoParser: ResponseDtoParser
  ) {}

  async request(
    request: PRequest,
    doseCallback: (
      requestDto: RequestDto,
      responseDto: ResponseDto
    ) => Promise<void>
  ): Promise<ResponseDto> {
    try {
      this._logger.info({
        event: "CbV5Service.request",
        details: "Process started",
        request,
      });

      await this._bluetooth.write(request.toProtocol());

      let timeoutMs = CONSTANTS.APPLICATION.BLUETOOTH_READ_TIMEOUT_MS;
      let protocol = await timeout(
        timeoutMs,
        this._bluetooth.read(timeoutMs),
        new BluetoothErrorType("Bluetooth sem resposta")
      );

      let responseDto = this._responseDtoParser.parseV5(protocol);

      if (responseDto.status.name == StatusEnum.B.name) {
        if (request.getRequestDto().dose?.amount)
          timeoutMs +=
            CONSTANTS.APPLICATION.DOSE_TIMEOUT_MS *
            request.getRequestDto().dose.amount;
        protocol = await timeout(
          timeoutMs,
          this._bluetooth.read(timeoutMs),
          new BluetoothErrorType("Bluetooth sem resposta")
        );

        responseDto = this._responseDtoParser.parseV5(protocol);
      }

      if (responseDto.status.name == StatusEnum.E.name) {
        const errors = {
          "001": new ValidationErrorType("Validação protocolo falhou [CB]"),
          "002": new DoseProcessTimeOutErrorType("Dose lenta ou travada [CB]"),
          "003": new GpsErrorType("GPS sem sinal ou sem resposta [CB]"),
          "009": new ApplicatorNotConnectedErrorType(
            "Dosador desconectado [CB]"
          ),
          "010": new RenameErrorType("Não foi possível renomear [CB]"),
        };
        if (errors[responseDto.errorCode]) {
          throw errors[responseDto.errorCode];
        } else {
          throw new GenericErrorType(
            "Código de erro CB não mapeado (" + responseDto.errorCode + ")"
          );
        }
      }

      if (request.getRequestDto().dose) {
        await doseCallback(request.getRequestDto(), responseDto);
      }

      this._logger.info({
        event: "CbV5Service.request",
        details: "Process finished",
        responseDto,
      });
      return responseDto;
    } catch (err) {
      this._logger.error({
        event: "CbV5Service.request",
        details: "Process error",
        error: err.message,
      });
      throw err;
    }
  }
}
