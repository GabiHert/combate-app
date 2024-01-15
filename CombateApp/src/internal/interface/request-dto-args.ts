import { IDoseRequest } from "./dose-request";

export interface IRequestDtoArgs {
  dose?: IDoseRequest;
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
  activity: string;
  alert?: string;
  linesSpacing: number;
  newId?: number;
  systematicMetersBetweenDose: number;
}
