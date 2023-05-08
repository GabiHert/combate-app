import { IDoseRequest } from '../../interface/dose-request';

export class RequestDto {
  dose: IDoseRequest;
  client: string;
  project: string;
  plot: string;
  tractorName: string;
  constructor(dose?: IDoseRequest) {
    this.dose = dose;
  }
}
