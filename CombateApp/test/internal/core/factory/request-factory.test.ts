import { CONSTANTS } from '../../../../src/internal/config/config';
import { checkSumBuilder } from '../../../../src/internal/core/builder/check-sum-builder';
import { DRequest } from '../../../../src/internal/core/dto/request-dto';
import { ProtocolVersionEnum } from '../../../../src/internal/core/enum/protocol-version';
import { ValidationErrorType } from '../../../../src/internal/core/error/error-type';
import { RequestFactory } from '../../../../src/internal/core/factory/request-factory';
import { RequestV4 } from '../../../../src/internal/core/request/request-v4';
import { LoggerMock } from '../../../mock/logger-mock';

describe('request-factory unit test', () => {
  let loggerMocked = new LoggerMock();
  let requestFactory = new RequestFactory(loggerMocked);
  let requestDto = new DRequest();

  beforeEach(() => {
    loggerMocked.clear();
    requestDto = new DRequest({ amount: 0 });
  });

  it('should factory an V4 Request when protocol version is V4 and validations pass', () => {
    const request = new RequestV4(loggerMocked, checkSumBuilder);
    request.setRequestDto(requestDto);

    const result = requestFactory.factory(requestDto, ProtocolVersionEnum.V4);
    expect(result).toEqual(request);
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(4);
    expect(loggerMocked.errorCalled).toBe(0);
  });

  it('should throw an error when an error is caught', () => {
    requestDto = new DRequest();
    expect(() => requestFactory.factory(requestDto, ProtocolVersionEnum.V4)).toThrow(
      new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V4.DOSE_NOT_DEFINED)
    );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBe(1);
  });
});

export {};
