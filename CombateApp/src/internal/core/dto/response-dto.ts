import { IGpsData } from "../../interface/gps-data";
import { Status } from "../enum/status";

export class ResponseDto {
  readonly gps: IGpsData;
  readonly version: string;
  readonly status: Status;
  readonly errorCode: string;
  readonly leftApplicator?: boolean;
  readonly centerApplicator?: boolean;
  readonly rightApplicator?: boolean;

  constructor(
    gps: IGpsData,
    status: Status,
    errorCode: string,
    version: string,
    centerApplicator?: boolean,
    leftApplicator?: boolean,
    rightApplicator?: boolean
  ) {
    this.centerApplicator = centerApplicator;
    this.rightApplicator = rightApplicator;
    this.leftApplicator = leftApplicator;
    this.gps = gps;
    this.version = version;
    this.errorCode = errorCode;
    this.status = status;
  }
}
