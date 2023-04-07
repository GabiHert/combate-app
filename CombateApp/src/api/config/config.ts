import { WeatherEnum } from '../core/enum/weather';
import { IConfigsProps, IPreExecutionConfigProps } from '../interface/config-props';

export const CONSTANTS = {
  APPLICATION: {
    VERSION: '0.0.0',
  },
  MAX_DOSES: 20,
  MIN_DOSES: 1,
  FINISHED_WORK_REASON_NAME: 'Fim Operação',
  UNDER_FOREST_ITEMS: [
    { name: 'Sub-bosque 1', id: '1' },
    { name: 'Sub-bosque 2', id: '2' },
    { name: 'Sub-bosque 3', id: '3' },
  ],

  ERRORS: {
    PRE_EXECUTION_FORM_VALIDATOR: {
      UNDEFINED_CLIENT_NAME: '',
      UNDEFINED_PROJECT_NAME: '',
      UNDEFINED_FARM: '',
      UNDEFINED_PLOT: '',
      UNDEFINED_TRACTOR_NAME: '',
      UNDEFINED_WEATHER: '',
      UNDEFINED_LEFT_APPLICATOR_LOAD: '',
      UNDEFINED_CENTER_APPLICATOR_LOAD: '',
      UNDEFINED_RIGHT_APPLICATOR_LOAD: '',
      UNDEFINED_STREETS_AMOUNT: '',
    },
    CONFIG_FORM: {
      INVALID_LEFT_TANK_MAX_LOAD: '',
      INVALID_CENTER_TANK_MAX_LOAD: '',
      INVALID_RIGHT_TANK_MAX_LOAD: '',
      INVALID_DOSE_WEIGHT_KG: '',
      INVALID_REQUEST_INTERVAL_MS: '',
      INVALID_PRESET: '',
      INVALID_PRESET_NAME: '',
      INVALID_PRESET_VALUE: '',
      INVALID_STOP_REASONS_EVENTS: '',
      INVALID_PLOTS: '',
      INVALID_FILE_PATH: '',
      INVALID_POISON_TYPE: '',
    },
  },
};

export const DEFAULT_CONFIG: IConfigsProps = {
  APPLICATION: {
    LEFT_TANK_MAX_LOAD: 30,
    CENTER_TANK_MAX_LOAD: 30,
    RIGHT_TANK_MAX_LOAD: 30,
    DOSE_WEIGHT_KG: 0.025,
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
  },
  STOP_REASONS_EVENTS: {
    a: 'Insumos',
    b: 'Reabastecimento',
    c: 'Máquina',
    d: 'Sistema Combate',
    e: 'Pessoal',
    f: 'Clima',
    g: 'Troca Talhão',
    h: 'Troca Projeto',
    i: 'Intervalo',
    j: CONSTANTS.FINISHED_WORK_REASON_NAME,
    k: 'Outro',
  },
  EVENTS: {
    a: 'Necessário desvio',
    b: 'Possível seguir',
    c: 'Intransponível, retorno',
  },
  FARMS: {},
  PLOTS: {},
  FILE_PATH: 'CombateApp/Resultados',
  POISON_TYPE: '',
  SPACE_BETWEEN_LINES: 1,
};

export const DEFAULT_PRE_EXECUTION_CONFIG: IPreExecutionConfigProps = {
  farm: '',
  clientName: '',
  plot: '',
  projectName: '',
  tractorName: '',
  weather: WeatherEnum.DRY.name,
  centerApplicatorLoad: 0,
  leftApplicatorLoad: 0,
  streetsAmount: 1,
  rightApplicatorLoad: 0,
};
