import { IGpsData } from "../../interface/gps-data";

export class ResponseDto {
  readonly gps: IGpsData;
  readonly status: string;
  readonly errorCode: string;
  readonly leftApplicator?: boolean;
  readonly centerApplicator?: boolean;
  readonly rightApplicator?: boolean;

  constructor(
    gps: IGpsData,
    status: string,
    errorCode: string,
    centerApplicator?: boolean,
    leftApplicator?: boolean,
    rightApplicator?: boolean
  ) {
    this.centerApplicator = centerApplicator;
    this.rightApplicator = rightApplicator;
    this.leftApplicator = leftApplicator;
    this.gps = gps;
    this.errorCode = errorCode;
    this.status = status;
  }
}
