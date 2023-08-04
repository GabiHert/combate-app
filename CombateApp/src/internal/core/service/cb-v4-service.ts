import { CONSTANTS } from "../../config/config";
import { ResponseDto } from "../dto/response-dto";
import { StatusEnum } from "../enum/status";
import {
  BluetoothErrorType,
  DoseProcessTimeOut as DoseProcessTimeOutErrorType,
  GenericErrorType,
  GpsErrorType,
  ValidationErrorType,
} from "../error/error-type";
import { ResponseDtoParser } from "../parser/response-dto-parser";
import { PBluetooth } from "../port/bluetooth-port";
import { PCbService } from "../port/cb-service-port";
import { PLogger } from "../port/logger-port";
import { PRequest } from "../port/request-port";
import { timeout } from "../utils/timeout";

export class CbV4Service implements PCbService {
  constructor(
    private readonly _logger: PLogger,
    private _bluetooth: PBluetooth,
    private _responseDtoParser: ResponseDtoParser
  ) {}
  async request(
    request: PRequest,
    callback?: (done: number, target: number) => void
  ): Promise<ResponseDto> {
    try {
      this._logger.info({
        event: "CbV4Service.request",
        details: "Process started",
        request,
      });

      await this._bluetooth.write(request.toProtocol());

      let timeoutMs = CONSTANTS.APPLICATION.BLUETOOTH_READ_TIMEOUT_MS;
      let protocol = await timeout(
        timeoutMs,
        this._bluetooth.read(timeoutMs),
        new BluetoothErrorType("Request timeout exceeded")
      );

      let responseDto = this._responseDtoParser.parseV4(protocol);

      if (responseDto.status.name == StatusEnum.B.name) {
        if (request.getRequestDto().dose?.amount)
          timeoutMs +=
            CONSTANTS.APPLICATION.DOSE_TIMEOUT_MS *
            request.getRequestDto().dose.amount;
        protocol = await timeout(
          timeoutMs,
          this._bluetooth.read(timeoutMs),
          new BluetoothErrorType("Request timeout exceeded")
        );

        responseDto = this._responseDtoParser.parseV4(protocol);
      }

      if (responseDto.status.name == StatusEnum.E.name) {
        const errors = {
          "001": new ValidationErrorType("Validação protocolo falhou [CB]"),
          "002": new DoseProcessTimeOutErrorType("Dose lenta ou travada [CB]"),
          "003": new GpsErrorType("GPS sem sinal ou sem resposta [CB]"),
        };
        if (errors[responseDto.errorCode]) {
          throw errors[responseDto.errorCode];
        } else {
          throw new GenericErrorType(
            "Código de erro CB não mapeado (" + responseDto.errorCode + ")"
          );
        }
      }

      this._logger.info({
        event: "CbV4Service.request",
        details: "Process finished",
        responseDto,
      });
      return responseDto;
    } catch (err) {
      this._logger.error({
        event: "CbV4Service.request",
        details: "Process error",
        error: err.message,
      });
      throw err;
    }
  }
}
