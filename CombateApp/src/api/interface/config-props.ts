export interface IConfigsProps {
  APPLICATION: {
    TOTAL_LOAD_KG: number;
    VERSION: string;
    MAX_DOSES: number;
    MIN_DOSES: number;
    DOSE_WEIGHT_KG: number;
    REQUEST_INTERVAL_MS: number;
  };

  PRESETS: {
    P1: number;
    P2: number;
    P3: number;
    P4: number;
  };
}
