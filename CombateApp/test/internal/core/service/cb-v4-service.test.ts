import { BluetoothApp } from '../../../../src/cmd/bluetoothapp/bluetooth-app';
import {
  CheckSumBuilder,
  checkSumBuilder,
} from '../../../../src/internal/core/builder/check-sum-builder';
import { RequestDto } from '../../../../src/internal/core/dto/request-dto';
import { ResponseDto } from '../../../../src/internal/core/dto/response-dto';
import {
  ResponseDtoParser,
  responseDtoParser,
} from '../../../../src/internal/core/parser/response-dto-parser';
import { ProtocolRules, protocolRules } from '../../../../src/internal/core/rules/protocol-rules';
import { CbV4Service } from '../../../../src/internal/core/service/cb-v4-service';
import { BluetoothMock } from '../../../mock/bluetooth-mock';
import { LoggerMock } from '../../../mock/logger-mock';

describe('cb-v4-service', () => {
  let loggerMocked = new LoggerMock();
  let bluetoothMocked = new BluetoothMock();
  let checkSumBuilder = new CheckSumBuilder(loggerMocked);
  let protocolRules = new ProtocolRules(loggerMocked, checkSumBuilder);
  let responseDtoParser = new ResponseDtoParser(loggerMocked, protocolRules);
  let cbV4Service = new CbV4Service(loggerMocked, bluetoothMocked, responseDtoParser);
  let request = new RequestDto();
  beforeEach(() => {
    loggerMocked.clear();
    bluetoothMocked.clear();
  });
  it('should process request with success when no dose is requested', () => {});
});

export {};
