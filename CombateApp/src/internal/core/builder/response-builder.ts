import nmea from '@drivetech/node-nmea';
import { IGpsData } from '../../interface/gps-data';
import { DResponse } from '../dto/response-dto';
import { logger, PLogger } from '../port/logger-port';
export class ResponseBuilder {
  constructor(private readonly _logger: PLogger) {}
  build(protocol: string): DResponse {
    const sentence = protocol.substring(11);
    const commaSeparated = sentence.split(',');
    commaSeparated[commaSeparated.length - 1] =
      commaSeparated[commaSeparated.length - 1][0] +
      '*' +
      commaSeparated[commaSeparated.length - 1].substring(1);
    const gprmc = '$GPRMC' + commaSeparated.join(',');
    const data = nmea.parse(gprmc);

    const gpsData: IGpsData = {
      status: data.mode[0],
      latitude:,
      longitude: 0,
      speedKnots: 0,
      timeUTC: '',
      dateUTC: undefined,
    };
    console.log(data);
    return undefined;
  }
}

export const responseBuilder = new ResponseBuilder(logger);
