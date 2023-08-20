import { CONSTANTS } from "../../config/config";
import { CheckSumBuilder } from "../builder/check-sum-builder";
import { RequestDto } from "../dto/request-dto";
import { ValidationErrorType } from "../error/error-type";
import { PLogger } from "../port/logger-port";
import { PRequest } from "../port/request-port";

export class RequestV5 implements PRequest {
  private _requestDto: RequestDto;
  constructor(
    private readonly _logger: PLogger,
    private _checkSumBuilder: CheckSumBuilder
  ) {}

  setRequestDto(requestDto: RequestDto): void {
    try {
      this._logger.info({
        event: "RequestV5.setRequestDto",
        details: "Process started",
        requestDto,
      });

      this._requestDto = requestDto;
      this.validate();

      this._logger.info({
        event: "RequestV5.setRequestDto",
        details: "Process finished",
      });
    } catch (err) {
      this._logger.error({
        event: "RequestV5.setRequestDto",
        details: "Process error",
        error: err.message,
      });
      throw err;
    }
  }

  validate(): void {
    try {
      this._logger.info({
        event: "RequestV5.validate",
        details: "Process started",
        requestDto: this._requestDto,
      });
      if (!this._requestDto) {
        this._logger.warn({
          event: "RequestV5.validate",
          details: "Process warn",
          warn: "request is undefined",
        });
        throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.NOT_DEFINED);
      }
      if (this._requestDto.dose) {
        if (this._requestDto.dose.amount == undefined) {
          this._logger.warn({
            event: "RequestV5.validate",
            details: "Process warn",
            warn: "dose amount is undefined",
          });
          throw new ValidationErrorType(
            CONSTANTS.ERRORS.REQUEST_V5.DOSE_AMOUNT_NOT_DEFINED
          );
        }

        if (this._requestDto.dose.amount < 0) {
          this._logger.warn({
            event: "RequestV5.validate",
            details: "Process warn",
            warn: "dose amount is < 0",
          });
          throw new ValidationErrorType(
            CONSTANTS.ERRORS.REQUEST_V5.DOSE_AMOUNT_BELLOW_ZERO
          );
        }

        if (this._requestDto.dose.amount > 10) {
          this._logger.warn({
            event: "RequestV5.validate",
            details: "Process warn",
            warn: "dose amount is > 10",
          });
          throw new ValidationErrorType(
            CONSTANTS.ERRORS.REQUEST_V5.DOSE_AMOUNT_GREATER_THAN_10
          );
        }

        if (this._requestDto.dose.amount > 0) {
          if (
            !this._requestDto.dose.centerApplicator &&
            !this._requestDto.dose.leftApplicator &&
            !this._requestDto.dose.rightApplicator
          ) {
            this._logger.warn({
              event: "RequestV5.validate",
              details: "Process warn",
              warn: "applicator should be specified",
            });
            throw new ValidationErrorType(
              CONSTANTS.ERRORS.REQUEST_V5.APPLICATOR_NOT_SPECIFIER
            );
          }

          if (
            this._requestDto.applicatorsAmount !=
            Number(this._requestDto.dose.centerApplicator) +
              Number(this._requestDto.dose.leftApplicator) +
              Number(this._requestDto.dose.rightApplicator)
          ) {
            this._logger.warn({
              event: "RequestV5.validate",
              details: "Process warn",
              warn: "applicatorsAmount and selectedApplicators does not match",
            });
            throw new ValidationErrorType(
              CONSTANTS.ERRORS.REQUEST_V5.APPLICATORS_AMOUNT_AND_SELECTED_DOES_NOT_MATCH
            );
          }
        }
      }

      if (!this._requestDto.linesSpacing) {
        this._logger.warn({
          event: "RequestV5.validate",
          details: "Process warn",
          warn: "linesSpacing must be specified",
        });
        throw new ValidationErrorType(
          CONSTANTS.ERRORS.REQUEST_V4.LINE_SPACING_NOT_DEFINED
        );
      }

      if (this._requestDto.linesSpacing <= 0) {
        this._logger.warn({
          event: "RequestV5.validate",
          details: "Process warn",
          warn: "linesSpacing should be grater than 0",
        });
        throw new ValidationErrorType(
          CONSTANTS.ERRORS.REQUEST_V4.LINE_SPACING_GREATER_THAN_0
        );
      }

      if (this._requestDto.newId) {
        if (
          this._requestDto.newId < 0 ||
          this._requestDto.newId > 99 ||
          this._requestDto.newId % 1 !== 0
        ) {
          this._logger.warn({
            event: "RequestV5.validate",
            details: "Process warn",
            warn: "new id should be > 0 and < 200",
          });
          throw new ValidationErrorType(
            CONSTANTS.ERRORS.REQUEST_V4.NEW_ID_GREATER_THAN_200_OR_LESS_THAN_0
          );
        }
      }

      this._logger.info({
        event: "RequestV5.validate",
        details: "Process finished",
      });
    } catch (err) {
      this._logger.error({
        event: "RequestV5.validate",
        details: "Process error",
        error: err.message,
      });
      throw err;
    }
  }
  toProtocol(): string {
    this._logger.info({
      event: "RequestV5.toProtocol",
      details: "Process started",
      request: this._requestDto,
    });
    let doseAmount: string;
    let centerApplicatorActive = "0";
    let leftApplicatorActive = "0";
    let rightApplicatorActive = "0";

    if (this._requestDto.dose && this._requestDto.dose.amount) {
      if (this._requestDto.dose.amount == 10) {
        doseAmount = "0";
      } else {
        doseAmount = this._requestDto.dose.amount.toString();
      }

      centerApplicatorActive = this._requestDto.dose.centerApplicator
        ? "1"
        : "0";

      rightApplicatorActive = this._requestDto.dose.rightApplicator ? "1" : "0";

      leftApplicatorActive = this._requestDto.dose.leftApplicator ? "1" : "0";
    } else {
      doseAmount = "N";
    }

    const newId = this._requestDto.newId
      ? this._requestDto.newId.toPrecision(0).padStart(2, "0")
      : "NN";

    let protocol = [
      CONSTANTS.REQUEST_V5.HEADER,
      doseAmount,
      leftApplicatorActive,
      centerApplicatorActive,
      rightApplicatorActive,
      newId[0],
      newId[1],
      "x",
    ].join("");

    protocol += this._checkSumBuilder.build(protocol.substring(4)) + "\r\n";
    this._logger.info({
      event: "RequestV5.toProtocol",
      details: "Process finished",
      protocol,
    });
    return protocol;
  }

  getRequestDto(): RequestDto {
    return this._requestDto;
  }
}
