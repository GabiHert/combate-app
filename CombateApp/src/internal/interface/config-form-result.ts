export interface IConfigFormResult {
  valid: boolean;
  rightTankMaxLoad: { errorMessage: string };
  centerTankMaxLoad: { errorMessage: string };
  leftTankMaxLoad: { errorMessage: string };
  maxVelocity: { errorMessage: string };
  doseWeightG: { errorMessage: string };
  preset1Name: { errorMessage: string };
  preset2Name: { errorMessage: string };
  preset3Name: { errorMessage: string };
  preset4Name: { errorMessage: string };
  preset5Name: { errorMessage: string };
  preset6Name: { errorMessage: string };
  preset1Dose: { errorMessage: string };
  preset2Dose: { errorMessage: string };
  preset3Dose: { errorMessage: string };
  preset4Dose: { errorMessage: string };
  preset5Dose: { errorMessage: string };
  preset6Dose: { errorMessage: string };
  metersBetweenDose: { errorMessage: string };
  stopReasonEvent: { errorMessage: string };
  events: { errorMessage: string };
  farms: { errorMessage: string };
  plots: { errorMessage: string };
  poisonType: { errorMessage: string };
  lineSpacing: { errorMessage: string };
  filePath: { errorMessage: string };
}
