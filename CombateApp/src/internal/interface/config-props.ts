import { TMapString } from '../types/map-string';

export interface IConfigsProps {
  APPLICATION: {
    RIGHT_TANK_MAX_LOAD: number;
    LEFT_TANK_MAX_LOAD: number;
    CENTER_TANK_MAX_LOAD: number;
    MAX_VELOCITY: number;
    DOSE_WEIGHT_G: number;
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
  LINE_SPACING: number;
  FILE_PATH: string;
}

export interface IPreExecutionConfigProps {
  applicatorsAmount: number;
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
  deviceName: string;
  activity: string;
}
