import { IDoseRequest } from '../../interface/dose-request';

export class DRequest {
  dose: IDoseRequest;
  constructor(dose?: IDoseRequest) {
    this.dose = dose;
  }
}