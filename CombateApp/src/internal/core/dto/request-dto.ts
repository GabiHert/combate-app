import { IDoseRequest } from '../../interface/dose-request';
import { IRequestDtoArgs } from '../../interface/request-dto-args';

export class RequestDto {
  event: string;
  applicatorsAmount: number;
  dose: IDoseRequest;
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
  linesAmount: number;
  constructor(args: IRequestDtoArgs) {
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
    this.linesAmount = args.linesSpacing;
  }
}
