import { CONSTANTS } from "../../config/config";
import { RequestDto } from "../dto/request-dto";
import { ResponseDto } from "../dto/response-dto";
import { EventEnum } from "../enum/event";
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
  Dose_Kg: string;
  VelocidadeMaxima: string;
  Clima: string;
  Ruas: string;
  Linhas: string;
  Data: string;
  Hora: string;
  TZ: string;
  Erro: string;
  Alerta: string;
  Evento: string;
  T_A: string;
  SUP_TS: string;
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

  private async write(fields: any, path: string) {
    let data = [];
    Object.keys(fields).forEach((key) => {
      data.push(fields[key]);
    });

    data.push("\n");

    await this._fileSystem.write(data.join(","), path);
  }

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
        Dose_Kg: "",
        VelocidadeMaxima: "",
        Clima: "",
        Ruas: "",
        Linhas: "",
        Data: "",
        Hora: "",
        TZ: "",
        Erro: "",
        Alerta: "",
        Evento: "",
        T_A: "",
        SUP_TS: "",
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

      let requestedApplicatorsAmount = 0;
      if (requestDto.dose) {
        requestedApplicatorsAmount =
          (requestDto.dose.centerApplicator ? 1 : 0) +
          (requestDto.dose.leftApplicator ? 1 : 0) +
          (requestDto.dose.rightApplicator ? 1 : 0);
      }

      let respondedApplicatorsAmount =
        (responseDto.centerApplicator ? 1 : 0) +
        (responseDto.leftApplicator ? 1 : 0) +
        (responseDto.rightApplicator ? 1 : 0);

      let doseAmount: number = 0;
      let systematicDoses: number = 0;
      const requestedDoses = requestDto?.dose?.amount || 0;

      if (responseDto.status != "N" && responseDto.status != "E") {
        let aux = Number(responseDto.status);
        if (aux == 0) {
          aux = 10;
        }

        if (aux > requestedDoses) {
          systematicDoses = (aux - requestedDoses) * respondedApplicatorsAmount;
          doseAmount = requestedDoses * requestedApplicatorsAmount;
        } else {
          doseAmount = aux * requestedApplicatorsAmount;
        }
      }

      let T_A: string;
      let Evento: string;
      if (CONSTANTS.PRESET_NAMES.includes(requestDto.event)) {
        T_A = EventEnum.Local.name;
        Evento = requestDto.event;
      } else {
        T_A = EventEnum.TrackPoint.name;
      }

      const fields = this.buildFields(
        requestDto,
        requestedApplicatorsAmount,
        doseAmount,
        responseDto,
        Evento,
        T_A
      );

      await this.write(fields, path);

      if (systematicDoses) {
        const fieldsSystematic = this.buildFields(
          requestDto,
          requestedApplicatorsAmount,
          doseAmount,
          responseDto,
          Evento,
          EventEnum.Systematic.name
        );
        await this.write(fieldsSystematic, path);
      }

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

  private buildFields(
    requestDto: RequestDto,
    applicatorsAmount: number,
    doseAmount: number,
    responseDto: ResponseDto,
    Evento: string,
    T_A: string
  ): Fields {
    const date = new Date();
    const [Hora, TZ] = date.toTimeString().split(" ");
    let SUP_TS = "0";

    if (Evento.length > 0) {
      SUP_TS = CONSTANTS.SUP_TS_PARSE_TABLE[Evento];
    }

    return {
      Id: this._id.toString(),
      Cliente: requestDto.client,
      Projeto: requestDto.project,
      Atividade: requestDto.activity,
      Talhao: requestDto.plot,
      Maquina: requestDto.tractorName,
      CB: requestDto.deviceName,
      Dosadores: applicatorsAmount.toString(),
      DosesTotais: doseAmount.toString(),
      TipoIsca: requestDto.poisonType,
      PesoG: requestDto.doseWeightG.toString(),
      Dose_Kg: ((requestDto.doseWeightG * doseAmount) / 1000).toFixed(2),
      VelocidadeMaxima: requestDto.maxVelocity.toString(),
      Clima: requestDto.weather,
      Ruas: requestDto.streetsAmount.toString(),
      Linhas: requestDto.linesSpacing.toString(),
      Data: dateTimeFormatter.date(date),
      Hora,
      TZ,
      Erro: responseDto.errorCode,
      Alerta: requestDto.alert,
      Evento,
      T_A,
      SUP_TS,
      Latitude: responseDto.gps.latitude
        ? responseDto.gps.latitude.toString()
        : "",
      Longitude: responseDto.gps.longitude
        ? responseDto.gps.longitude.toString()
        : "",
      VelocidadeKmH: responseDto.gps.speed,
    };
  }
}
