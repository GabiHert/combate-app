import { request } from 'http';
import { v4 } from 'uuid';
import { RequestDto } from '../../../../src/internal/core/dto/request-dto';
import { ResponseDto } from '../../../../src/internal/core/dto/response-dto';
import { EventEnum } from '../../../../src/internal/core/enum/event';
import { CsvTableService } from '../../../../src/internal/core/service/csv-table-service';
import { IDoseRequest } from '../../../../src/internal/interface/dose-request';
import { IRequestDtoArgs } from '../../../../src/internal/interface/request-dto-args';
import { FileSystemMock } from '../../../mock/file-system-mock';
import { LoggerMock } from '../../../mock/logger-mock';

describe('csv-table-service test', () => {
  let loggerMocked = new LoggerMock();
  let fileSystemMocked = new FileSystemMock();
  let csvTableService = new CsvTableService(loggerMocked, fileSystemMocked);
  let requestDto: RequestDto;
  let args: IRequestDtoArgs;
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
  });

  it('should insert data with success ', () => {
    const path = v4();
    const result = csvTableService.insert(requestDto, EventEnum.EndTrackPoint, path);
    expect(result).toEqual({ row: 0, column: 0 });
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
  });

  it('should insert and save data with success', async () => {
    const path = v4();
    const data = '';
    const result = csvTableService.insert(requestDto, EventEnum.EndTrackPoint, path);
    await csvTableService.save();
    expect(result).toEqual({ row: 0, column: 0 });
    expect(loggerMocked.infoCalled).toBeGreaterThanOrEqual(2);
    expect(loggerMocked.warnCalled).toBe(0);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(fileSystemMocked.writeCalledWith).toEqual({ data, path });
  });
});

export {};
