import { IDoseRequest } from '../../interface/dose-request';
import { IRequestDtoArgs } from '../../interface/request-dto-args';

export class RequestDto {
  event: string;
  dose?: IDoseRequest;
  client: string;
  applicatorsAmount:number
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
  alert?: string;
  constructor(args: IRequestDtoArgs) {
    this.applicatorsAmount = args.applicatorsAmount
    this.alert = args.alert;
    this.event = args.event;
    this.dose = args.dose;
    this.client = args.client;
    this.project = args.project;
    this.plot = args.plot;
    this.tractorName = args.tractorName;
    this.poisonType = args.poisonType;
    this.doseWeightG = args.doseWeightG;
    this.deviceName = args.deviceName;
    this.maxVelocity = args.maxVelocity;
    this.weather = args.weather;
    this.streetsAmount = args.streetsAmount;
    this.linesSpacing = args.linesSpacing;
  }
}
