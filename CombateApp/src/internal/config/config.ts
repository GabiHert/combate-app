import { poisonItems } from '../core/enum/poison';
import { WeatherEnum } from '../core/enum/weather';
import { IConfigsProps, IPreExecutionConfigProps } from '../interface/config-props';

export const CONSTANTS = {
  APPLICATION: {
    VERSION: '0.0.0',
    BLUETOOTH_WRITE_RETRIES: 5,
  },
  MAX_DOSES: 20,
  MIN_DOSES: 1,
  FINISHED_WORK_REASON_NAME: 'Fim Operação',
  REQUEST_INTERVAL_MS: 2000,
  ACTIVITY_ITEMS: [
    { id: '0', name: 'Manutenção' },
    { id: '1', name: 'Pré-Plantio' },
    { id: '2', name: 'Pós-Plantio' },
    { id: '3', name: 'Pré Corte' },
  ],
  APPLICATORS_AMOUNT_ITEMS: [
    { id: '0', name: '1' },
    { id: '1', name: '2' },
    { id: '2', name: '3' },
  ],
  PRESET_NAME_ITEMS: [
    { id: '0', name: 'Pequeno' },
    { id: '1', name: 'Médio' },
    { id: '2', name: 'Grande' },
  ],
  STREET_AMOUNT_ITEMS: [
    { id: '0', name: '1' },
    { id: '1', name: '2' },
    { id: '2', name: '3' },
    { id: '3', name: '5' },
  ],
  UNDER_FOREST_ITEMS: [
    { name: 'Sub-bosque 1', id: '1' },
    { name: 'Sub-bosque 2', id: '2' },
    { name: 'Sub-bosque 3', id: '3' },
  ],
  REQUEST: { HEADER: 'INF' },
  ERRORS: {
    PLOT_FORM: {
      INVALID_PLOT: 'ERROR',
    },
    FARM_FORM: {
      INVALID_FARM: 'ERROR',
    },
    EVENT_FORM: {
      INVALID_EVENT: 'ERROR',
    },
    STOP_REASON_FORM: {
      INVALID_STOP_REASON: 'ERROR',
    },
    REQUEST_V4: {
      DOSE_AMOUNT_BELLOW_ZERO: '',
      DOSE_NOT_DEFINED: 'ERR',
      NOT_DEFINED: '',
      DOSE_AMOUNT_NOT_DEFINED: '',
      DOSE_AMOUNT_GREATER_THAN_10: '',
    },
    BLUETOOTH_APP: {
      DEVICE_NOT_AVAILABLE: 'Dispositivo não disponível',
      EMPTY_DEVICE_LIST: 'Lista de dispositivos vazia',
    },
    A_BLUETOOTH: {
      READ_TIMEOUT: 'Tempo para leitura de bluetooth exedido',
      PERMISSIONS_DENIED: 'Permissão para acesso bluetooth negada',
      NOT_ENABLED: 'Bluetooth não ativado',
      NOT_AVAILABLE: 'Bluetooth não disponível',
      DEVICE_NOT_SELECTED: 'Dispositivo não selecionado',
      WRITE_5_ATTEMPTS_FAILED: '',
      SELECTED_DEVICE_NOT_CONNECTED:
        'Disposotivo selecionado não conectado. Tentativa automática de conexão falhou',
    },
    PRE_EXECUTION_FORM_VALIDATOR: {
      INVALID_DEVICE_NAME: 'ERRO',
      INVALID_CLIENT_NAME: 'ERRO',
      INVALID_PROJECT_NAME: 'ERRO',
      INVALID_FARM: 'ERRO',
      INVALID_PLOT: 'ERRO',
      INVALID_TRACTOR_NAME: 'ERRO',
      INVALID_WEATHER: 'ERRO',
      INVALID_LEFT_APPLICATOR_LOAD: 'ERRO',
      INVALID_CENTER_APPLICATOR_LOAD: 'ERRO',
      INVALID_RIGHT_APPLICATOR_LOAD: 'ERRO',
      INVALID_STREETS_AMOUNT: 'ERRO',
      INVALID_ACTIVITY: 'ERRO',
      INVALID_APPLICATORS_AMOUNT: 'ERRO',
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
      INVALID_FARMS: 'ERRO',
      INVALID_MAX_VELOCITY: 'ERRO',
    },
    FINISH_EXECUTION_FORM: { INVALID_REASON: '' },
    UNDER_FOREST_FORM: { INVALID_UNDER_FOREST: '' },
  },
};

export const DEFAULT_CONFIG: IConfigsProps = {
  APPLICATION: {
    MAX_VELOCITY: 1,
    LEFT_TANK_MAX_LOAD: 30,
    CENTER_TANK_MAX_LOAD: 30,
    RIGHT_TANK_MAX_LOAD: 30,
    DOSE_WEIGHT_KG: 0.025,
  },
  PRESETS: {
    P1: { NAME: CONSTANTS.PRESET_NAME_ITEMS[0].name, DOSE_AMOUNT: 1 },
    P2: { NAME: CONSTANTS.PRESET_NAME_ITEMS[0].name, DOSE_AMOUNT: 1 },
    P3: { NAME: CONSTANTS.PRESET_NAME_ITEMS[0].name, DOSE_AMOUNT: 1 },
    P4: { NAME: CONSTANTS.PRESET_NAME_ITEMS[0].name, DOSE_AMOUNT: 1 },
    P5: { NAME: CONSTANTS.PRESET_NAME_ITEMS[0].name, DOSE_AMOUNT: 1 },
    P6: { NAME: CONSTANTS.PRESET_NAME_ITEMS[0].name, DOSE_AMOUNT: 1 },
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
  POISON_TYPE: poisonItems[0].name,
  LINES_SPACING: 1,
};

export const DEFAULT_PRE_EXECUTION_CONFIG: IPreExecutionConfigProps = {
  applicatorsAmount: 1,
  activity: 'Teste',
  farm: 'teste',
  clientName: 'teste',
  plot: 'teste',
  projectName: 'teste',
  tractorName: 'teste',
  weather: WeatherEnum.DRY.name,
  centerApplicatorLoad: 23,
  leftApplicatorLoad: 23,
  streetsAmount: 1,
  rightApplicatorLoad: 23,
  deviceName: 'CB5_TESTE',
};
