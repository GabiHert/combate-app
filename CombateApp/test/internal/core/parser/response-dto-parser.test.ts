import { ResponseDtoParser } from '../../../../src/internal/core/parser/response-dto-parser';
import { ResponseDto } from '../../../../src/internal/core/dto/response-dto';
import { StatusEnum } from '../../../../src/internal/core/enum/status';
import { ValidationErrorType } from '../../../../src/internal/core/error/error-type';
import { IGpsData } from '../../../../src/internal/interface/gps-data';
import { LoggerMock } from '../../../mock/logger-mock';
import { ProtocolRules, protocolRules } from '../../../../src/internal/core/rules/protocol-rules';
import {
  CheckSumBuilder,
  checkSumBuilder,
} from '../../../../src/internal/core/builder/check-sum-builder';

describe('response-dto-parser test', () => {
  let gpsData: IGpsData;
  let loggerMocked = new LoggerMock();
  let checkSumBuilder = new CheckSumBuilder(loggerMocked);
  let protocolRules = new ProtocolRules(loggerMocked, checkSumBuilder);
  let responseBuilder = new ResponseDtoParser(loggerMocked, protocolRules);
  beforeEach(() => {
    loggerMocked.clear();
  });
  it('should build responseDto with success when protocol is valid  ', () => {
    const protocol = '&00S000xxxU,001220.00,A,3001.89425,S,05109.81024,W,0.374,,240719,,,A75\r\n';
    gpsData = {
      dateUTC: new Date('2019-07-24T00:12:20.000Z'),
      latitude: -30.031570833333333,
      longitude: -51.163504,
      speedKnots: 0.374,
      timeUTC: '001220.00',
      status: 'A',
    };
    const responseDto = new ResponseDto(gpsData, StatusEnum.S, '000');
    const result = responseBuilder.parseV4(protocol);
    expect(result).toEqual(responseDto);
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
  });

  it('should build responseDto with success when errorCode is 001 and status is E ', () => {
    const protocol = '&00E001xxxb,001220.00,A,3001.89425,S,05109.81024,W,0.374,,240719,,,A75\r\n';
    gpsData = {
      dateUTC: new Date('2019-07-24T00:12:20.000Z'),
      latitude: -30.031570833333333,
      longitude: -51.163504,
      speedKnots: 0.374,
      timeUTC: '001220.00',
      status: 'A',
    };
    const responseDto = new ResponseDto(gpsData, StatusEnum.E, '001');
    const result = responseBuilder.parseV4(protocol);
    expect(result).toEqual(responseDto);
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
  });

  it('should build responseDto with success when protocol has invalid GPS data', () => {
    const protocol = '&00S000xxxU,001220.00,V,3001.89425,S,05109.81024,W,0.374,,240719,,,A75\r\n';
    gpsData = {
      status: 'V',
    };
    const responseDto = new ResponseDto(gpsData, StatusEnum.S, '000');

    expect(responseBuilder.parseV4(protocol)).toEqual(responseDto);
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
  });

  it('should return an error when protocol does not mach the rules', () => {
    const protocol = '&00S000xxxU\r\n';

    expect(() => responseBuilder.parseV4(protocol)).toThrow(
      new ValidationErrorType('Protocol length does not mach rules')
    );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
  });
});
