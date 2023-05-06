import { exp } from 'react-native-reanimated';
import {
  CheckSumBuilder,
  checkSumBuilder,
} from '../../../../src/internal/core/builder/check-sum-builder';
import { ValidationErrorType } from '../../../../src/internal/core/error/error-type';
import { ProtocolRules } from '../../../../src/internal/core/rules/protocol-rules';
import { LoggerMock } from '../../../mock/logger-mock';

describe('protocol-riles test', () => {
  let loggerMocked = new LoggerMock();
  let checkSumBuilder = new CheckSumBuilder(loggerMocked);
  let protocolRules = new ProtocolRules(loggerMocked, checkSumBuilder);
  beforeEach(() => {
    loggerMocked.clear();
  });

  it('should not throw an error when request is valid', () => {
    const protocol =
      '&00S000xxx' +
      checkSumBuilder.build('00S000xxx') +
      ',001220.00,A,3001.89425,S,05109.81024,W,0.374,,240719,,,A75\r\n';
    protocolRules.V4(protocol);
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(0);
  });

  it('should throw an error when V4 protocol length is invalid', () => {
    const protocol = '&';
    expect(() => protocolRules.V4(protocol)).toThrow(
      new ValidationErrorType('Protocol length does not mach rules')
    );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });
  it('should throw an error when V4 protocol has no full information', () => {
    const protocol = '&00S000xxU,001220.00,A,3001.89425,S,05109.81024,W,0.374,,240719,,,A75\r\n';
    expect(() => protocolRules.V4(protocol)).toThrow(
      new ValidationErrorType('Protocol length does not mach rules')
    );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });
  it('should throw an error when V4 protocol header is invalid', () => {
    const protocol = '!00S000xxxU,001220.00,A,3001.89425,S,05109.81024,W,0.374,,240719,,,A75\r\n';
    expect(() => protocolRules.V4(protocol)).toThrow(
      new ValidationErrorType('Protocol header does not mach rules')
    );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });
  it('should throw an error when V4 protocol checkSum is invalid', () => {
    const protocol = '&00S000xxxS,001220.00,A,3001.89425,S,05109.81024,W,0.374,,240719,,,A75\r\n';
    expect(() => protocolRules.V4(protocol)).toThrow(
      new ValidationErrorType('Protocol checkSum does not mach rules')
    );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });
  it('should throw an error when V4 protocol wheelBoltsCount are invalid', () => {
    const protocol =
      '&xxS000xxx' +
      checkSumBuilder.build('xxS000xxx') +
      ',001220.00,A,3001.89425,S,05109.81024,W,0.374,,240719,,,A75\r\n';
    expect(() => protocolRules.V4(protocol)).toThrow(
      new ValidationErrorType('Protocol wheelBoltsCounter does not mach rules')
    );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });
  it('should throw an error when V4 protocol status is invalid', () => {
    const protocol =
      '&00R000xxx' +
      checkSumBuilder.build('00R000xxx') +
      ',001220.00,A,3001.89425,S,05109.81024,W,0.374,,240719,,,A75\r\n';
    expect(() => protocolRules.V4(protocol)).toThrow(
      new ValidationErrorType('Protocol status does not mach rules')
    );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });
  it('should throw an error when V4 protocol errorCode is invalid', () => {
    const protocol =
      '&00EWWWxxx' +
      checkSumBuilder.build('00EWWWxxx') +
      ',001220.00,A,3001.89425,S,05109.81024,W,0.374,,240719,,,A75\r\n';
    expect(() => protocolRules.V4(protocol)).toThrow(
      new ValidationErrorType('Protocol errorCode does not mach rules')
    );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });
});

export {};
