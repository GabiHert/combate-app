import { CONSTANTS } from '../../../../src/internal/config/config';
import { checkSumBuilder } from '../../../../src/internal/core/builder/check-sum-builder';
import { DRequest } from '../../../../src/internal/core/dto/request-dto';
import { ValidationErrorType } from '../../../../src/internal/core/error/error-type';
import { RequestV4 } from '../../../../src/internal/core/request/request-v4';
import { IDoseRequest } from '../../../../src/internal/interface/dose-request';
import { LoggerMock } from '../../../mock/logger-mock';
describe('request-v4 unit test', () => {
  let loggerMocked = new LoggerMock();
  let requestV4 = new RequestV4(loggerMocked, checkSumBuilder);
  let requestDto: DRequest;
  let dose: IDoseRequest;
  beforeEach(() => {
    dose = { amount: 0 };
    requestDto = new DRequest(dose);
    loggerMocked.clear();
  });

  it('should set requestDto with success when requestDto is valid', () => {
    requestV4.setRequestDto(requestDto);
    expect(loggerMocked.infoCalled).toBeGreaterThan(2);
    expect(loggerMocked.errorCalled).toBe(0);
  });

  it('should throw an error when trying to set an invalid requestDto', () => {
    requestDto.dose = undefined;
    expect(() => requestV4.setRequestDto(requestDto)).toThrow(
      new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V4.NOT_DEFINED)
    );
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });

  it('should throw an error when requestDto is undefined', () => {
    requestDto.dose = undefined;
    expect(() => requestV4.setRequestDto(requestDto)).toThrow(
      new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V4.NOT_DEFINED)
    );
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });

  it('should throw an error when dose.amount is undefined', () => {
    requestDto.dose.amount = undefined;
    expect(() => requestV4.setRequestDto(requestDto)).toThrow(
      new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V4.DOSE_AMOUNT_NOT_DEFINED)
    );
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });

  it('should throw an error when dose.amount is < 0', () => {
    requestDto.dose.amount = -1;
    expect(() => requestV4.setRequestDto(requestDto)).toThrow(
      new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V4.DOSE_AMOUNT_BELLOW_ZERO)
    );
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });

  it('should not throw an error when applicators are undefined', () => {
    requestDto.dose = {
      amount: 0,
    };
    requestV4.setRequestDto(requestDto);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(0);
  });
});
