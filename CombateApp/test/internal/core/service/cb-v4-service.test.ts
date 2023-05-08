import { CheckSumBuilder } from '../../../../src/internal/core/builder/check-sum-builder';
import { RequestDto } from '../../../../src/internal/core/dto/request-dto';
import { ResponseDto } from '../../../../src/internal/core/dto/response-dto';
import { ProtocolVersionEnum } from '../../../../src/internal/core/enum/protocol-version';
import { StatusEnum } from '../../../../src/internal/core/enum/status';
import {
  RequestFactory,
  requestFactory,
} from '../../../../src/internal/core/factory/request-factory';
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
  let requestDto = new RequestDto({ amount: 0 });

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
  });

  it('should throw an error when request taeks too long', async () => {
    const gpsData: IGpsData = { status: 'V' };
    bluetoothMocked.readDelay = 2000;
    bluetoothMocked.readResult = () => {
      return '&00S000xxx' + checkSumBuilder.build('00S000xxx') + ',V,,,,,,,,,,A75\r\n';
    };
    const responseDto = new ResponseDto(gpsData, StatusEnum.S, '000');
    const request = new RequestFactory(loggerMocked).factory(requestDto, ProtocolVersionEnum.V4);
    await expect(async () => cbV4Service.request(request)).rejects.toThrow();
  });
});

export {};
