export type TMapString = {
  [key: string]: string;
};
export interface IConfigsProps {
  APPLICATION: {
    RIGHT_TANK_MAX_LOAD: number;
    LEFT_TANK_MAX_LOAD: number;
    CENTER_TANK_MAX_LOAD: number;
    MAX_DOSES: number;
    MIN_DOSES: number;
    DOSE_WEIGHT_KG: number;
    REQUEST_INTERVAL_MS: number;
  };

  PRESETS: {
    P1: { NAME: string; DOSE_AMOUNT: number };
    P2: { NAME: string; DOSE_AMOUNT: number };
    P3: { NAME: string; DOSE_AMOUNT: number };
    P4: { NAME: string; DOSE_AMOUNT: number };
    P5: { NAME: string; DOSE_AMOUNT: number };
    P6: { NAME: string; DOSE_AMOUNT: number };
  };
  SYSTEMATIC_DOSE: {
    METERS_BETWEEN_DOSE: number;
  };
  STOP_REASONS_EVENTS: TMapString;
  EVENTS: TMapString;
  FARMS: TMapString;
  PLOTS: TMapString;
  POISON_TYPE: string;
  SPACE_BETWEEN_LINES: number;
  FILE_PATH: string;
}

export interface IPreExecutionConfigProps {
  clientName: string;
  projectName: string;
  farm: string;
  plot: string;
  tractorName: string;
  weather: string;
  leftApplicatorLoad: number;
  centerApplicatorLoad: number;
  rightApplicatorLoad: number;
  streetsAmount: number;
}
