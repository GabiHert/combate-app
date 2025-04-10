import { IDoseRequest } from "../../interface/dose-request";
import { IRequestDtoArgs } from "../../interface/request-dto-args";

export class RequestDto {
  event: string;
  dose?: IDoseRequest;
  client: string;
  projectName: string;
  activity: string;
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
  newId?: number;
  farm?: string;
  module?: string;
  idEquipment?: string;
  systematicMetersBetweenDose?: number;
  matricula?: number;
  constructor(args: IRequestDtoArgs) {
    this.activity = args.activity;
    this.alert = args.alert;
    this.event = args.event;
    this.dose = args.dose;
    this.client = args.client;
    this.projectName = args.projectName;
    this.plot = args.plot;
    this.module = args.module;
    this.farm = args.farm;
    this.tractorName = args.tractorName;
    this.poisonType = args.poisonType;
    this.doseWeightG = args.doseWeightG;
    this.deviceName = args.deviceName;
    this.maxVelocity = args.maxVelocity;
    this.weather = args.weather;
    this.streetsAmount = args.streetsAmount;
    this.linesSpacing = args.linesSpacing;
    this.newId = args.newId;
    this.idEquipment = args.idEquipment;
    this.matricula = args.matricula;
    this.systematicMetersBetweenDose = args.systematicMetersBetweenDose;
  }
}
