import { v4 } from 'uuid';
import { RequestDto } from '../../../../src/internal/core/dto/request-dto';
import { ResponseDto } from '../../../../src/internal/core/dto/response-dto';
import { EventEnum } from '../../../../src/internal/core/enum/event';
import { StatusEnum } from '../../../../src/internal/core/enum/status';
import { CsvTableService } from '../../../../src/internal/core/service/csv-table-service';
import { dateTimeFormatter } from '../../../../src/internal/core/utils/date-time-formatter';
import { IGpsData } from '../../../../src/internal/interface/gps-data';
import { IRequestDtoArgs } from '../../../../src/internal/interface/request-dto-args';
import { FileSystemMock } from '../../../mock/file-system-mock';
import { LoggerMock } from '../../../mock/logger-mock';

describe('csv-table-service test', () => {
  let loggerMocked = new LoggerMock();
  let fileSystemMocked = new FileSystemMock();
  let csvTableService = new CsvTableService(loggerMocked, fileSystemMocked);
  let requestDto: RequestDto;
  let responseDto: ResponseDto;
  let args: IRequestDtoArgs;
  let gpsData: IGpsData;
  beforeEach(() => {
    loggerMocked.clear();
    fileSystemMocked.clear();
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
    gpsData = {
      status: 'A',
      dateUTC: new Date(),
      latitude: 12345.3,
      longitude: -12345.2,
      speedKnots: 23,
      timeUTC: v4(),
    };
    responseDto = new ResponseDto(gpsData, StatusEnum.S, '000');
  });

  it('should insert data with success ', () => {
    const result = csvTableService.insert(requestDto, responseDto, EventEnum.EndTrackPoint);
    expect(result).toEqual({ row: 0, column: 0 });
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
  });

  it('should insert and save data with success', async () => {
    const path = v4();

    const data =
      '&,CLIENTE,PROJETO,TALHAO,MAQUINA,CB4,ISCA,PESO g, VEL MAX,' +
      'CLIMA,RUAS,LINHAS,DATA,HORA,ERRO,EVENTO,ISCAS,TIME UTC,NRW,' +
      'LAT-WGS84,LON-WGS84,SPEED KNOTS\n' +
      `&,${requestDto.client},${requestDto.project},${requestDto.plot},${requestDto.tractorName},${
        requestDto.deviceName
      },${requestDto.poisonType},${requestDto.doseWeightKg * 1000},${requestDto.maxVelocity},` +
      `${requestDto.weather},${requestDto.streetsAmount},${
        requestDto.linesAmount
      },${dateTimeFormatter.date(responseDto.gps.dateUTC)},${dateTimeFormatter.time(
        responseDto.gps.dateUTC
      )},${responseDto.errorCode},${EventEnum.EndTrackPoint.name},${requestDto.dose.amount},${
        responseDto.gps.timeUTC
      },${responseDto.gps.status},` +
      `${responseDto.gps.latitude},${responseDto.gps.longitude},${responseDto.gps.speedKnots}\n`;

    const result = csvTableService.insert(requestDto, responseDto, EventEnum.EndTrackPoint);
    await csvTableService.save(path);
    expect(result).toEqual({ row: 0, column: 0 });
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(fileSystemMocked.writeCalledWith[0]).toEqual({ data, path });
  });
});

export {};
