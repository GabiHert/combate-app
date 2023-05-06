import { ResponseBuilder, responseBuilder } from '../parser/response-dto-parser';
import { ProtocolVersion, ProtocolVersionEnum } from '../enum/protocol-version';
import { PBluetooth, bluetooth } from '../port/bluetooth-port';
import { PCbService } from '../port/cb-service-port';
import { PLogger, logger } from '../port/logger-port';
import { CbV4Service } from '../service/cb-v4-service';

export class CbServiceFactory {
  constructor(
    private readonly _logger: PLogger,
    private _bluetooth: PBluetooth,
    private _responseBuilder: ResponseBuilder
  ) {}
  private [ProtocolVersionEnum.V4.name]() {
    return new CbV4Service(this._logger, this._bluetooth, this._responseBuilder);
  }
  factory(version: ProtocolVersion): PCbService {
    this._logger.info({ event: 'CbServiceFactory.factory', details: 'Process started', version });

    const service = this[version.name]();

    this._logger.info({
      event: 'CbServiceFactory.factory',
      details: 'Process finished',
    });
    return service;
  }
}

export const cbServiceFactory = new CbServiceFactory(logger, bluetooth, responseBuilder);
