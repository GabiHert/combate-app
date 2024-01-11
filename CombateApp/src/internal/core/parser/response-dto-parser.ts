import gpsSentenceParser from "@drivetech/node-nmea";
import { IGpsData } from "../../interface/gps-data";
import { ResponseDto } from "../dto/response-dto";
import { PLogger } from "../port/logger-port";
import { ProtocolRules } from "../rules/protocol-rules";

export class ResponseDtoParser {
  constructor(
    private readonly _logger: PLogger,
    private _protocolRules: ProtocolRules
  ) {}

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
      const status = protocol[2];
      const errorCode = protocol.substring(3, 6);

      const gprmc = "$GPRMC" + sentence;
      const data = gpsSentenceParser.parse(gprmc);

      let gpsData: IGpsData;
      if (data.valid) {
        const speed = Math.trunc(data.speed.knots * 1.852).toString();

        const date = <Date>data.datetime;
        gpsData = {
          status: data?.mode ? data?.mode[0] : "A",
          latitude: data?.loc?.geojson?.coordinates
            ? data?.loc?.geojson?.coordinates[1]
            : "",
          longitude: data?.loc?.geojson?.coordinates
            ? data?.loc?.geojson?.coordinates[0]
            : "",
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
