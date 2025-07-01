import { CONSTANTS } from "../../config/config";
import { RequestDto } from "../dto/request-dto";
import { ResponseDto } from "../dto/response-dto";
import { EventEnum } from "../enum/event";
import { PCsvTableService } from "../port/csv-table-service-port";
import { PFileSystem } from "../port/file-system-port";
import { PLogger } from "../port/logger-port";
import { dateTimeFormatter } from "../utils/date-time-formatter";

interface Fields {
  ID: string;
  CLIENTE: string;
  MODULO: string;
  EQUIPAMENTO: string;
  FAZENDA: string;
  ATIVIDADE: string;
  TALHAO: string;
  MAQUINA: string;
  CB: string;
  DOSADORES: string;
  DOSES_TOTAIS: string;
  TIPO_DE_ISCA: string;
  "PESO_POR_DOSE_(G)": string;
  "TOTAL_APLICADO_(KG)": string;
  VELOCIDADE_MAXIMA: string;
  CLIMA: string;
  RUAS: string;
  LINHAS: string;
  DATA: string;
  HORA: string;
  TZ: string;
  ERRO: string;
  ALERTA: string;
  EVENTO: string;
  T_A: string;
  SUP_TS: string;
  LATITUDE: string;
  LONGITUDE: string;
  "VELOCIDADE_(KM/H)": string;
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
        ID: "",
        CLIENTE: "",
        MODULO: "",
        EQUIPAMENTO: "",
        FAZENDA: "",
        ATIVIDADE: "",
        TALHAO: "",
        MAQUINA: "",
        CB: "",
        DOSADORES: "",
        DOSES_TOTAIS: "",
        TIPO_DE_ISCA: "",
        "PESO_POR_DOSE_(G)": "",
        "TOTAL_APLICADO_(KG)": "",
        VELOCIDADE_MAXIMA: "",
        CLIMA: "",
        RUAS: "",
        LINHAS: "",
        DATA: "",
        HORA: "",
        TZ: "",
        ERRO: "",
        ALERTA: "",
        EVENTO: "",
        T_A: "",
        SUP_TS: "",
        LATITUDE: "",
        LONGITUDE: "",
        "VELOCIDADE_(KM/H)": "",
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
      let Evento: string = "";
      if (CONSTANTS.PRESET_NAMES.includes(requestDto.event)) {
        T_A = EventEnum.Local.name;
      } else {
        T_A = EventEnum.TrackPoint.name;
      }

      if (!CONSTANTS.EVENTS_TO_EXCLUDE.includes(requestDto.event)) {
        Evento = requestDto.event;
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
          EventEnum.Systematic.name,
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
    let SUP_TS = "";

    if (Evento.length > 0) {
      SUP_TS = CONSTANTS.SUP_TS_PARSE_TABLE[Evento];
    }
    console.log("buildFields: ", {
      ID: this._id.toString(),
      CLIENTE: requestDto.client,
      MODULO: requestDto.module,
      EQUIPAMENTO: requestDto.idEquipment,
      FAZENDA: requestDto.farm,
      ATIVIDADE: requestDto.activity,
      TALHAO: requestDto.plot,
      MAQUINA: requestDto.tractorName,
      CB: requestDto.deviceName,
      DOSADORES: applicatorsAmount.toString(),
      DOSES_TOTAIS: doseAmount.toString(),
      TIPO_DE_ISCA: requestDto.poisonType,
      "PESO_POR_DOSE_(G)": requestDto.doseWeightG.toString(),
      "TOTAL_APLICADO_(KG)": (
        (requestDto.doseWeightG * doseAmount) /
        1000
      ).toFixed(2),
      VELOCIDADE_MAXIMA: requestDto.maxVelocity.toString(),
      CLIMA: requestDto.weather,
      RUAS: requestDto.streetsAmount.toString(),
      LINHAS: requestDto.linesSpacing.toString(),
      DATA: dateTimeFormatter.date(date),
      HORA: Hora,
      TZ,
      ERRO: responseDto.errorCode,
      ALERTA: requestDto.alert ? requestDto.alert.toUpperCase() : "",
      EVENTO: Evento ? Evento.toUpperCase() : "",
      T_A,
      SUP_TS,
      LATITUDE: responseDto.gps.latitude
        ? responseDto.gps.latitude.toString()
        : "",
      LONGITUDE: responseDto.gps.longitude
        ? responseDto.gps.longitude.toString()
        : "",
      "VELOCIDADE_(KM/H)": responseDto.gps.speed,
    });
    return {
      ID: this._id.toString(),
      CLIENTE: requestDto.client,
      MODULO: requestDto.module,
      EQUIPAMENTO: requestDto.idEquipment,
      FAZENDA: requestDto.farm,
      ATIVIDADE: requestDto.activity,
      TALHAO: requestDto.plot,
      MAQUINA: requestDto.tractorName,
      CB: requestDto.deviceName,
      DOSADORES: applicatorsAmount.toString(),
      DOSES_TOTAIS: doseAmount.toString(),
      TIPO_DE_ISCA: requestDto.poisonType,
      "PESO_POR_DOSE_(G)": requestDto.doseWeightG.toString(),
      "TOTAL_APLICADO_(KG)": (
        (requestDto.doseWeightG * doseAmount) /
        1000
      ).toFixed(2),
      VELOCIDADE_MAXIMA: requestDto.maxVelocity.toString(),
      CLIMA: requestDto.weather,
      RUAS: requestDto.streetsAmount.toString(),
      LINHAS: requestDto.linesSpacing.toString(),
      DATA: dateTimeFormatter.date(date),
      HORA: Hora,
      TZ,
      ERRO: responseDto.errorCode,
      ALERTA: requestDto.alert ? requestDto.alert.toUpperCase() : "",
      EVENTO: Evento ? Evento.toUpperCase() : "",
      T_A,
      SUP_TS,
      LATITUDE: responseDto.gps.latitude
        ? responseDto.gps.latitude.toString()
        : "",
      LONGITUDE: responseDto.gps.longitude
        ? responseDto.gps.longitude.toString()
        : "",
      "VELOCIDADE_(KM/H)": responseDto.gps.speed,
    };
  }
}
