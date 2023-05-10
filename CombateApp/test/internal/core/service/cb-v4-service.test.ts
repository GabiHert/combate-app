import { v4 } from 'uuid';
import { CheckSumBuilder } from '../../../../src/internal/core/builder/check-sum-builder';
import { RequestDto } from '../../../../src/internal/core/dto/request-dto';
import { ResponseDto } from '../../../../src/internal/core/dto/response-dto';
import { ProtocolVersionEnum } from '../../../../src/internal/core/enum/protocol-version';
import { StatusEnum } from '../../../../src/internal/core/enum/status';
import { RequestFactory } from '../../../../src/internal/core/factory/request-factory';
import { ResponseDtoParser } from '../../../../src/internal/core/parser/response-dto-parser';
import { ProtocolRules } from '../../../../src/internal/core/rules/protocol-rules';
import { CbV4Service } from '../../../../src/internal/core/service/cb-v4-service';
import { IGpsData } from '../../../../src/internal/interface/gps-data';
import { BluetoothMock } from '../../../mock/bluetooth-mock';
import { LoggerMock } from '../../../mock/logger-mock';

describe('cb-v4-service', () => {
  let loggerMocked = new LoggerMock();
  let bluetoothMocked = new BluetoothMock();
  let checkSumBuilder = new CheckSumBuilder(loggerMocked);
  let protocolRules = new ProtocolRules(loggerMocked, checkSumBuilder);
  let responseDtoParser = new ResponseDtoParser(loggerMocked, protocolRules);
  let cbV4Service = new CbV4Service(loggerMocked, bluetoothMocked, responseDtoParser);
  let requestDto = new RequestDto({
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
  });

  beforeEach(() => {
    loggerMocked.clear();
    bluetoothMocked.clear();
  });

  it('should process request with success when no dose is requested', async () => {
    const gpsData: IGpsData = { status: 'V' };
    bluetoothMocked.readResult = () => {
      return '&00S000xxx' + checkSumBuilder.build('00S000xxx') + ',V,,,,,,,,,,A75\r\n';
    };
    const responseDto = new ResponseDto(gpsData, StatusEnum.S, '000');
    const request = new RequestFactory(loggerMocked).factory(requestDto, ProtocolVersionEnum.V4);
    const result = await cbV4Service.request(request);
    expect(result).toEqual(responseDto);
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(0);
  });

  it('should process request with success when 1 dose is requested', async () => {
    const gpsData: IGpsData = { status: 'V' };
    bluetoothMocked.readResult = () => {
      return '&00S000xxx' + checkSumBuilder.build('00S000xxx') + ',V,,,,,,,,,,A75\r\n';
    };
    requestDto.dose.amount = 1;
    const responseDto = new ResponseDto(gpsData, StatusEnum.S, '000');
    const request = new RequestFactory(loggerMocked).factory(requestDto, ProtocolVersionEnum.V4);
    const result = await cbV4Service.request(request);
    expect(result).toEqual(responseDto);
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(0);
  });

  it('should throw an error when request takes too long', async () => {
    bluetoothMocked.readDelay = 6000;
    bluetoothMocked.readResult = () => {
      return '&00S000xxx' + checkSumBuilder.build('00S000xxx') + ',V,,,,,,,,,,A75\r\n';
    };
    const request = new RequestFactory(loggerMocked).factory(requestDto, ProtocolVersionEnum.V4);
    await expect(async () => cbV4Service.request(request)).rejects.toThrow(
      'Request timeout exceeded'
    );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBe(1);
    expect(loggerMocked.warnCalled).toBe(0);
  }, 10000);

  it('should throw an error when dose request takes too long', async () => {
    bluetoothMocked.readDelay = 11000;
    requestDto.dose.amount = 1;
    bluetoothMocked.readResult = () => {
      return '&00S000xxx' + checkSumBuilder.build('00S000xxx') + ',V,,,,,,,,,,A75\r\n';
    };
    const request = new RequestFactory(loggerMocked).factory(requestDto, ProtocolVersionEnum.V4);
    await expect(async () => cbV4Service.request(request)).rejects.toThrow(
      'Request timeout exceeded'
    );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.errorCalled).toBe(1);
    expect(loggerMocked.warnCalled).toBe(0);
  }, 12000);
});

export {};
