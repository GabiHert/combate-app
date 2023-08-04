import { CheckSumBuilder } from '../builder/check-sum-builder';
import { RequestDto } from '../dto/request-dto';
import { ProtocolVersion, ProtocolVersionEnum } from '../enum/protocol-version';
import { PLogger } from '../port/logger-port';
import { PRequest } from '../port/request-port';
import { RequestV4 } from '../request/request-v4';
import { RequestV5 } from '../request/request-v5';

export class RequestFactory {
  constructor(private readonly _logger: PLogger) {}

  private [ProtocolVersionEnum.V4.name](requestDto: RequestDto): RequestV4 {
    this._logger.info({ event: 'RequestFactory.V4', details: 'Process started' });
    const requestV4 = new RequestV4(this._logger, new CheckSumBuilder(this._logger));
    requestV4.setRequestDto(requestDto);
    this._logger.info({ event: 'RequestFactory.V4', details: 'Process finished' });

    return requestV4;
  }
  private [ProtocolVersionEnum.V5.name](requestDto: RequestDto): RequestV5 {
    this._logger.info({ event: 'RequestFactory.V5', details: 'Process started' });
    const requestV5 = new RequestV5(this._logger, new CheckSumBuilder(this._logger));
    requestV5.setRequestDto(requestDto);
    this._logger.info({ event: 'RequestFactory.V5', details: 'Process finished' });

    return requestV5;
  }
  factory(requestDto: RequestDto, protocolVersion: ProtocolVersion): PRequest {
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
