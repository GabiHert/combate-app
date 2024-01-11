import { CheckSumBuilder } from "../builder/check-sum-builder";
import { StatusEnum } from "../enum/status";
import { ValidationErrorType } from "../error/error-type";
import { PLogger } from "../port/logger-port";

export class ProtocolRules {
  constructor(
    private readonly _logger: PLogger,
    private readonly _checkSumBuilder: CheckSumBuilder
  ) {}

  V5(protocol: string) {
    try {
      this._logger.info({
        event: "ProtocolRules.V5",
        details: "Process started",
        protocol,
      });

      const protocolSplitted = protocol.split(",");

      if (protocolSplitted[0].length != 10) {
        this._logger.warn({
          event: "ProtocolRules.V5",
          details: "Process warn",
          warn: "protocol length different from expected",
        });
        throw new ValidationErrorType("Protocol length does not mach rules");
      }

      if (protocol[0] != "&") {
        this._logger.warn({
          event: "ProtocolRules.V5",
          details: "Process warn",
          warn: "protocol header different from expected",
        });
        throw new ValidationErrorType("Protocol header does not mach rules");
      }

      if (protocol[1] != "5") {
        this._logger.warn({
          event: "ProtocolRules.V5",
          details: "Process warn",
          warn: "protocol version different from expected",
        });
        throw new ValidationErrorType(
          "Protocol version does not mach V5 rules"
        );
      }

      if (
        protocol[2] != StatusEnum.E.name &&
        protocol[2] != "N" &&
        isNaN(Number(protocol[2]))
      ) {
        this._logger.warn({
          event: "ProtocolRules.V5",
          details: "Process warn",
          warn: "protocol status different from expected",
          status: protocol[2],
        });
        throw new ValidationErrorType("Protocol status does not mach rules");
      }

      if (
        !/^\d+$/.test(protocol[3]) &&
        !/^\d+$/.test(protocol[4]) &&
        !/^\d+$/.test(protocol[5])
      ) {
        this._logger.warn({
          event: "ProtocolRules.V5",
          details: "Process warn",
          warn: "protocol wheelBoltsCounter different from expected",
        });
        throw new ValidationErrorType("Protocol errorCode does not mach rules");
      }

      if (protocol[6] != "0" && protocol[6] != "1") {
        this._logger.warn({
          event: "ProtocolRules.V5",
          details: "Process warn",
          warn: "protocol leftApplicator different from expected",
        });
        throw new ValidationErrorType(
          "Protocol leftApplicator does not mach rules"
        );
      }

      if (protocol[7] != "0" && protocol[7] != "1") {
        this._logger.warn({
          event: "ProtocolRules.V5",
          details: "Process warn",
          warn: "protocol centerApplicator different from expected",
        });
        throw new ValidationErrorType(
          "Protocol centerApplicator does not mach rules"
        );
      }

      if (protocol[8] != "0" && protocol[8] != "1") {
        this._logger.warn({
          event: "ProtocolRules.V5",
          details: "Process warn",
          warn: "protocol rightApplicator different from expected",
        });
        throw new ValidationErrorType(
          "Protocol rightApplicator does not mach rules"
        );
      }

      const cs = this._checkSumBuilder.build(protocol.substring(2, 9));

      if (cs.charCodeAt(0) != protocol.charCodeAt(9)) {
        this._logger.warn({
          event: "ProtocolRules.V5",
          details: "Process warn",
          warn: "protocol checkSum different from expected",
        });
        throw new ValidationErrorType("Protocol checkSum does not mach rules");
      }

      this._logger.info({
        event: "ProtocolRules.V5",
        details: "Process finished",
      });
    } catch (err) {
      this._logger.error({
        event: "ProtocolRules.V5",
        details: "Process error",
        error: err.message,
      });
      throw err;
    }
  }
}
