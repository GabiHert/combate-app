import { DResponse } from '../dto/response-dto';
import { logger, PLogger } from '../port/logger-port';

export class ProtocolRules {
  constructor(private readonly _logger: PLogger) {}
  V4(responseDto: DResponse): boolean {
    return true;
  }
}

export const protocolRules = new ProtocolRules(logger);
