import { poisonItems } from "../core/enum/poison";
import { WeatherEnum } from "../core/enum/weather";
import {
  IConfigsProps,
  IPreExecutionConfigProps,
} from "../interface/config-props";

export const CONSTANTS = {
  CONFIG_LOGIN: {
    USER: "adm1",
    PASSWORD: "123",
  },
  APPLICATION: {
    VERSION: "2.0.0",
    BLUETOOTH_WRITE_RETRIES: 5,
    BLUETOOTH_READ_TIMEOUT_MS: 5000,
    DOSE_TIMEOUT_MS: 7000,
  },
  MAX_DOSES: 10,
  MIN_DOSES: 1,
  FINISHED_WORK_REASON_NAME: "Fim Operação",
  REQUEST_INTERVAL_MS: 3000,
  ACTIVITY_ITEMS: [
    { id: "0", name: "Manutenção" },
    { id: "1", name: "Pré-Plantio" },
    { id: "2", name: "Pós-Plantio" },
    { id: "3", name: "Pré Corte" },
  ],
  APPLICATORS_AMOUNT_ITEMS: [
    { id: "0", name: "1" },
    { id: "1", name: "2" },
    { id: "2", name: "3" },
  ],
  PRESET_NAME_ITEMS: [
    { id: "0", name: "Tamanho 1" },
    { id: "1", name: "Tamanho 2" },
    { id: "2", name: "Tamanho 3" },
    { id: "3", name: "Tamanho 4" },
    { id: "4", name: "Tamanho 5" },
    { id: "5", name: "Tamanho 6" },
  ],
  STREET_AMOUNT_ITEMS: [
    { id: "0", name: "1" },
    { id: "1", name: "2" },
    { id: "2", name: "3" },
    { id: "3", name: "5" },
  ],
  UNDER_FOREST_ITEMS: [
    { name: "Sub-bosque 1", id: "1" },
    { name: "Sub-bosque 2", id: "2" },
    { name: "Sub-bosque 3", id: "3" },
  ],
  REQUEST_V4: { HEADER: "INF" },
  REQUEST_V5: { HEADER: "INF5" },
  ERRORS: {
    MAX_VELOCITY: "Velocidade máxima permitida atingida.",
    PERMISSIONS: {
      WRITE_STORAGE_PERMISSION: "Acesso de escrita em arquivos negado",
      BLUETOOTH_CONNECT: "Acesso de conexão Bluetooth negado",
    },
    PLOT_FORM: {
      INVALID_PLOT: "ERROR",
    },
    FARM_FORM: {
      INVALID_FARM: "ERROR",
    },
    EVENT_FORM: {
      INVALID_EVENT: "ERROR",
    },
    STOP_REASON_FORM: {
      INVALID_STOP_REASON: "ERROR",
    },
    REQUEST_V4: {
      DOSE_AMOUNT_BELLOW_ZERO:
        "Quantidade de doses deve ser maior do que zero.",
      DOSE_NOT_DEFINED: "Informações de dose devem ser informadas.",
      NOT_DEFINED: "Dados invalidos.",
      DOSE_AMOUNT_NOT_DEFINED: "Quantidade de doses deve ser informada.",
      DOSE_AMOUNT_GREATER_THAN_10:
        "Número de doses deve ser menor ou igual a 10.",
      LINE_SPACING_NOT_DEFINED: "Espaçamento de linhas deve ser informado.",
      LINE_SPACING_GREATER_THAN_0:
        "Espaçamento de linhas deve ser maior do que 10.",
    },

    REQUEST_V5: {
      APPLICATORS_AMOUNT_AND_SELECTED_DOES_NOT_MATCH:
        "Quantidade de aplicadores selecionados incoerente.",
      APPLICATOR_NOT_SPECIFIER:
        "Aplicadores devem ser especificados para realizar a dose.",
      DOSE_AMOUNT_BELLOW_ZERO:
        "Quantidade de doses deve ser maior do que zero.",
      DOSE_NOT_DEFINED: "Informações de dose devem ser informadas.",
      NOT_DEFINED: "Dados invalidos.",
      DOSE_AMOUNT_NOT_DEFINED: "Quantidade de doses deve ser informada.",
      DOSE_AMOUNT_GREATER_THAN_10:
        "Número de doses deve ser menor ou igual a 10.",
      LINE_SPACING_NOT_DEFINED: "Espaçamento de linhas deve ser informado.",
      LINE_SPACING_GREATER_THAN_0:
        "Espaçamento de linhas deve ser maior do que 10.",
    },
    BLUETOOTH_APP: {
      DEVICE_NOT_AVAILABLE: "Dispositivo não disponível",
      EMPTY_DEVICE_LIST: "Lista de dispositivos vazia",
    },
    A_BLUETOOTH: {
      READ_TIMEOUT: "Tempo para leitura de bluetooth exedido",
      PERMISSIONS_DENIED: "Permissão para acesso bluetooth negada",
      NOT_ENABLED: "Bluetooth não ativado",
      NOT_AVAILABLE: "Bluetooth não disponível",
      DEVICE_NOT_SELECTED: "Dispositivo não selecionado",
      WRITE_5_ATTEMPTS_FAILED: "5 tentativas falhas de escrita",
      SELECTED_DEVICE_NOT_CONNECTED:
        "Disposotivo selecionado não conectado. Tentativa automática de conexão falhou",
    },
    PRE_EXECUTION_FORM_VALIDATOR: {
      INVALID_DEVICE_NAME: "Nome do dispositivo deve ser informado.",
      INVALID_CLIENT_NAME: "Nome do cliente deve ser informado.",
      INVALID_PROJECT_NAME: "Nome do projeto deve ser informado.",
      INVALID_FARM: "Fazenda deve ser informada.",
      INVALID_PLOT: "Talhão deve ser informado.",
      INVALID_TRACTOR_NAME: "Nome do trator deve ser informado.",
      INVALID_WEATHER: "Clima deve ser informado.",
      INVALID_LEFT_APPLICATOR_LOAD: "ERRO",
      INVALID_CENTER_APPLICATOR_LOAD: "ERRO",
      INVALID_RIGHT_APPLICATOR_LOAD: "ERRO",
      INVALID_STREETS_AMOUNT: "ERRO",
      INVALID_ACTIVITY: "ERRO",
      INVALID_APPLICATORS_AMOUNT: "ERRO",
    },
    CONFIG_FORM: {
      INVALID_LEFT_TANK_MAX_LOAD: "ERRO",
      INVALID_CENTER_TANK_MAX_LOAD: "ERRO",
      INVALID_RIGHT_TANK_MAX_LOAD: "ERRO",
      INVALID_DOSE_WEIGHT_G: "ERRO",
      INVALID_REQUEST_INTERVAL_MS: "ERRO",
      INVALID_PRESET: "ERRO",
      INVALID_PRESET_NAME: "ERRO",
      INVALID_PRESET_VALUE: "ERRO",
      INVALID_STOP_REASONS_EVENTS: "ERRO",
      INVALID_PLOTS: "ERRO",
      INVALID_FILE_PATH: "ERRO",
      INVALID_POISON_TYPE: "ERRO",
      INVALID_FARMS: "ERRO",
      INVALID_MAX_VELOCITY: "ERRO",
      INVALID_METERS_BETWEEN_DOSE: "ERRO",
    },
    FINISH_EXECUTION_FORM: { INVALID_REASON: "ERRO" },
    UNDER_FOREST_FORM: { INVALID_UNDER_FOREST: "ERRO" },
  },
};

export const DEFAULT_CONFIG: IConfigsProps = {
  APPLICATION: {
    MAX_VELOCITY: 20,
    LEFT_TANK_MAX_LOAD: 30,
    CENTER_TANK_MAX_LOAD: 30,
    RIGHT_TANK_MAX_LOAD: 30,
    DOSE_WEIGHT_G: 5,
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
    METERS_BETWEEN_DOSE: 2,
  },
  STOP_REASONS_EVENTS: {
    a: "Insumos",
    b: "Reabastecimento",
    c: "Máquina",
    d: "Sistema Combate",
    e: "Pessoal",
    f: "Clima",
    g: "Troca Talhão",
    h: "Troca Projeto",
    i: "Intervalo",
    j: CONSTANTS.FINISHED_WORK_REASON_NAME,
    k: "Outro",
  },
  EVENTS: {
    a: "Necessario desvio",
    b: "Possivel seguir",
    c: "Retorno",
  },
  FARMS: {},
  PLOTS: {},
  FILE_PATH: "CombateApp/Resultados",
  POISON_TYPE: poisonItems[0].name,
  LINE_SPACING: 1,
};

export const DEFAULT_PRE_EXECUTION_CONFIG: IPreExecutionConfigProps = {
  applicatorsAmount: 1,
  activity: "Teste",
  farm: "teste",
  clientName: "teste",
  plot: "teste",
  projectName: "teste",
  tractorName: "teste",
  weather: WeatherEnum.SECO.name,
  centerApplicatorLoad: 23,
  leftApplicatorLoad: 23,
  streetsAmount: 1,
  rightApplicatorLoad: 23,
  deviceName: "",
};
