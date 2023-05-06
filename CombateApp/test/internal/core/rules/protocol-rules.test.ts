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
    let protocol = "&"
    protocolRules.V4(protocol)
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1)
  });
  it('should throw an error when V4 protocol header is invalid', () => {});
  it('should throw an error when V4 protocol checkSum is invalid', () => {});
  it('should throw an error when V4 protocol wheelBoltsCount is invalid', () => {});
  it('should throw an error when V4 protocol status is invalid', () => {});
  it('should throw an error when V4 protocol errorCode is invalid', () => {});
});

export {};
