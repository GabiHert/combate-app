import { CONSTANTS } from '../../config/config';
import { CheckSumBuilder } from '../builder/check-sum-builder';
import { DRequest } from '../dto/request-dto';
import { ValidationErrorType } from '../error/error-type';
import { PLogger } from '../port/logger-port';
import { PRequest } from '../port/request-port';

export class RequestV4 implements PRequest {
  private _requestDto: DRequest;
  constructor(private readonly _logger: PLogger, private _checkSumBuilder: CheckSumBuilder) {}

  setRequestDto(requestDto: DRequest): void {
    try {
      this._logger.info({
        event: 'RequestV4.setRequestDto',
        details: 'Process started',
        requestDto,
      });

      this._requestDto = requestDto;
      this.validate();

      this._logger.info({
        event: 'RequestV4.setRequestDto',
        details: 'Process finished',
      });
    } catch (err) {
      this._logger.error({
        event: 'RequestV4.setRequestDto',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }

  validate(): void {
    try {
      this._logger.info({
        event: 'RequestV4.validate',
        details: 'Process started',
        requestDto: this._requestDto,
      });
      if (!this._requestDto) {
        this._logger.warn({
          event: 'RequestV4.validate',
          details: 'Process warn',
          warn: 'request is undefined',
        });
        throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V4.NOT_DEFINED);
      }
      if (!this._requestDto.dose) {
        this._logger.warn({
          event: 'RequestV4.validate',
          details: 'Process warn',
          warn: 'dose is undefined',
        });
        throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V4.NOT_DEFINED);
      }
      if (this._requestDto.dose.amount == undefined) {
        this._logger.warn({
          event: 'RequestV4.validate',
          details: 'Process warn',
          warn: 'dose amount is undefined',
        });
        throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V4.DOSE_AMOUNT_NOT_DEFINED);
      }

      if (this._requestDto.dose.amount < 0) {
        this._logger.warn({
          event: 'RequestV4.validate',
          details: 'Process warn',
          warn: 'dose amount is < 0',
        });
        throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V4.DOSE_AMOUNT_BELLOW_ZERO);
      }

      if (this._requestDto.dose.amount > 10) {
        this._logger.warn({
          event: 'RequestV4.validate',
          details: 'Process warn',
          warn: 'dose amount is > 10',
        });
        throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V4.DOSE_AMOUNT_GREATER_THAN_10);
      }

      this._logger.info({
        event: 'RequestV4.validate',
        details: 'Process finished',
      });
    } catch (err) {
      this._logger.error({
        event: 'RequestV4.validate',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }
  toProtocol(): string {
    this._logger.info({
      event: 'RequestV4.toProtocol',
      details: 'Process started',
      request: this._requestDto,
    });
    let doseAmount: string;
    if (this._requestDto.dose.amount) {
      if (this._requestDto.dose.amount == 10) {
        doseAmount = '0';
      } else {
        doseAmount = this._requestDto.dose.amount.toString();
      }
    } else {
      doseAmount = 'N';
    }
    let protocol = [
      CONSTANTS.REQUEST.HEADER,
      'N',
      doseAmount,
      'N',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
      'x',
    ].join('');

    protocol += this._checkSumBuilder.build(protocol) + '\r\n';

    this._logger.info({
      event: 'RequestV4.toProtocol',
      details: 'Process finished',
      protocol,
    });
    return protocol;
  }
}
