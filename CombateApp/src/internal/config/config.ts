import { EventEnum } from "../core/enum/event";
import { poisonItems } from "../core/enum/poison";
import { WeatherEnum } from "../core/enum/weather";
import {
  IConfigsProps,
  IPreExecutionConfigProps,
} from "../interface/config-props";
import { IItem } from "../interface/item";

export const CONSTANTS = {
  PRE_EXECUTION_SCREEN: {
    APPLICATOR_LOAD_ITEMS(maxValue: number): Array<IItem> {
      const items = [];
      for (let i = 1; i <= maxValue; i++) {
        items.push({ id: i.toString(), name: i.toString() + " Kg" });
        if (i < maxValue)
          items.push({ id: i.toString() + ".5", name: i.toString() + ".5 Kg" });
      }
      return items;
    },
  },
  CONFIG_SCREEN: {
    LINE_SPACING_ITEMS: [
      { id: "1", name: "1 metro" },
      { id: "2", name: "2 metros" },
      { id: "3", name: "3 metros" },
      { id: "4", name: "4 metros" },
      { id: "5", name: "5 metros" },
      { id: "6", name: "6 metros" },
      { id: "7", name: "7 metros" },
      { id: "8", name: "8 metros" },
      { id: "9", name: "9 metros" },
      { id: "10", name: "10 metros" },
      { id: "11", name: "11 metros" },
      { id: "12", name: "12 metros" },
      { id: "13", name: "13 metros" },
      { id: "14", name: "14 metros" },
      { id: "15", name: "15 metros" },
      { id: "16", name: "16 metros" },
      { id: "17", name: "17 metros" },
      { id: "18", name: "18 metros" },
      { id: "19", name: "19 metros" },
      { id: "20", name: "20 metros" },
    ],

    MAX_VELOCITY_ITEMS: [
      { id: "1", name: "1 Km/h" },
      { id: "2", name: "2 Km/h" },
      { id: "3", name: "3 Km/h" },
      { id: "4", name: "4 Km/h" },
      { id: "5", name: "5 Km/h" },
      { id: "6", name: "6 Km/h" },
      { id: "7", name: "7 Km/h" },
      { id: "8", name: "8 Km/h" },
      { id: "9", name: "9 Km/h" },
      { id: "10", name: "10 Km/h" },
      { id: "11", name: "11 Km/h" },
      { id: "12", name: "12 Km/h" },
      { id: "13", name: "13 Km/h" },
      { id: "14", name: "14 Km/h" },
      { id: "15", name: "15 Km/h" },
      { id: "16", name: "16 Km/h" },
      { id: "17", name: "17 Km/h" },
      { id: "18", name: "18 Km/h" },
      { id: "19", name: "19 Km/h" },
      { id: "20", name: "20 Km/h" },
    ],
    METERS_BETWEEN_DOSE_ITEMS: [
      { id: "2", name: "2 metros" },
      { id: "3", name: "3 metros" },
      { id: "4", name: "4 metros" },
      { id: "5", name: "5 metros" },
      { id: "6", name: "6 metros" },
      { id: "7", name: "7 metros" },
      { id: "8", name: "8 metros" },
      { id: "9", name: "9 metros" },
      { id: "10", name: "10 metros" },
    ],
    DOSE_AMOUNT_ITEMS: [
      { id: "1", name: "1 dose" },
      { id: "2", name: "2 doses" },
      { id: "3", name: "3 doses" },
      { id: "4", name: "4 doses" },
      { id: "5", name: "5 doses" },
      { id: "6", name: "6 doses" },
      { id: "7", name: "7 doses" },
      { id: "8", name: "8 doses" },
      { id: "9", name: "9 doses" },
      { id: "10", name: "10 doses" },
    ],
    DOSE_WEIGHT: [
      { id: "5", name: "5 gramas" },
      { id: "6", name: "6 gramas" },
      { id: "7", name: "7 gramas" },
      { id: "8", name: "8 gramas" },
      { id: "9", name: "9 gramas" },
      { id: "10", name: "10 gramas" },
      { id: "11", name: "11 gramas" },
      { id: "12", name: "12 gramas" },
      { id: "13", name: "13 gramas" },
      { id: "14", name: "14 gramas" },
      { id: "15", name: "15 gramas" },
      { id: "16", name: "16 gramas" },
      { id: "17", name: "17 gramas" },
      { id: "18", name: "18 gramas" },
      { id: "19", name: "19 gramas" },
      { id: "20", name: "20 gramas" },
      { id: "21", name: "21 gramas" },
      { id: "22", name: "22 gramas" },
      { id: "23", name: "23 gramas" },
      { id: "24", name: "24 gramas" },
      { id: "25", name: "25 gramas" },
      { id: "26", name: "26 gramas" },
      { id: "27", name: "27 gramas" },
      { id: "28", name: "28 gramas" },
      { id: "29", name: "29 gramas" },
      { id: "30", name: "30 gramas" },
    ],
  },
  USERS: [
    {
      LEVEL: 2,
      USER: "adm2",
      PASSWORD: " ",
    },
    {
      LEVEL: 1,
      USER: "adm1",
      PASSWORD: " ",
    },
  ],
  APPLICATION: {
    VERSION: "2.1.2",
    BLUETOOTH_WRITE_RETRIES: 5,
    BLUETOOTH_READ_TIMEOUT_MS: 15000,
    DOSE_TIMEOUT_MS: 7000,
  },
  FINISHED_WORK_REASON_NAME: "Fim Operação",
  ACTIVITY_ITEMS: [
    { id: "0", name: "Manutenção" },
    { id: "1", name: "Pré-Plantio" },
    { id: "2", name: "Pós-Plantio" },
    { id: "3", name: "Pré Corte" },
  ],

  // Keep all names equal
  PRESET_NAME_ITEMS: [
    { id: "0", name: "Tamanho 1" },
    { id: "1", name: "Tamanho 2" },
    { id: "2", name: "Tamanho 3" },
    { id: "3", name: "Tamanho 4" },
    { id: "4", name: "Tamanho 5" },
    { id: "5", name: "Tamanho 6" },
  ],
  PRESET_NAMES: [
    "Tamanho 1",
    "Tamanho 2",
    "Tamanho 3",
    "Tamanho 4",
    "Tamanho 5",
    "Tamanho 6",
  ],
  SUP_TS_PARSE_TABLE: {
    "Tamanho 1": 0,
    "Tamanho 2": 0,
    "Tamanho 3": 0,
    "Tamanho 4": 0,
    "Tamanho 5": 0,
    "Tamanho 6": 0,
  },
  EVENTS_TO_EXCLUDE: [EventEnum.TrackPoint.name],
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

    REQUEST_V5: {
      SYSTEMATIC_METERS_BETWEEN_DOSE_GREATER_THAN_10:
        "Metros entre dose não pode ser maior que 10.",
      NEW_ID_GREATER_THAN_100_OR_LESS_THAN_0:
        "Novo id deve ser um numero inteiro entre 1 e 99",
      APPLICATORS_AMOUNT_AND_SELECTED_DOES_NOT_MATCH:
        "Quantidade de aplicadores selecionados incoerente.",
      APPLICATOR_NOT_SPECIFIER: "Nenhum aplicador selecionado para dose.",
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
  activity: "",
  farm: "",
  clientName: "",
  plot: "",
  projectName: "",
  tractorName: "",
  weather: WeatherEnum.SECO.name,
  centerApplicatorLoad: 23,
  leftApplicatorLoad: 23,
  streetsAmount: 1,
  rightApplicatorLoad: 23,
  deviceName: "",
};
