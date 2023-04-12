export interface IConfigFormResult {
  valid: boolean;
  rightTankMaxLoad: { errorMessage: string };
  centerTankMaxLoad: { errorMessage: string };
  leftTankMaxLoad: { errorMessage: string };
  doseWeightKg: { errorMessage: string };
  preset1Name: { errorMessage: string };
  preset2Name: { errorMessage: string };
  preset3Name: { errorMessage: string };
  preset4Name: { errorMessage: string };
  preset1Dose: { errorMessage: string };
  preset2Dose: { errorMessage: string };
  preset3Dose: { errorMessage: string };
  preset4Dose: { errorMessage: string };
}
