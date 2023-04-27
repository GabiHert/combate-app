import { responseBuilder, ResponseBuilder } from '../builder/response-builder';
import { DResponse } from '../dto/response-dto';
import { ProtocolVersion } from '../enum/protocol-version';
import { bluetooth, PBluetooth } from '../port/bluetooth-port';
import { PCbService } from '../port/cb-service-port';
import { logger, PLogger } from '../port/logger-port';
import { PRequest } from '../port/request-port';

export class CbV4Service implements PCbService {
  constructor(
    private _logger: PLogger,
    private _bluetooth: PBluetooth,
    private _responseBuilder: ResponseBuilder
  ) {}
  async request(
    request: PRequest,
    callback?: (done: number, target: number) => void
  ): Promise<DResponse> {
    await this._bluetooth.write(request.toProtocol());

    const protocol = await this._bluetooth.read();

    const responseDto = this._responseBuilder.build(protocol);

    return responseDto;
  }
}

export const cbV4Service = new CbV4Service(logger, bluetooth, responseBuilder);
