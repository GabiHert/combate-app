import { exp } from 'react-native-reanimated';
import {
  CheckSumBuilder,
  checkSumBuilder,
} from '../../../../src/internal/core/builder/check-sum-builder';
import { ProtocolRules } from '../../../../src/internal/core/rules/protocol-rules';
import { LoggerMock } from '../../../mock/logger-mock';

describe('protocol-riles test', () => {
  let loggerMocked = new LoggerMock();
  let checkSumBuilder = new CheckSumBuilder(loggerMocked);
  let protocolRules = new ProtocolRules(loggerMocked, checkSumBuilder);
  beforeEach(() => {
    loggerMocked.clear();
  });

  it('should throw an error when V4 protocol length is invalid', () => {
    const protocol = '&';
    expect(()=>protocolRules.V4(protocol)).toThrow(new );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });
  it('should throw an error when V4 protocol header is invalid', () => {
    const protocol = '!00S000xxxU,001220.00,A,3001.89425,S,05109.81024,W,0.374,,240719,,,A75\r\n';
    protocolRules.V4(protocol);
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBeGreaterThanOrEqual(1);
  });
  it('should throw an error when V4 protocol checkSum is invalid', () => {});
  it('should throw an error when V4 protocol wheelBoltsCount is invalid', () => {});
  it('should throw an error when V4 protocol status is invalid', () => {});
  it('should throw an error when V4 protocol errorCode is invalid', () => {});
});

export {};
