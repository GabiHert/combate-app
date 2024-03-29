import { IDoseRequest } from './dose-request';

export interface IRequestDtoArgs {
  dose?: IDoseRequest;
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
  streetsAmount: number;
  alert?: string;
  linesSpacing: number;
}
