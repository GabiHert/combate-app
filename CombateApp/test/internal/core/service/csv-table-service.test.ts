import { v4 } from 'uuid';
import { RequestDto } from '../../../../src/internal/core/dto/request-dto';
import { ResponseDto } from '../../../../src/internal/core/dto/response-dto';
import { EventEnum } from '../../../../src/internal/core/enum/event';
import { StatusEnum } from '../../../../src/internal/core/enum/status';
import { WriteFileErrorType } from '../../../../src/internal/core/error/error-type';
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
  let data: string;
  beforeEach(() => {
    csvTableService = new CsvTableService(loggerMocked, fileSystemMocked);
    loggerMocked.clear();
    fileSystemMocked.clear();
    args = {
      dose: { amount: 0 },
      client: v4(),
      deviceName: v4(),
      doseWeightG: 0.25,
      maxVelocity: 7,
      linesSpacing: 3,
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

    data =
      '&,CLIENTE,PROJETO,TALHAO,MAQUINA,CB4,ISCA,PESO g, VEL MAX,' +
      'CLIMA,RUAS,LINHAS,DATA,HORA,ERRO,EVENTO,ISCAS,TIME UTC,NRW,' +
      'LAT-WGS84,LON-WGS84,SPEED KNOTS\n' +
      `&,${requestDto.client},${requestDto.project},${requestDto.plot},${requestDto.tractorName},${
        requestDto.deviceName
      },${requestDto.poisonType},${requestDto.doseWeightG * 1000},${requestDto.maxVelocity},` +
      `${requestDto.weather},${requestDto.streetsAmount},${
        requestDto.linesAmount
      },${dateTimeFormatter.date(responseDto.gps.dateUTC)},${dateTimeFormatter.time(
        responseDto.gps.dateUTC
      )},${responseDto.errorCode},${EventEnum.EndTrackPoint.name},${requestDto.dose.amount},${
        responseDto.gps.timeUTC
      },${responseDto.gps.status},` +
      `${responseDto.gps.latitude},${responseDto.gps.longitude},${responseDto.gps.speedKnots}\n`;
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

    const result = csvTableService.insert(requestDto, responseDto, EventEnum.EndTrackPoint);
    await csvTableService.save(path);
    expect(result).toEqual({ row: 0, column: 0 });
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(fileSystemMocked.writeCalledWith[0]).toEqual({ data, path });
  });

  it('should erase data with success ', () => {
    csvTableService.erase(0, 0);
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
  });

  it('should erase and save data with success ', async () => {
    const path = v4();
    csvTableService.erase(0, 0);
    await csvTableService.save(path);

    data =
      '&,CLIENTE,PROJETO,TALHAO,MAQUINA,CB4,ISCA,PESO g, VEL MAX,' +
      'CLIMA,RUAS,LINHAS,DATA,HORA,ERRO,EVENTO,ISCAS,TIME UTC,NRW,' +
      'LAT-WGS84,LON-WGS84,SPEED KNOTS\n';

    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(fileSystemMocked.writeCalledWith[0]).toEqual({ data: data.replace('&', ''), path });
  });

  it('should throw an error when an error is thrown inside save', async () => {
    const errorMessage = v4();
    fileSystemMocked.writeError = errorMessage;
    await expect(async () => csvTableService.save('')).rejects.toThrow(
      new WriteFileErrorType(errorMessage)
    );
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(1);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBeGreaterThanOrEqual(1);
  });
});

export {};
