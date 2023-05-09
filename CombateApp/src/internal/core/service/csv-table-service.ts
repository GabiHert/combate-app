import { RequestDto } from '../dto/request-dto';
import { ResponseDto } from '../dto/response-dto';
import { Event } from '../enum/event';
import { PCsvTableService } from '../port/csv-table-service-port';
import { PFileSystem } from '../port/file-system-port';
import { PLogger } from '../port/logger-port';
import { dateTimeFormatter } from '../utils/date-time-formatter';

export class CsvTableService implements PCsvTableService {
  private _rows: Array<Array<string>>;
  constructor(private readonly _logger: PLogger, private readonly _fileSystem: PFileSystem) {
    this._rows = [
      '&,CLIENTE,PROJETO,TALHAO,MAQUINA,CB4,ISCA,PESO g, VEL MAX,CLIMA,RUAS,LINHAS,DATA,HORA,ERRO,EVENTO,ISCAS,TIME UTC,NRW,LAT-WGS84,LON-WGS84,SPEED KNOTS'.split(
        ','
      ),
    ];
  }
  insert(
    requestDto: RequestDto,
    responseDto: ResponseDto,
    event: Event
  ): { column: number; row: number } {
    this._logger.info({
      event: 'CsvTableService.insert',
      details: 'Process started',
      responseDto,
      requestDto,
      cbEvent: event,
    });

    const date = dateTimeFormatter.date(responseDto.gps.dateUTC);
    const time = dateTimeFormatter.time(responseDto.gps.dateUTC);
    const data = [
      '&',
      requestDto.client,
      requestDto.project,
      requestDto.plot,
      requestDto.tractorName,
      requestDto.deviceName,
      requestDto.poisonType,
      (requestDto.doseWeightKg * 1000).toString(),
      requestDto.maxVelocity.toString(),
      requestDto.weather,
      requestDto.streetsAmount.toString(),
      requestDto.linesAmount.toString(),
      date,
      time,
      responseDto.errorCode,
      event.name,
      requestDto.dose.amount.toString(),
      responseDto.gps.timeUTC,
      responseDto.gps.status,
      responseDto.gps.latitude.toString(),
      responseDto.gps.longitude.toString(),
      responseDto.gps.speedKnots.toString(),
    ];
    this._rows.push(data);

    const result = { row: 0, column: 0 };
    this._logger.info({ event: 'CsvTableService.insert', details: 'Process finished', result });
    return result;
  }
  erase(column: number, row: number): void {
    this._logger.info({
      event: 'CsvTableService.erase',
      details: 'Process started',
      column,
      row,
    });
    this._rows[row][column] = '';
    this._logger.info({ event: 'CsvTableService.erase', details: 'Process finished' });
  }
  async save(path: string): Promise<void> {
    this._logger.info({
      event: 'CsvTableService.save',
      details: 'Process started',
      path,
    });

    let data = '';
    this._rows.forEach((column) => {
      data += column.join() + '\n';
    });

    this._fileSystem.write(data, path);

    this._logger.info({ event: 'CsvTableService.save', details: 'Process finished' });
  }
}
