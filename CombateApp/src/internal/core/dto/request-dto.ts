import { IDoseRequest } from '../../interface/dose-request';

export class RequestDto {
  dose: IDoseRequest;
  constructor(dose?: IDoseRequest) {
    this.dose = dose;
  }
}
