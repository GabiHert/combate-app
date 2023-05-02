import { CheckSumBuilder } from '../../src/internal/core/builder/check-sum-builder';
import { DRequest } from '../../src/internal/core/dto/request-dto';
import { ValidationErrorType } from '../../src/internal/core/error/error-type';
import { PLogger } from '../../src/internal/core/port/logger-port';

export class RequestV4Mock {
  private _requestDto: DRequest;
  constructor(private readonly _logger: PLogger, private checkSumBuilder: CheckSumBuilder) {}
  setRequestDto(requestDto: DRequest): void {
    this._requestDto = requestDto;
    this.validate();
  }

  validate(): void {
    if (this._requestDto.dose.amount == 0) {
      throw new ValidationErrorType('ERROR');
    }
  }
  toProtocol(): string {
    //todo: implement
    return '';
  }
}
