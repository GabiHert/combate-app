import { DResponse } from '../dto/response-dto';
import { logger, PLogger } from '../port/logger-port';

export class ResponseBuilder {
  constructor(private _logger: PLogger) {}
  build(protocol: string): DResponse {
    return undefined;
  }
}

export const responseBuilder = new ResponseBuilder(logger);
