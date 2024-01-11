import { CheckSumBuilder } from "../builder/check-sum-builder";
import { RequestDto } from "../dto/request-dto";
import { PLogger } from "../port/logger-port";
import { PRequest } from "../port/request-port";
import { RequestV5 } from "../request/request-v5";

export class RequestFactory {
  constructor(private readonly _logger: PLogger) {}

  factory(requestDto: RequestDto): PRequest {
    try {
      this._logger.info({
        event: "RequestFactory.V5",
        details: "Process started",
      });
      const requestV5 = new RequestV5(
        this._logger,
        new CheckSumBuilder(this._logger)
      );
      requestV5.setRequestDto(requestDto);
      this._logger.info({
        event: "RequestFactory.V5",
        details: "Process finished",
      });

      return requestV5;
    } catch (err) {
      this._logger.error({
        event: "RequestFactory.factory",
        details: "Process error",
        error: err.message,
      });
      throw err;
    }
  }
}
