import { RequestDto } from "../dto/request-dto";
import { ResponseDto } from "../dto/response-dto";
import { PCsvTableService } from "../port/csv-table-service-port";
import { PFileSystem } from "../port/file-system-port";
import { PLogger } from "../port/logger-port";
import { dateTimeFormatter } from "../utils/date-time-formatter";

interface Fields {
  Id: string;
  Cliente: string;
  Projeto: string;
  Atividade: string;
  Talhao: string;
  Maquina: string;
  CB: string;
  Dosadores: string;
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
  private _id: number = 0;

  constructor(
    private readonly _logger: PLogger,
    private readonly _fileSystem: PFileSystem
  ) {}

  async begin(path: string): Promise<void> {
    try {
      this._logger.info({
        event: "CsvTableService.insert",
        details: "Process started",
        path,
      });

      this._id = 0;
      const fields: Fields = {
        Id: "",
        Cliente: "",
        Atividade: "",
        Projeto: "",
        Talhao: "",
        Maquina: "",
        CB: "",
        Dosadores: "",
        DosesTotais: "",
        TipoIsca: "",
        PesoG: "",
        VelocidadeMaxima: "",
        Clima: "",
        Ruas: "",
        Linhas: "",
        Data: "",
        Hora: "",
        Erro: "",
        Alerta: "",
        Evento: "",
        Latitude: "",
        Longitude: "",
        VelocidadeKmH: "",
      };

      let data = [];
      Object.keys(fields).forEach((key) => {
        data.push(key);
      });

      data.push("\n");

      await this._fileSystem.write(data.join(","), path);

      this._logger.info({
        event: "CsvTableService.insert",
        details: "Process finished",
      });
    } catch (err) {
      this._logger.error({
        event: "CsvTableService.insert",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }
  async insert(
    path: string,
    requestDto: RequestDto,
    responseDto: ResponseDto
  ): Promise<void> {
    try {
      this._logger.info({
        event: "CsvTableService.insert",
        details: "Process started",
        responseDto,
        requestDto,
      });

      const dateNow = new Date();
      const date = dateTimeFormatter.date(dateNow);
      const time = dateTimeFormatter.time(dateNow);

      let applicatorsAmount = 0;
      if (requestDto.dose) {
        applicatorsAmount =
          (requestDto.dose.centerApplicator ? 1 : 0) +
          (requestDto.dose.centerApplicator ? 1 : 0) +
          (requestDto.dose.centerApplicator ? 1 : 0);
      }

      let doseAmount: number = 0;

      if (responseDto.status != "N" && responseDto.status != "E") {
        let aux = Number(responseDto.status);
        if (aux == 0) {
          aux = 10;
        }
        doseAmount == aux * applicatorsAmount;
      }

      const fields: Fields = {
        Id: this._id.toString(),
        Cliente: requestDto.client,
        Projeto: requestDto.project,
        Atividade: requestDto.activity,
        Talhao: requestDto.plot,
        Maquina: requestDto.tractorName,
        CB: requestDto.deviceName,
        Dosadores: applicatorsAmount.toString(),
        DosesTotais: !doseAmount ? "0" : doseAmount.toString(),
        TipoIsca: requestDto.poisonType,
        PesoG: requestDto.doseWeightG.toString(),
        VelocidadeMaxima: requestDto.maxVelocity.toString(),
        Clima: requestDto.weather,
        Ruas: requestDto.streetsAmount.toString(),
        Linhas: requestDto.linesSpacing.toString(),
        Data: date,
        Hora: time,
        Erro: responseDto.errorCode,
        Alerta: requestDto.alert,
        Evento: requestDto.event,
        Latitude: responseDto.gps.latitude
          ? responseDto.gps.latitude.toString()
          : "",
        Longitude: responseDto.gps.longitude
          ? responseDto.gps.longitude.toString()
          : "",
        VelocidadeKmH: responseDto.gps.speed,
      };

      let data = [];
      Object.keys(fields).forEach((key) => {
        data.push(fields[key]);
      });

      data.push("\n");

      await this._fileSystem.write(data.join(","), path);

      this._id++;
      this._logger.info({
        event: "CsvTableService.insert",
        details: "Process finished",
      });
    } catch (err) {
      this._logger.error({
        event: "CsvTableService.insert",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }
}
