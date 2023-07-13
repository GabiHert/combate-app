import { RequestType } from '../core/enum/request-type';
import { IDoseRequest } from './dose-request';

export interface IRequestDtoArgs {
  event: string;
  client: string;
  project: string;
  plot: string;
  tractorName: string;
  applicatorsAmount:number;
  poisonType: string;
  doseWeightG: number;
  deviceName: string;
  maxVelocity: number;
  weather: string;
  linesSpacing: number;
  streetsAmount: number;
  name?:string;
  dose?: IDoseRequest;
  alert?: string;
  requestType?:RequestType;
}
