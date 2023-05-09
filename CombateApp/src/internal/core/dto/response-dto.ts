import { IGpsData } from '../../interface/gps-data';
import { Status } from '../enum/status';

export class ResponseDto {
  readonly gps: IGpsData;
  readonly status: Status;
  readonly errorCode: string;
  constructor(gps: IGpsData, status: Status, errorCode: string) {
    this.gps = gps;
    this.errorCode = errorCode;
    this.status = status;
  }
}
