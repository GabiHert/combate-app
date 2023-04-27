import { DRequest } from '../dto/request-dto';
import { ProtocolVersion } from '../enum/protocol-version';
import { logger, PLogger } from '../port/logger-port';
import { PRequest } from '../port/request-port';

export class RequestFactory {
  private _protocolVersion: ProtocolVersion;
  constructor(private _logger: PLogger) {}
  factory(requestDto: DRequest, protocolVersion: ProtocolVersion): PRequest {
    //todo: implement
    return undefined;
  }
}

export const requestFactory = new RequestFactory(logger);
