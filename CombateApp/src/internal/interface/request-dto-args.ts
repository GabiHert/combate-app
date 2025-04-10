import { IDoseRequest } from "./dose-request";

export interface IRequestDtoArgs {
  dose?: IDoseRequest;
  event: string;
  client: string;
  projectName: string;
  plot: string;
  module: string;
  farm: string;
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
  idEquipment?: string;
  matricula?: number;
  systematicMetersBetweenDose: number;
}
