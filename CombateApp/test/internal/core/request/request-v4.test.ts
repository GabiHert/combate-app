import { CONSTANTS } from "../../../../src/internal/config/config";
import { checkSumBuilder } from "../../../../src/internal/core/builder/check-sum-builder";
import { RequestDto } from "../../../../src/internal/core/dto/request-dto";
import { ValidationErrorType } from "../../../../src/internal/core/error/error-type";
import { RequestV4 } from "../../../../src/internal/core/request/request-v4";
import { IDoseRequest } from "../../../../src/internal/interface/dose-request";
import { LoggerMock } from "../../../mock/logger-mock";
describe("request-v4 unit test", () => {
  let loggerMocked = new LoggerMock();
  let requestV4 = new RequestV4(loggerMocked, checkSumBuilder);
  let requestDto: RequestDto;
  let dose: IDoseRequest;
  beforeEach(() => {
    dose = { amount: 0 };
    requestDto = new RequestDto(dose);
    loggerMocked.clear();
  });

  it("should set requestDto with success when requestDto is valid", () => {
    requestV4.setRequestDto(requestDto);
    expect(loggerMocked.infoCalled).toBeGreaterThan(2);
    expect(loggerMocked.errorCalled).toBe(0);
  });

  it("should throw an error when trying to set an invalid requestDto", () => {
    requestDto.dose = undefined;
    expect(() => requestV4.setRequestDto(requestDto)).toThrow(
      new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V4.NOT_DEFINED)
    );
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });

  it("should throw an error when requestDto is undefined", () => {
    requestDto.dose = undefined;
    expect(() => requestV4.setRequestDto(requestDto)).toThrow(
      new ValidationErrorType(CONSTANTS.ERRORS.REQUEST_V4.NOT_DEFINED)
    );
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });

  it("should throw an error when dose.amount is undefined", () => {
    requestDto.dose.amount = undefined;
    expect(() => requestV4.setRequestDto(requestDto)).toThrow(
      new ValidationErrorType(
        CONSTANTS.ERRORS.REQUEST_V4.DOSE_AMOUNT_NOT_DEFINED
      )
    );
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });

  it("should throw an error when dose.amount is < 0", () => {
    requestDto.dose.amount = -1;
    expect(() => requestV4.setRequestDto(requestDto)).toThrow(
      new ValidationErrorType(
        CONSTANTS.ERRORS.REQUEST_V4.DOSE_AMOUNT_BELLOW_ZERO
      )
    );
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });

  it("should throw an error when dose.amount is > 10", () => {
    requestDto.dose.amount = -1;
    expect(() => requestV4.setRequestDto(requestDto)).toThrow(
      new ValidationErrorType(
        CONSTANTS.ERRORS.REQUEST_V4.DOSE_AMOUNT_GREATER_THAN_10
      )
    );
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });
  it("should not throw an error when applicators are undefined", () => {
    requestDto.dose = {
      amount: 0,
    };
    requestV4.setRequestDto(requestDto);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(0);
  });

  it("should parse request to protocol with success when dose amount is 0", () => {
    requestV4.setRequestDto(requestDto);
    loggerMocked.clear();
    const result = requestV4.toProtocol();
    let protocol = CONSTANTS.REQUEST_V4.HEADER + "NNNxxxxxxx";
    protocol += checkSumBuilder.build(protocol) + "\r\n";
    expect(result).toBe(protocol);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(0);
  });

  it("should parse request to protocol with success when dose amount is 10", () => {
    requestDto.dose.amount = 10;
    requestV4.setRequestDto(requestDto);
    loggerMocked.clear();
    const result = requestV4.toProtocol();
    let protocol = CONSTANTS.REQUEST_V4.HEADER + "N0Nxxxxxxx";
    protocol += checkSumBuilder.build(protocol) + "\r\n";
    expect(result).toBe(protocol);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(0);
  });

  it("should parse request to protocol with success when dose amount is > 0 and < 10", () => {
    requestDto.dose.amount = 5;
    requestV4.setRequestDto(requestDto);
    loggerMocked.clear();
    const result = requestV4.toProtocol();
    let protocol = CONSTANTS.REQUEST_V4.HEADER + "N5Nxxxxxxx";
    protocol += checkSumBuilder.build(protocol) + "\r\n";
    expect(result).toBe(protocol);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(0);
  });
});
