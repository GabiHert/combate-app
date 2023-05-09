import { throws } from 'assert';
import { RequestDto } from '../dto/request-dto';
import { ResponseDto } from '../dto/response-dto';
import { Event } from '../enum/event';
import { PCsvTableService } from '../port/csv-table-service-port';
import { PFileSystem } from '../port/file-system-port';
import { PLogger } from '../port/logger-port';

export class CsvTableService implements PCsvTableService {
  private _data: Array<Array<string>>;
  constructor(private readonly _logger: PLogger, private readonly _fileSystem: PFileSystem) {
    //todo:&,CLIENTE,PROJETO,TALHAO,MAQUINA,CB4,ISCA,PESO g, VEL MAX,CLIMA,RUAS,LINHAS,DATA,HORA,ERRO,EVENTO,ISCAS,TIME UTC,NRW,LAT-WGS84,LON-WGS84,SPEED KNOTS
  }
  insert(data: RequestDto, event: Event, path: string): { column: number; row: number } {
    this._logger.info({
      event: 'CsvTableService.insert',
      details: 'Process started',
      data,
      cbEvent: event,
    });
    const result = { row: 0, column: 0 };
    this._logger.info({ event: 'CsvTableService.insert', details: 'Process finished', result });
    return result;
  }
  delete(line: number, row: number): void {
    throw new Error('Method not implemented.');
  }
  async save(): Promise<void> {
    this._logger.info({
      event: 'CsvTableService.save',
      details: 'Process started',
    });

    const data = this._data.
    this._logger.info({ event: 'CsvTableService.save', details: 'Process finished', result });
  }
}
