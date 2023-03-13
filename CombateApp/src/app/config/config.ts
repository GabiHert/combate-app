export function Config() {
  return {
    APPLICATION: {
      TOTAL_LOAD_KG: 30,
      VERSION: '0.0.0',
      MAX_DOSES: 20,
      MIN_DOSES: 1,
      DOSE_WEIGHT_KG: 0.01, //todo:deve ser flexivel
      REQUEST_INTERVAL_MS: 2000,
    },
    LABELS: {
      PT_BT: {
        HOME_SCREEN: { START_BUTTON: 'Iniciar' },
      },
    },
    PRESETS: {
      P1: 20,
      P2: 2,
      P3: 3,
      P4: 4,
    },
  };
}
