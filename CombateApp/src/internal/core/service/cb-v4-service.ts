import { responseDtoParser, ResponseDtoParser } from '../parser/response-dto-parser';
import { ResponseDto as ResponseDto } from '../dto/response-dto';
import { bluetooth, PBluetooth } from '../port/bluetooth-port';
import { PCbService } from '../port/cb-service-port';
import { logger, PLogger } from '../port/logger-port';
import { PRequest } from '../port/request-port';
import { protocolRules, ProtocolRules } from '../rules/protocol-rules';
import { timeout } from '../utils/timeout';

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

    let protocol: string;
    if (request.getRequestDto().dose?.amount) {
      await timeout(2000 * request.getRequestDto().dose.amount, this._bluetooth.read());
    } else protocol = await timeout(2000, this._bluetooth.read());

    const responseDto = this._responseDtoParser.parseV4(protocol);

    return responseDto;
  }
}

export const cbV4Service = new CbV4Service(logger, bluetooth, responseDtoParser);
