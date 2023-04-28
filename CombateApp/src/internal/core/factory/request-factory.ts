import { checkSumBuilder } from '../builder/check-sum-builder';
import { DRequest } from '../dto/request-dto';
import { ProtocolVersion } from '../enum/protocol-version';
import { PLogger, logger } from '../port/logger-port';
import { PRequest } from '../port/request-port';
import { RequestV4 } from '../request/request-v4';

export class RequestFactory {
  private _protocolVersion: ProtocolVersion;
  constructor(private readonly _logger: PLogger) {}
  factory(requestDto: DRequest, protocolVersion: ProtocolVersion): PRequest {
    this._logger.info({
      event: 'RequestFactory.factory',
      details: 'Process started',
      protocolVersion,
      requestDto,
    });
    const request = this[protocolVersion.name](requestDto);
    this._logger.info({ event: 'RequestFactory.factory', details: 'Process finished', request });

    return request;
  }

  private V4(requestDto: DRequest): RequestV4 {
    this._logger.info({ event: 'RequestFactory.V4', details: 'Process started' });
    const requestV4 = new RequestV4(this._logger, checkSumBuilder);
    requestV4.setRequestDto(requestDto);
    this._logger.info({ event: 'RequestFactory.V4', details: 'Process finished' });

    return requestV4;
  }
}

export const requestFactory = new RequestFactory(logger);
