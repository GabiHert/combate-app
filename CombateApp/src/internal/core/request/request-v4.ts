import { PLogger } from '../port/logger-port';
import { PRequest } from '../port/request-port';
import { DRequest } from '../dto/request-dto';
import { CheckSumBuilder } from '../builder/check-sum-builder';

export class RequestV4 implements PRequest {
  private _requestDto: DRequest;
  constructor(private _logger: PLogger, private checkSumBuilder: CheckSumBuilder) {}

  setRequestDto(requestDto: DRequest): void {
    this._requestDto = requestDto;
    this.validate();
  }

  validate(): void {
    //todo: implement
  }
  toProtocol(): string {
    //todo: implement
    return '';
  }
}
