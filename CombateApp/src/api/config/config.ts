import { IConfigsProps } from '../interface/config-props';

export const DEFAULT_CONFIG: IConfigsProps = {
  APPLICATION: {
    LEFT_TANK_MAX_LOAD: 30,
    CENTER_TANK_MAX_LOAD: 30,
    RIGHT_TANK_MAX_LOAD: 30,
    MAX_DOSES: 20,
    MIN_DOSES: 1,
    DOSE_WEIGHT_KG: 0.025,
    REQUEST_INTERVAL_MS: 2000,
  },
  PRESETS: {
    P1: { NAME: 'Preset 1', DOSE_AMOUNT: 2 },
    P2: { NAME: 'Preset 2', DOSE_AMOUNT: 3 },
    P3: { NAME: 'Preset 3', DOSE_AMOUNT: 4 },
    P4: { NAME: 'Preset 4', DOSE_AMOUNT: 5 },
    P5: { NAME: 'Preset 5', DOSE_AMOUNT: 6 },
    P6: { NAME: 'Preset 6', DOSE_AMOUNT: 7 },
  },
  SYSTEMATIC_DOSE: {
    METERS_BETWEEN_DOSE: 1,
    DOSE_AMOUNT: 1,
  },
};

export const CONSTANTS = {
  APPLICATION: {
    VERSION: '0.0.0',
  },
};
