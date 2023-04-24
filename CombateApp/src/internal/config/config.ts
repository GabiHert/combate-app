import { WeatherEnum } from '../core/enum/weather';
import { IConfigsProps, IPreExecutionConfigProps } from '../interface/config-props';

export const CONSTANTS = {
  APPLICATION: {
    VERSION: '0.0.0',
  },
  MAX_DOSES: 20,
  MIN_DOSES: 1,
  FINISHED_WORK_REASON_NAME: 'Fim Operação',
  REQUEST_INTERVAL_MS: 2000,
  UNDER_FOREST_ITEMS: [
    { name: 'Sub-bosque 1', id: '1' },
    { name: 'Sub-bosque 2', id: '2' },
    { name: 'Sub-bosque 3', id: '3' },
  ],

  ERRORS: {
    A_BLUETOOTH: { NOT_ENABLED: '', NOT_AVAILABLE: '', DEVICE_NOT_SELECTED: '' },
    PRE_EXECUTION_FORM_VALIDATOR: {
      INVALID_CLIENT_NAME: '',
      INVALID_PROJECT_NAME: '',
      INVALID_FARM: '',
      INVALID_PLOT: '',
      INVALID_TRACTOR_NAME: '',
      INVALID_WEATHER: '',
      INVALID_LEFT_APPLICATOR_LOAD: '',
      INVALID_CENTER_APPLICATOR_LOAD: '',
      INVALID_RIGHT_APPLICATOR_LOAD: '',
      INVALID_STREETS_AMOUNT: '',
    },
    CONFIG_FORM: {
      INVALID_LEFT_TANK_MAX_LOAD: 'ERRO',
      INVALID_CENTER_TANK_MAX_LOAD: 'ERRO',
      INVALID_RIGHT_TANK_MAX_LOAD: 'ERRO',
      INVALID_DOSE_WEIGHT_KG: 'ERRO',
      INVALID_REQUEST_INTERVAL_MS: 'ERRO',
      INVALID_PRESET: 'ERRO',
      INVALID_PRESET_NAME: 'ERRO',
      INVALID_PRESET_VALUE: 'ERRO',
      INVALID_STOP_REASONS_EVENTS: 'ERRO',
      INVALID_PLOTS: 'ERRO',
      INVALID_FILE_PATH: 'ERRO',
      INVALID_POISON_TYPE: 'ERRO',
    },
    FINISH_EXECUTION_FORM: { INVALID_REASON: '' },
    UNDER_FOREST_FORM: { INVALID_UNDER_FOREST: '' },
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
