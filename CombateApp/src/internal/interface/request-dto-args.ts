import { IDoseRequest } from './dose-request';

export interface IRequestDtoArgs {
  dose?: IDoseRequest;

  client: string;
  project: string;
  plot: string;
  tractorName: string;
  poisonType: string;
  doseWeightKg: number;
  deviceName: string;
  maxVelocity: number;
  weather: string;
  streetsAmount: number;
  numberOfLines: number;
}
