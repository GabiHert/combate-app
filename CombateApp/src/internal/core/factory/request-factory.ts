import { checkSumBuilder } from '../builder/check-sum-builder';
import { DRequest } from '../dto/request-dto';
import { ProtocolVersion, ProtocolVersionEnum } from '../enum/protocol-version';
import { PLogger, logger } from '../port/logger-port';
import { PRequest } from '../port/request-port';
import { RequestV4 } from '../request/request-v4';

export class RequestFactory {
  private _protocolVersion: ProtocolVersion;
  constructor(private readonly _logger: PLogger) {}

  private [ProtocolVersionEnum.V4.name](requestDto: DRequest): RequestV4 {
    this._logger.info({ event: 'RequestFactory.V4', details: 'Process started' });
    const requestV4 = new RequestV4(this._logger, checkSumBuilder);
    requestV4.setRequestDto(requestDto);
    this._logger.info({ event: 'RequestFactory.V4', details: 'Process finished' });

    return requestV4;
  }
  factory(requestDto: DRequest, protocolVersion: ProtocolVersion): PRequest {
    try {
      this._logger.info({
        event: 'RequestFactory.factory',
        details: 'Process started',
        protocolVersion,
        requestDto,
      });

      const request = this[protocolVersion.name](requestDto);
      this._logger.info({ event: 'RequestFactory.factory', details: 'Process finished', request });

      return request;
    } catch (err) {
      this._logger.error({
        event: 'RequestFactory.factory',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }
}

export const requestFactory = new RequestFactory(logger);
