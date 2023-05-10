import { v4 } from 'uuid';
import { CombateApp } from '../../../src/cmd/combateapp/combate-app';
import {
  CheckSumBuilder,
  checkSumBuilder,
} from '../../../src/internal/core/builder/check-sum-builder';
import { RequestDto } from '../../../src/internal/core/dto/request-dto';
import { EventEnum } from '../../../src/internal/core/enum/event';
import { CbServiceFactory } from '../../../src/internal/core/factory/cb-service-factory';
import { RequestFactory } from '../../../src/internal/core/factory/request-factory';
import { ResponseDtoParser } from '../../../src/internal/core/parser/response-dto-parser';
import { ProtocolRules, protocolRules } from '../../../src/internal/core/rules/protocol-rules';
import { CsvTableService } from '../../../src/internal/core/service/csv-table-service';
import { IRequestDtoArgs } from '../../../src/internal/interface/request-dto-args';
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
  let combateApp = new CombateApp(
    loggerMocked,
    cbServiceFactory,
    csvTableServiceMocked,
    requestFactory,
    protocolRules
  );
  let args: IRequestDtoArgs;
  let requestDto: RequestDto;
  beforeEach(() => {
    loggerMocked.clear();
    bluetoothMocked.clear();
    csvTableServiceMocked.clear();
    args = {
      dose: { amount: 0 },
      client: v4(),
      deviceName: v4(),
      doseWeightKg: 0.25,
      maxVelocity: 7,
      numberOfLines: 3,
      plot: v4(),
      poisonType: v4(),
      project: v4(),
      streetsAmount: 2,
      tractorName: v4(),
      weather: v4(),
    };
    requestDto = new RequestDto(args);
  });
  it('should begin app with success', async () => {
    const filePath = v4();
    const systematicMetersBetweenDose = 2;

    await combateApp.begin(filePath, systematicMetersBetweenDose);

    expect(csvTableServiceMocked.saveCalled).toBe(1);
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
  });

  it('should execute request with success when event is startTrackPoint', async () => {
    requestDto.event = EventEnum.StartTrackPoint;
    
    await combateApp.request(requestDto);

    expect(csvTableServiceMocked.insertCalled).toBe(1);
    expect(csvTableServiceMocked.saveCalled).toBe(0);
    expect(loggerMocked.infoCalled).toBe(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
  });
});

export {};
