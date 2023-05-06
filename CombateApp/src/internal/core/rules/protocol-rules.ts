import { CheckSumBuilder, checkSumBuilder } from '../builder/check-sum-builder';
import { DResponse } from '../dto/response-dto';
import { ValidationErrorType } from '../error/error-type';
import { logger, PLogger } from '../port/logger-port';

export class ProtocolRules {
  constructor(
    private readonly _logger: PLogger,
    private readonly _checkSumBuilder: CheckSumBuilder
  ) {}
  V4(protocol: string) {
    if (protocol.length < 23) {
      this._logger.warn({
        event: 'ProtocolRules.V4',
        details: 'Process warn',
        warn: 'protocol length different from expected',
      });
      throw new ValidationErrorType('Protocol length does not mach rules');
    }

    if (protocol[0] != '&') {
    }

    const cs = this._checkSumBuilder.build(protocol.substring(1, 10));
    if (cs != protocol[10]) {
      this._logger.warn({
        event: 'ProtocolRules.V4',
        details: 'Process warn',
        warn: 'protocol checkSum different from expected',
      });
      throw new ValidationErrorType('Protocol checkSum not mach rules');
    }

    const protocolEnd = protocol.substring(protocol.length - 2, protocol.length);
    if (protocolEnd != '\r\n') {
      this._logger.warn({
        event: 'ProtocolRules.V4',
        details: 'Process warn',
        warn: 'protocolEnd different from expected',
        protocolEnd,
      });
      throw new ValidationErrorType('Protocol end different from expected');
    }
  }
}

export const protocolRules = new ProtocolRules(logger, checkSumBuilder);
