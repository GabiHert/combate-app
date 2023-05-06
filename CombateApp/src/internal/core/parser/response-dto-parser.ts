import gpsSentenceParser from '@drivetech/node-nmea';
import { IGpsData } from '../../interface/gps-data';
import { DResponse } from '../dto/response-dto';
import { Status, StatusEnum } from '../enum/status';
import { InvalidGpsDataErrorType } from '../error/error-type';
import { logger, PLogger } from '../port/logger-port';
import { protocolRules, ProtocolRules } from '../rules/protocol-rules';
export class ResponseDtoParser {
  constructor(private readonly _logger: PLogger, private _protocolRules: ProtocolRules) {}

  parseV4(protocol: string): DResponse {
    try {
      this._logger.info({ event: 'ResponseBuilder.buildV4', details: 'Process started', protocol });

      this._protocolRules.V4(protocol);

      let sentence = protocol.substring(11);
      sentence = sentence.substring(0, sentence.length - 2);
      const status = new Status(protocol[3]);
      const errorCode = protocol.substring(4, 7);
      const commaSeparated = sentence.split(',');

      //Adds "*" to checkSum. Ex: A30 --> A*30
      commaSeparated[commaSeparated.length - 1] =
        commaSeparated[commaSeparated.length - 1][0] +
        '*' +
        commaSeparated[commaSeparated.length - 1].substring(1);

      const timeUTC = commaSeparated[1];
      const gprmc = '$GPRMC' + commaSeparated.join(',');
      const data = gpsSentenceParser.parse(gprmc);

      let gpsData: IGpsData;
      if (data.valid) {
        const date = <Date>data.datetime;
        gpsData = {
          status: data.mode[0],
          latitude: data.loc.geojson.coordinates[1],
          longitude: data.loc.geojson.coordinates[0],
          speedKnots: data.speed.knots,
          timeUTC,
          dateUTC: date,
        };
      } else gpsData = { status: 'V' };

      const responseDto = new DResponse(gpsData, status, errorCode);

      this._logger.info({
        event: 'ResponseBuilder.buildV4',
        details: 'Process finished',
        responseDto,
      });

      return responseDto;
    } catch (err) {
      this._logger.error({
        event: 'ResponseBuilder.buildV4',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
}

export const responseDtoParser = new ResponseDtoParser(logger, protocolRules);
