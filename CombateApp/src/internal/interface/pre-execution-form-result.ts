export interface IPreExecutionFormResult {
  clientName: { errorMessage: string };
  projectName: { errorMessage: string };
  farm: { errorMessage: string };
  plot: { errorMessage: string };
  streetsAmount: { errorMessage: string };
  weather: { errorMessage: string };
  tractorName: { errorMessage: string };
  rightApplicatorLoad: { errorMessage: string };
  leftApplicatorLoad: { errorMessage: string };
  centerApplicatorLoad: { errorMessage: string };
  valid: boolean;
}
