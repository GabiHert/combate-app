import { CONSTANTS } from '../../config/config';
import { CheckSumBuilder } from '../builder/check-sum-builder';
import { RequestDto } from '../dto/request-dto';
import { RequestTypeEnum } from '../enum/request-type';
import { ValidationErrorType } from '../error/error-type';
import { PLogger } from '../port/logger-port';
import { PRequest } from '../port/request-port';

export class RequestV5 implements PRequest {
  private _requestDto: RequestDto;
  constructor(private readonly _logger: PLogger, private _checkSumBuilder: CheckSumBuilder) {}

  setRequestDto(requestDto: RequestDto): void {
    try {
      this._logger.info({
        event: 'RequestV5.setRequestDto',
        details: 'Process started',
        requestDto,
      });

      this._requestDto = requestDto;
      this.validate();

      this._logger.info({
        event: 'RequestV5.setRequestDto',
        details: 'Process finished',
      });
    } catch (err) {
      this._logger.error({
        event: 'RequestV5.setRequestDto',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }

  validate(): void {
    try {
      this._logger.info({
        event: 'RequestV5.validate',
        details: 'Process started',
        requestDto: this._requestDto,
      });
      if (!this._requestDto) {
        this._logger.warn({
          event: 'RequestV5.validate',
          details: 'Process warn',
          warn: 'request is undefined',
        });
        throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.NOT_DEFINED);
      }

      if(!this._requestDto.requestType){
        this._logger.warn({
          event: 'RequestV5.validate',
          details: 'Process warn',
          warn: 'requestType is undefined',
        });
        throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.REQUEST_TYPE_NOT_DEFINED);
      }
      
      if (this._requestDto.dose) {
        if (this._requestDto.dose.amount == undefined) {
          this._logger.warn({
            event: 'RequestV5.validate',
            details: 'Process warn',
            warn: 'dose amount is undefined',
          });
          throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.DOSE_AMOUNT_NOT_DEFINED);
        }
  
        if (this._requestDto.dose.amount < 0) {
          this._logger.warn({
            event: 'RequestV5.validate',
            details: 'Process warn',
            warn: 'dose amount is < 0',
          });
          throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.DOSE_AMOUNT_BELLOW_ZERO);
        }
  
        if (this._requestDto.dose.amount > 10) {
          this._logger.warn({
            event: 'RequestV5.validate',
            details: 'Process warn',
            warn: 'dose amount is > 10',
          });
          throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.DOSE_AMOUNT_GREATER_THAN_10);
        }


        if (this._requestDto.dose.centerApplicator == undefined) {
          this._logger.warn({
            event: 'RequestV5.validate',
            details: 'Process warn',
            warn: 'dose centerApplicator undefined',
          });
          throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.CENTER_APPLICATOR_NOT_DEFINED);
        }

        if (this._requestDto.dose.leftApplicator == undefined) {
          this._logger.warn({
            event: 'RequestV5.validate',
            details: 'Process warn',
            warn: 'dose centerApplicator undefined',
          });
          throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.LEFT_APPLICATOR_NOT_DEFINED);
        }

        if (this._requestDto.dose.rightApplicator == undefined) {
          this._logger.warn({
            event: 'RequestV5.validate',
            details: 'Process warn',
            warn: 'dose centerApplicator undefined',
          });
          throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.RIGHT_APPLICATOR_NOT_DEFINED);
        }

      }

      if(this._requestDto.name && this._requestDto.name.length > 8){
        this._logger.warn({
          event: 'RequestV5.validate',
          details: 'Process warn',
          warn: 'name should have more than 8 characters',
        });
        throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.NAME_GREATER_THAN_8);
      }

      if (!this._requestDto.linesSpacing) {
        this._logger.warn({
          event: 'RequestV5.validate',
          details: 'Process warn',
          warn: 'linesSpacing must be specified',
        });
        throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.LINE_SPACING_NOT_DEFINED);
      }

      if (this._requestDto.linesSpacing <= 0) {
        this._logger.warn({
          event: 'RequestV5.validate',
          details: 'Process warn',
          warn: 'linesSpacing should be grater than 0',
        });
        throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.LINE_SPACING_GREATER_THAN_0);
      }

      if(this._requestDto.requestType == RequestTypeEnum.D){
        if(!this._requestDto.dose){
          this._logger.warn({
            event: 'RequestV5.validate',
            details: 'Process warn',
            warn: 'dose amount is undefined',
          });
          throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.DOSE_AMOUNT_NOT_DEFINED);
        }
      }

      if (this._requestDto.requestType == RequestTypeEnum.R){
        if(!this._requestDto.name){
          this._logger.warn({
            event: 'RequestV5.validate',
            details: 'Process warn',
            warn: 'dose amount is undefined',
          });
          throw new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V5.DOSE_AMOUNT_NOT_DEFINED);
        }
      }
      
      this._logger.info({
        event: 'RequestV5.validate',
        details: 'Process finished',
      });
    } catch (err) {
      this._logger.error({
        event: 'RequestV5.validate',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }
  toProtocol(): string {
    this._logger.info({
      event: 'RequestV5.toProtocol',
      details: 'Process started',
      request: this._requestDto,
    });
    let doseAmount: string;
    let leftApplicator = "0";
    let centerApplicator = "0";
    let rightApplicator = "0"
 
    if (this._requestDto.dose && this._requestDto.dose.amount) {
       leftApplicator = this._requestDto.dose.leftApplicator?"1":"0";
       centerApplicator = this._requestDto.dose.centerApplicator?"1":"0";
       rightApplicator = this._requestDto.dose.rightApplicator?"1":"0";
      if (this._requestDto.dose.amount == 10) {
        doseAmount = '0';
      } else {
        doseAmount = this._requestDto.dose.amount.toString();
      }
    } else {
      doseAmount = 'N';
    }

    

    let protocol = [
      CONSTANTS.REQUEST_V5.HEADER,
      doseAmount,
      'N',
      leftApplicator,
      centerApplicator,
      rightApplicator,
      'x',
      'x',
      'x',
      'x',
    ].join('');

    protocol += this._checkSumBuilder.build(protocol) + '\r\n';

    this._logger.info({
      event: 'RequestV5.toProtocol',
      details: 'Process finished',
      protocol,
    });
    return protocol;
  }

  getRequestDto(): RequestDto {
    return this._requestDto;
  }
}
