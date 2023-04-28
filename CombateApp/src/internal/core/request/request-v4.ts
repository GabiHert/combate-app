import { CheckSumBuilder } from '../builder/check-sum-builder';
import { DRequest } from '../dto/request-dto';
import { PLogger } from '../port/logger-port';
import { PRequest } from '../port/request-port';

export class RequestV4 implements PRequest {
  private _requestDto: DRequest;
  constructor(private readonly _logger: PLogger, private checkSumBuilder: CheckSumBuilder) {}

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
