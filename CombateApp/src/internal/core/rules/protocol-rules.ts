import { CheckSumBuilder } from '../builder/check-sum-builder';
import { ResponseDto } from '../dto/response-dto';
import { ProtocolVersion, ProtocolVersionEnum } from '../enum/protocol-version';
import { Status } from '../enum/status';
import { ValidationErrorType } from '../error/error-type';
import { PLogger } from '../port/logger-port';

export class ProtocolRules {
  constructor(
    private readonly _logger: PLogger,
    private readonly _checkSumBuilder: CheckSumBuilder
  ) {}

  getProtocolVersion(response: ResponseDto): ProtocolVersion {
    return ProtocolVersionEnum.V4;
  }
  V4(protocol: string) {
    try {
      this._logger.info({
        event: 'ProtocolRules.V4',
        details: 'Process started',
        protocol,
      });

      const protocolSplited = protocol.split(',');
      if (protocolSplited[0].length != 11) {
        this._logger.warn({
          event: 'ProtocolRules.V4',
          details: 'Process warn',
          warn: 'protocol length different from expected',
        });
        throw new ValidationErrorType('Protocol length does not mach rules');
      }

      if (protocolSplited[protocolSplited.length - 1].includes('*')) {
        this._logger.warn({
          event: 'ProtocolRules.V4',
          details: 'Process warn',
          warn: 'protocol length different from expected',
        });
        throw new ValidationErrorType(
          'Protocol gps checkSum different from expected, received invalid character *'
        );
      }

      if (protocol[0] != '&') {
        this._logger.warn({
          event: 'ProtocolRules.V4',
          details: 'Process warn',
          warn: 'protocol header different from expected',
        });
        throw new ValidationErrorType('Protocol header does not mach rules');
      }

      const cs = this._checkSumBuilder.build(protocol.substring(1, 10));
      if (cs != protocol[10]) {
        this._logger.warn({
          event: 'ProtocolRules.V4',
          details: 'Process warn',
          warn: 'protocol checkSum different from expected',
        });
        throw new ValidationErrorType('Protocol checkSum does not mach rules');
      }

      if (!/^\d+$/.test(protocol[1]) && !/^\d+$/.test(protocol[2])) {
        this._logger.warn({
          event: 'ProtocolRules.V4',
          details: 'Process warn',
          warn: 'protocol wheelBoltsCounter different from expected',
        });
        throw new ValidationErrorType('Protocol wheelBoltsCounter does not mach rules');
      }

      try {
        new Status(protocol[3]);
      } catch (err) {
        this._logger.warn({
          event: 'ProtocolRules.V4',
          details: 'Process warn',
          warn: 'protocol status different from expected',
        });
        throw new ValidationErrorType('Protocol status does not mach rules');
      }

      if (!/^\d+$/.test(protocol[3]) && !/^\d+$/.test(protocol[4]) && !/^\d+$/.test(protocol[5])) {
        this._logger.warn({
          event: 'ProtocolRules.V4',
          details: 'Process warn',
          warn: 'protocol wheelBoltsCounter different from expected',
        });
        throw new ValidationErrorType('Protocol errorCode does not mach rules');
      }

      this._logger.info({
        event: 'ProtocolRules.V4',
        details: 'Process finished',
      });
    } catch (err) {
      this._logger.error({
        event: 'ProtocolRules.V4',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }
}
