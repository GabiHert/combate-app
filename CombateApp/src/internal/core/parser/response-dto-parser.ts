import gpsSentenceParser from '@drivetech/node-nmea';
import { IGpsData } from '../../interface/gps-data';
import { IApplicatorsData, ResponseDto } from '../dto/response-dto';
import { ProtocolVersionEnum } from '../enum/protocol-version';
import { RequestType } from '../enum/request-type';
import { Status } from '../enum/status';
import { PLogger } from '../port/logger-port';
import { ProtocolRules } from '../rules/protocol-rules';
export class ResponseDtoParser {
  constructor(private readonly _logger: PLogger, private _protocolRules: ProtocolRules) {}

  parseV4(protocol: string): ResponseDto {
    try {
      this._logger.info({ event: 'ResponseBuilder.parseV4', details: 'Process started', protocol });

      this._protocolRules.V4(protocol);

      let sentence = protocol.substring(11);
      sentence = sentence.substring(0, sentence.length - 1);
      const status = new Status(protocol[3]);
      const errorCode = protocol.substring(4, 7);
      const commaSeparated = sentence.split(',');

      //Adds "*" to checkSum. Ex: A30 --> A*30
      const gprmcCs =
        commaSeparated[commaSeparated.length - 1][0] +
        '*' +
        commaSeparated[commaSeparated.length - 1][1] +
        commaSeparated[commaSeparated.length - 1][2];

      commaSeparated[commaSeparated.length - 1] = gprmcCs;

      const gprmc = '$GPRMC' + commaSeparated.join(',');
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
      } else gpsData = { status: 'V' };

      const responseDto = new ResponseDto(gpsData, status, errorCode,undefined,undefined,ProtocolVersionEnum.V4);

      this._logger.info({
        event: 'ResponseBuilder.parseV4',
        details: 'Process finished',
        responseDto,
      });

      return responseDto;
    } catch (err) {
      this._logger.error({
        event: 'ResponseBuilder.parseV4',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }

  parseV5(protocol: string): ResponseDto {
    try {
      this._logger.info({ event: 'ResponseBuilder.parseV5', details: 'Process started', protocol });

      this._protocolRules.V5(protocol);

      let sentence = protocol.substring(11);
      sentence = sentence.substring(0, sentence.length - 1);
      const status = new Status(protocol[3]);
      const errorCode = protocol.substring(4, 7);
      const commaSeparated = sentence.split(',');

      const gprmc = '$GPRMC' + commaSeparated.join(',');
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
      } else gpsData = { status: 'V' };

      const requestType = new RequestType(protocol[2]);
      const applicatorsData:IApplicatorsData = {
         center:protocol[8],
         left:protocol[7],
         right:protocol[9]
        }
      const responseDto = new ResponseDto(gpsData, status, errorCode,requestType,applicatorsData,ProtocolVersionEnum.V5);

      this._logger.info({
        event: 'ResponseBuilder.parseV5',
        details: 'Process finished',
        responseDto,
      });

      return responseDto;
    } catch (err) {
      this._logger.error({
        event: 'ResponseBuilder.parseV5',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
}
