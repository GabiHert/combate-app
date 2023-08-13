import gpsSentenceParser from "@drivetech/node-nmea";
import { IGpsData } from "../../interface/gps-data";
import { ResponseDto } from "../dto/response-dto";
import { Status } from "../enum/status";
import { PLogger } from "../port/logger-port";
import { ProtocolRules } from "../rules/protocol-rules";
export class ResponseDtoParser {
  constructor(
    private readonly _logger: PLogger,
    private _protocolRules: ProtocolRules
  ) {}

  parseV4(protocol: string): ResponseDto {
    try {
      this._logger.info({
        event: "ResponseBuilder.buildV4",
        details: "Process started",
        protocol,
      });

      this._protocolRules.V4(protocol);

      let sentence = protocol.substring(11);
      sentence = sentence.substring(0, sentence.length - 1);
      const status = new Status(protocol[3]);
      const errorCode = protocol.substring(4, 7);
      const commaSeparated = sentence.split(",");

      //Adds "*" to checkSum. Ex: A30 --> A*30
      const gprmcCs =
        commaSeparated[commaSeparated.length - 1][0] +
        "*" +
        commaSeparated[commaSeparated.length - 1][1] +
        commaSeparated[commaSeparated.length - 1][2];

      commaSeparated[commaSeparated.length - 1] = gprmcCs;

      const gprmc = "$GPRMC" + commaSeparated.join(",");
      const data = gpsSentenceParser.parse(gprmc);

      let gpsData: IGpsData;
      if (data.valid) {
        const speed = Math.trunc(data.speed.knots * 1.852).toString();

        const date = <Date>data.datetime;
        gpsData = {
          status: data.mode[0],
          latitude: data.loc.geojson.coordinates[1],
          longitude: data.loc.geojson.coordinates[0],
          speed,
          dateUTC: date,
        };
      } else gpsData = { status: "V" };

      const responseDto = new ResponseDto(gpsData, status, errorCode, "4");

      this._logger.info({
        event: "ResponseBuilder.buildV4",
        details: "Process finished",
        responseDto,
      });

      return responseDto;
    } catch (err) {
      this._logger.error({
        event: "ResponseBuilder.buildV4",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }

  parseV5(protocol: string): ResponseDto {
    try {
      this._logger.info({
        event: "ResponseBuilder.buildV5",
        details: "Process started",
        protocol,
      });

      this._protocolRules.V5(protocol);

      let sentence = protocol.substring(10);
      sentence = sentence.substring(0, sentence.length - 1);
      const status = new Status(protocol[2]);
      const errorCode = protocol.substring(3, 6);

      const gprmc = "$GPRMC" + sentence;
      const data = gpsSentenceParser.parse(gprmc);

      let gpsData: IGpsData;
      if (data.valid) {
        const speed = Math.trunc(data.speed.knots * 1.852).toString();

        const date = <Date>data.datetime;
        gpsData = {
          status: data.mode[0],
          latitude: data.loc.geojson.coordinates[1],
          longitude: data.loc.geojson.coordinates[0],
          speed,
          dateUTC: date,
        };
      } else gpsData = { status: "V" };

      const leftApplicator = protocol[6] == "1";
      const centerApplicator = protocol[7] == "1";
      const rightApplicator = protocol[8] == "1";

      const responseDto = new ResponseDto(
        gpsData,
        status,
        errorCode,
        protocol[1],
        centerApplicator,
        leftApplicator,
        rightApplicator
      );

      this._logger.info({
        event: "ResponseBuilder.buildV5",
        details: "Process finished",
        responseDto,
      });

      return responseDto;
    } catch (err) {
      this._logger.error({
        event: "ResponseBuilder.buildV5",
        details: "Process error",
        error: err.message,
      });

      throw err;
    }
  }
}
