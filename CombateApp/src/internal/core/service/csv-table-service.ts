import { RequestDto } from '../dto/request-dto';
import { ResponseDto } from '../dto/response-dto';
import { PCsvTableService } from '../port/csv-table-service-port';
import { PFileSystem } from '../port/file-system-port';
import { PLogger } from '../port/logger-port';
import { dateTimeFormatter } from '../utils/date-time-formatter';
interface Fields {
  Cliente: string;
  Projeto: string;
  Talhao: string;
  Maquina: string;
  CB: string;
  DosesTotais: string;
  TipoIsca: string;
  PesoG: string;
  VelocidadeMaxima: string;
  Clima: string;
  Ruas: string;
  Linhas: string;
  Data: string;
  Hora: string;
  Erro: string;
  Alerta: string;
  Evento: string;
  Latitude: string;
  Longitude: string;
  VelocidadeKmH: string;
}
export class CsvTableService implements PCsvTableService {
  constructor(private readonly _logger: PLogger, private readonly _fileSystem: PFileSystem) {
    
  }
  async begin(path: string): Promise<void> {
    try {
      this._logger.info({
        event: 'CsvTableService.insert',
        details: 'Process started',
        path,
        
      });

      const fields :Fields= {
        Cliente: "",
        Projeto: "",
        Talhao: "",
        Maquina: "",
        CB: "",
        DosesTotais: "",
        TipoIsca: "",
        PesoG:"",
        VelocidadeMaxima: "",
        Clima: "",
        Ruas: "",
        Linhas: "",
        Data: "",
        Hora: "",
        Erro: "",
        Alerta:"" ,
        Evento: "",
        Latitude:"",
        Longitude: "",
        VelocidadeKmH: "",
      };
      
      let data = []
      Object.keys(fields).forEach((key)=>{
          data.push(key)    
       })

       data.push('\n');

      await this._fileSystem.write(data.join(","),path)
      
      this._logger.info({ event: 'CsvTableService.insert', details: 'Process finished' });
    } catch (err) {
      this._logger.error({
        event: 'CsvTableService.insert',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }  }
  async insert(path:string,requestDto: RequestDto, responseDto: ResponseDto):Promise<void> {
    try {
      this._logger.info({
        event: 'CsvTableService.insert',
        details: 'Process started',
        responseDto,
        requestDto,
      });

      const date = dateTimeFormatter.date(responseDto.gps.dateUTC);
      const time = dateTimeFormatter.time(responseDto.gps.dateUTC);

      let doseAmount = 0;
      if(requestDto.dose&&requestDto.dose.amount){
        if (requestDto.dose.centerApplicator) {
          doseAmount += requestDto.dose.amount;
        }
        if (requestDto.dose.leftApplicator) {
          doseAmount += requestDto.dose.amount;
        }
        if (requestDto.dose.rightApplicator) {
          doseAmount += requestDto.dose.amount;
        }
        if(!requestDto.dose.rightApplicator&&!requestDto.dose.leftApplicator&&!requestDto.dose.centerApplicator){
          doseAmount = requestDto.dose.amount;
        }
      }else{
        requestDto.dose = {amount:0}
      }

      const fields :Fields= {
        Cliente: requestDto.client,
        Projeto: requestDto.project,
        Talhao: requestDto.plot,
        Maquina: requestDto.tractorName,
        CB: requestDto.deviceName,
        DosesTotais: doseAmount.toString(),
        TipoIsca: requestDto.poisonType,
        PesoG:requestDto.doseWeightG.toString(),
        VelocidadeMaxima: requestDto.maxVelocity.toString(),
        Clima: requestDto.weather,
        Ruas: requestDto.streetsAmount.toString(),
        Linhas: requestDto.linesSpacing.toString(),
        Data: date,
        Hora: time,
        Erro: responseDto.errorCode,
        Alerta:requestDto.alert ,
        Evento: requestDto.event,
        Latitude:responseDto.gps.latitude.toString(),
        Longitude: responseDto.gps.latitude.toString(),
        VelocidadeKmH: responseDto.gps.speed,
      };
      
      let data = []
      Object.keys(fields).forEach((key)=>{
        data.push(fields[key])  
       })

       data.push('\n')

      await this._fileSystem.write(data.join(","),path)
      
      this._logger.info({ event: 'CsvTableService.insert', details: 'Process finished' });
    } catch (err) {
      this._logger.error({
        event: 'CsvTableService.insert',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }

  async create(path: string): Promise<void> {
    try {
      this._logger.info({
        event: 'CsvTableService.create',
        details: 'Process started',
        path,
      });

      await this._fileSystem.create(path);

      this._logger.info({ event: 'CsvTableService.create', details: 'Process finished' });
    } catch (err) {
      this._logger.error({
        event: 'CsvTableService.create',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
}
