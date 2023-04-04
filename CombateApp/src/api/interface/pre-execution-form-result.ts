export interface IPreExecutionFormResult {
  clientName: { errorMessage: string };
  projectName: { errorMessage: string };
  farm: { errorMessage: string };
  plotNumber: { errorMessage: undefined };
  spaceBetweenLines: { errorMessage: string };
  streetsAmount: { errorMessage: string };
  weather: { errorMessage: string };
  tractorName: { errorMessage: string };
  rightLoad: { errorMessage: string };
  leftLoad: { errorMessage: string };
  centerLoad: { errorMessage: string };
  valid: boolean;
}
