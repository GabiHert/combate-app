import { IGpsData } from '../../interface/gps-data';
import { Status } from '../enum/status';

export class ResponseDto {
  readonly gps: IGpsData;
  readonly version:string;
  readonly status: Status;
  readonly errorCode: string;
  //todo: add aplicators data
  constructor(gps: IGpsData, status: Status, errorCode: string,version:string) {
    this.gps = gps;
    this.version=version;
    this.errorCode = errorCode;
    this.status = status;
  }
}
