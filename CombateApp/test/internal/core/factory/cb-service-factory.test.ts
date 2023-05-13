import { ProtocolVersionEnum } from '../../../../src/internal/core/enum/protocol-version';
import { CbServiceFactory } from '../../../../src/internal/core/factory/cb-service-factory';
import { ResponseDtoParser } from '../../../../src/internal/core/parser/response-dto-parser';

import { CbV4Service } from '../../../../src/internal/core/service/cb-v4-service';
import { BluetoothMock } from '../../../mock/bluetooth-mock';
import { LoggerMock } from '../../../mock/logger-mock';

let mockBluetooth = jest.fn().mockImplementation(() => new BluetoothMock());
jest.mock('../../../../src/internal/core/port/bluetooth-port', () => {
  return jest.fn(() => {
    return {
      bluetooth: mockBluetooth,
    };
  });
});

describe('cb-service-factory unit test', () => {
  let loggerMocked = new LoggerMock();
  let responseBuilder = new ResponseDtoParser(loggerMocked);
  let cbServiceFactory = new CbServiceFactory(loggerMocked, undefined, responseBuilder);
  beforeEach(() => {
    loggerMocked.clear();
  });

  it('should factory an V4 Service when protocol version is V4', () => {
    const result = cbServiceFactory.factory(ProtocolVersionEnum.V4);
    const service = new CbV4Service(loggerMocked, undefined, responseBuilder);
    expect(result).toEqual(service);
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.errorCalled).toBe(0);
  });
});

export {};
