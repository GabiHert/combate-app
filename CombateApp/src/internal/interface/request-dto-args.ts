import { IDoseRequest } from './dose-request';

export interface IRequestDtoArgs {
  dose?: IDoseRequest;
  applicatorsAmount: number;
  event: string;
  client: string;
  project: string;
  plot: string;
  tractorName: string;
  poisonType: string;
  doseWeightG: number;
  deviceName: string;
  maxVelocity: number;
  weather: string;
  streetsAmount: number;
  linesSpacing: number;
}
