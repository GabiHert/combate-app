import {
  CheckSumBuilder,
  checkSumBuilder,
} from '../../../src/internal/core/builder/check-sum-builder';
import { CbServiceFactory } from '../../../src/internal/core/factory/cb-service-factory';
import { RequestFactory } from '../../../src/internal/core/factory/request-factory';
import { ResponseDtoParser } from '../../../src/internal/core/parser/response-dto-parser';
import { ProtocolRules, protocolRules } from '../../../src/internal/core/rules/protocol-rules';
import { CsvTableService } from '../../../src/internal/core/service/csv-table-service';
import { BluetoothMock } from '../../mock/bluetooth-mock';
import { CsvTableServiceMock } from '../../mock/csv-table-service-mock';
import { LoggerMock } from '../../mock/logger-mock';

describe('combate-app unit tests', () => {
  let loggerMocked = new LoggerMock();
  let bluetoothMocked = new BluetoothMock();
  let checkSumBuilder = new CheckSumBuilder(loggerMocked);
  let protocolRules = new ProtocolRules(loggerMocked, checkSumBuilder);
  let responseDtoParser = new ResponseDtoParser(loggerMocked, protocolRules);
  let cbServiceFactory = new CbServiceFactory(loggerMocked, bluetoothMocked, responseDtoParser);
  let csvTableServiceMocked = new CsvTableServiceMock();
  let requestFactory = new RequestFactory(loggerMocked);

  beforeEach(() => {
    loggerMocked.clear();
    bluetoothMocked.clear();
    csvTableServiceMocked.clear();
  });
  it('should', () => {});
});

export {};
