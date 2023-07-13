import { CONSTANTS } from '../../config/config';
import { ResponseDto } from '../dto/response-dto';
import { StatusEnum } from '../enum/status';
import { BluetoothErrorType } from '../error/error-type';
import { ResponseDtoParser } from '../parser/response-dto-parser';
import { PBluetooth } from '../port/bluetooth-port';
import { PCbService } from '../port/cb-service-port';
import { PLogger } from '../port/logger-port';
import { PRequest } from '../port/request-port';
import { timeout } from '../utils/timeout';

export class CbV5Service implements PCbService {
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
      this._logger.info({ event: 'CbV5Service.request', details: 'Process started', request });

      await this._bluetooth.write(request.toProtocol());

      let timeoutMs = CONSTANTS.APPLICATION.DOSE_TIMEOUT_MS;
      let protocol = await timeout(
        timeoutMs,
        this._bluetooth.read(timeoutMs),
        new BluetoothErrorType('Request timeout exceeded')
      );

      let responseDto = this._responseDtoParser.parseV5(protocol);
      
      if(responseDto.status.name == StatusEnum.B.name){
        if (request.getRequestDto().dose?.amount) timeoutMs *= request.getRequestDto().dose.amount;
        protocol = await timeout(
            timeoutMs,
            this._bluetooth.read(timeoutMs+CONSTANTS.APPLICATION.BLUETOOTH_READ_TIMEOUT_MS),
            new BluetoothErrorType('Request timeout exceeded')
          );

        responseDto = this._responseDtoParser.parseV5(protocol);
      }

      this._logger.info({ event: 'CbV5Service.request', details: 'Process finished', responseDto });

      return responseDto;
    } catch (err) {
      this._logger.error({
        event: 'CbV5Service.request',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }
}
