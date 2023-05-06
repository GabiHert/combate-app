import { CheckSumBuilder } from '../../../../src/internal/core/builder/check-sum-builder';
import { LoggerMock } from '../../../mock/logger-mock';

describe('check-sum-builder test', () => {
  let loggerMocked = new LoggerMock();
  let checkSumBuilder = new CheckSumBuilder(loggerMocked);
  beforeEach(() => {
    loggerMocked.clear();
  });
  it('should build sum with success', () => {
    expect(checkSumBuilder.build('54S000xxx')).toBe('L');
    expect(loggerMocked.infoCalled).toBe(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
  });
});
