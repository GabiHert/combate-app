import { IGpsData } from '../../interface/gps-data';
import { Status } from '../enum/status';

export class ResponseDto {
  readonly gps: IGpsData;
  readonly status: Status;
  constructor(gps: IGpsData, status: Status, errorCode: string) {
    this.gps = gps;
    this.status = status;
  }
}
