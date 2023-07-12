import { IGpsData } from '../../interface/gps-data';
import { ProtocolVersion } from '../enum/protocol-version';
import { RequestType } from '../enum/request-type';
import { Status } from '../enum/status';

export interface IApplicatorsData {
  right:string
  center:string
  left:string
}
export class ResponseDto {
  readonly gps: IGpsData;
  readonly status: Status;
  readonly errorCode: string;
  readonly requestType:RequestType
  readonly protocolVersion: ProtocolVersion
  readonly applicators: IApplicatorsData
  constructor(gps: IGpsData, status: Status, errorCode: string,requestType:RequestType,applicators:IApplicatorsData,protocolVersion:ProtocolVersion) {
    this.gps = gps;
    this.errorCode = errorCode;
    this.status = status;
    this.applicators = applicators;
    this.requestType = requestType;
    this.protocolVersion = protocolVersion;
  }
}
