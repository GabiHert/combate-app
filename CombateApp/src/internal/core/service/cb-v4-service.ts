import { responseDtoParser, ResponseDtoParser } from '../parser/response-dto-parser';
import { ResponseDto } from '../dto/response-dto';
import { PBluetooth } from '../port/bluetooth-port';
import { PCbService } from '../port/cb-service-port';
import { logger, PLogger } from '../port/logger-port';
import { PRequest } from '../port/request-port';
import { timeout } from '../utils/timeout';
import { RequestTimeoutErrorType } from '../error/error-type';

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
    await this._bluetooth.write(request.toProtocol());

    let timeoutMs = 1000;
    if (request.getRequestDto().dose?.amount) timeoutMs *= request.getRequestDto().dose.amount;

    const protocol = await timeout(
      2000 * request.getRequestDto().dose.amount,
      this._bluetooth.read(),
      new RequestTimeoutErrorType('')
    );

    const responseDto = this._responseDtoParser.parseV4(protocol);

    return responseDto;
  }
}
