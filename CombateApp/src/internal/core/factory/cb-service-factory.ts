import { ProtocolVersion } from '../enum/protocol-version';
import { PCbService } from '../port/cb-service-port';
import { logger, PLogger } from '../port/logger-port';
import { CbV4Service } from '../service/cb-v4-service';

export class CbServiceFactory {
  constructor(private _logger: PLogger) {}
  factory(version: ProtocolVersion): PCbService {
    return new CbV4Service(undefined, undefined, undefined);
  }
}

export const cbServiceFactory = new CbServiceFactory(logger);
