import { v4 } from 'uuid';
import { Validator } from '../../../src/cmd/formvalidator/form-validator';
import { CONSTANTS } from '../../../src/internal/config/config';
import { PoisonEnum } from '../../../src/internal/core/enum/poison';
import { WeatherEnum } from '../../../src/internal/core/enum/weather';
import { IConfigFormResult } from '../../../src/internal/interface/config-form-result';
import {
  IConfigsProps,
  IPreExecutionConfigProps,
} from '../../../src/internal/interface/config-props';
import { IPreExecutionFormResult } from '../../../src/internal/interface/pre-execution-form-result';
import { ConfigMock } from '../../mock/config-mock';
import { LoggerMock } from '../../mock/logger-mock';

describe('FormValidator unit tests', () => {
  const loggerMocked = new LoggerMock();
  const configMocked = new ConfigMock();
  const formValidator = new Validator(loggerMocked, configMocked);

  let preExecutionFormData: IPreExecutionConfigProps;
  let preExecutionFormResult: IPreExecutionFormResult;
  let configFormData: IConfigsProps;
  let configFormResult: IConfigFormResult;
  let stopReasonEvent: string;

  beforeEach(() => {
    stopReasonEvent = v4();
    configMocked.cache = {
      LINES_SPACING: 1,
      SYSTEMATIC_DOSE: { METERS_BETWEEN_DOSE: 2 },
      STOP_REASONS_EVENTS: { stopReasonEvent },
      APPLICATION: {
        MAX_VELOCITY: 2,
        CENTER_TANK_MAX_LOAD: 0,
        DOSE_WEIGHT_G: 0,
        LEFT_TANK_MAX_LOAD: 0,
        RIGHT_TANK_MAX_LOAD: 0,
      },
      EVENTS: {},
      FARMS: {},
      FILE_PATH: '',
      PLOTS: {},
      POISON_TYPE: '',
      PRESETS: {
        P1: { DOSE_AMOUNT: 0, NAME: '' },
        P2: { DOSE_AMOUNT: 0, NAME: '' },
        P3: { DOSE_AMOUNT: 0, NAME: '' },
        P4: { DOSE_AMOUNT: 0, NAME: '' },
        P5: { DOSE_AMOUNT: 0, NAME: '' },
        P6: { DOSE_AMOUNT: 0, NAME: '' },
      },
    };
    loggerMocked.clear();
    preExecutionFormData = {
      activity: '',
      applicatorsAmount: 1,
      deviceName: v4(),
      clientName: v4(),
      projectName: v4(),
      farm: v4(),
      plot: v4(),
      tractorName: v4(),
      weather: WeatherEnum.AFTER_RAIN.name,
      leftApplicatorLoad: 2,
      centerApplicatorLoad: 2,
      rightApplicatorLoad: 2,
      streetsAmount: 1,
    };

    preExecutionFormResult = {
      activity: { errorMessage: undefined },
      applicatorsAmount: { errorMessage: undefined },
      valid: true,
      clientName: { errorMessage: undefined },
      projectName: { errorMessage: undefined },
      farm: { errorMessage: undefined },
      plot: { errorMessage: undefined },
      tractorName: { errorMessage: undefined },
      weather: { errorMessage: undefined },
      leftApplicatorLoad: { errorMessage: undefined },
      centerApplicatorLoad: { errorMessage: undefined },
      rightApplicatorLoad: { errorMessage: undefined },
      streetsAmount: { errorMessage: undefined },
      deviceName: { errorMessage: undefined },
    };

    configFormData = {
      APPLICATION: {
        MAX_VELOCITY: 2,
        CENTER_TANK_MAX_LOAD: 30,
        DOSE_WEIGHT_G: 0.025,
        LEFT_TANK_MAX_LOAD: 30,
        RIGHT_TANK_MAX_LOAD: 30,
      },
      EVENTS: { 1: v4() },
      FARMS: { 1: v4() },
      FILE_PATH: 'teste/teste',
      PLOTS: { 1: v4() },
      POISON_TYPE: PoisonEnum.FP.name,
      PRESETS: {
        P1: { DOSE_AMOUNT: 10, NAME: 'teste' },
        P2: { DOSE_AMOUNT: 2, NAME: 'teste' },
        P3: { DOSE_AMOUNT: 4, NAME: 'teste' },
        P4: { DOSE_AMOUNT: 5, NAME: 'teste' },
        P5: { DOSE_AMOUNT: 6, NAME: 'teste' },
        P6: { DOSE_AMOUNT: 7, NAME: 'teste' },
      },
      LINES_SPACING: 1,
      STOP_REASONS_EVENTS: { 1: v4() },
      SYSTEMATIC_DOSE: { METERS_BETWEEN_DOSE: 10 },
    };

    configFormResult = {
      valid: true,
      maxVelocity: { errorMessage: undefined },
      centerTankMaxLoad: { errorMessage: undefined },
      doseWeightG: { errorMessage: undefined },
      leftTankMaxLoad: { errorMessage: undefined },
      preset1Dose: { errorMessage: undefined },
      preset1Name: { errorMessage: undefined },
      preset2Dose: { errorMessage: undefined },
      preset2Name: { errorMessage: undefined },
      preset3Dose: { errorMessage: undefined },
      preset3Name: { errorMessage: undefined },
      preset4Dose: { errorMessage: undefined },
      preset4Name: { errorMessage: undefined },
      events: { errorMessage: undefined },
      farms: { errorMessage: undefined },
      filePath: { errorMessage: undefined },
      plots: { errorMessage: undefined },
      poisonType: { errorMessage: undefined },
      preset5Dose: { errorMessage: undefined },
      preset5Name: { errorMessage: undefined },
      preset6Dose: { errorMessage: undefined },
      preset6Name: { errorMessage: undefined },
      lineSpacing: { errorMessage: undefined },
      stopReasonEvent: { errorMessage: undefined },
      rightTankMaxLoad: { errorMessage: undefined },
    };
  });

  // BEGIN validatePreExecutionForm UNIT TEST

  it('should indicate that all preExecutionFormData fields are valid', () => {
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(0);
  });

  it('should indicate an error when preExecutionFormData.clientName is undefined', () => {
    delete preExecutionFormData.clientName;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.clientName.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_CLIENT_NAME;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.clientName is empty', () => {
    preExecutionFormData.clientName = '';
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.clientName.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_CLIENT_NAME;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.projectName is undefined', () => {
    preExecutionFormData.projectName = undefined;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.projectName.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_PROJECT_NAME;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.projectName is empty', () => {
    preExecutionFormData.projectName = '';
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.projectName.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_PROJECT_NAME;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.deviceName is empty', () => {
    preExecutionFormData.deviceName = '';
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.projectName.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_PROJECT_NAME;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.farm is empty', () => {
    preExecutionFormData.farm = '';
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.farm.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_FARM;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.farm is undefined', () => {
    preExecutionFormData.farm = undefined;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.farm.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_FARM;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.plot is empty', () => {
    preExecutionFormData.plot = '';
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.plot.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_PLOT;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.plot is undefined', () => {
    preExecutionFormData.plot = undefined;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.plot.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_PLOT;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.streetsAmount is zero', () => {
    preExecutionFormData.streetsAmount = 0;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.streetsAmount.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_STREETS_AMOUNT;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.streetsAmount is undefined', () => {
    preExecutionFormData.streetsAmount = undefined;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.streetsAmount.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_STREETS_AMOUNT;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.streetsAmount is 4', () => {
    preExecutionFormData.streetsAmount = 4;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.streetsAmount.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_STREETS_AMOUNT;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.streetsAmount is > 5', () => {
    preExecutionFormData.streetsAmount = 6;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.streetsAmount.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_STREETS_AMOUNT;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that fields are valid when preExecutionFormData.streetsAmount is 1,2,3 or 5', () => {
    [1, 2, 3, 5].forEach((v) => {
      preExecutionFormData.streetsAmount = v;
      const result = formValidator.validatePreExecutionForm(preExecutionFormData);

      expect(result).toEqual(preExecutionFormResult);
      expect(loggerMocked.infoCalled).toBeGreaterThan(1);
      expect(loggerMocked.errorCalled).toBe(0);
      expect(loggerMocked.warnCalled).toBe(0);
    });
  });

  it('should indicate an error when preExecutionFormData.weather is undefined', () => {
    preExecutionFormData.weather = undefined;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.weather.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_WEATHER;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.weather is empty', () => {
    preExecutionFormData.weather = '';
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.weather.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_WEATHER;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that fields are valid when preExecutionFormData.weather is one of WeatherEnum.name', () => {
    Object.keys(WeatherEnum).forEach((weather) => {
      preExecutionFormData.weather = WeatherEnum[weather].name;
      const result = formValidator.validatePreExecutionForm(preExecutionFormData);

      expect(result).toEqual(preExecutionFormResult);
      expect(loggerMocked.infoCalled).toBeGreaterThan(1);
      expect(loggerMocked.errorCalled).toBe(0);
      expect(loggerMocked.warnCalled).toBe(0);
    });
  });

  it('should indicate an error when preExecutionFormData.tractorName is empty', () => {
    preExecutionFormData.tractorName = '';
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.tractorName.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_TRACTOR_NAME;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.tractorName is undefined', () => {
    preExecutionFormData.tractorName = undefined;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.tractorName.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_TRACTOR_NAME;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.rightApplicatorLoad is undefined', () => {
    preExecutionFormData.rightApplicatorLoad = undefined;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.rightApplicatorLoad.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_RIGHT_APPLICATOR_LOAD;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.centerApplicatorLoad is undefined', () => {
    preExecutionFormData.centerApplicatorLoad = undefined;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.centerApplicatorLoad.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_CENTER_APPLICATOR_LOAD;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate an error when preExecutionFormData.leftApplicatorLoad is undefined', () => {
    preExecutionFormData.leftApplicatorLoad = undefined;
    const result = formValidator.validatePreExecutionForm(preExecutionFormData);

    preExecutionFormResult.leftApplicatorLoad.errorMessage =
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_LEFT_APPLICATOR_LOAD;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  // END validatePreExecutionForm UNIT TEST
  // START validateConfigForm UNIT TEST

  it('should indicate that all configFormData fields are valid', () => {
    const result = formValidator.validateConfigForm(configFormData);

    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(0);
  });

  it('should indicate that input is invalid when RIGHT_TANK_MAX_LOAD is 0', () => {
    configFormData.APPLICATION.RIGHT_TANK_MAX_LOAD = 0;
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.rightTankMaxLoad.errorMessage =
      CONSTANTS.ERRORS.CONFIG_FORM.INVALID_RIGHT_TANK_MAX_LOAD;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when CENTER_TANK_MAX_LOAD is 0', () => {
    configFormData.APPLICATION.CENTER_TANK_MAX_LOAD = 0;
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.centerTankMaxLoad.errorMessage =
      CONSTANTS.ERRORS.CONFIG_FORM.INVALID_CENTER_TANK_MAX_LOAD;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when LEFT_TANK_MAX_LOAD is 0', () => {
    configFormData.APPLICATION.LEFT_TANK_MAX_LOAD = 0;
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.leftTankMaxLoad.errorMessage =
      CONSTANTS.ERRORS.CONFIG_FORM.INVALID_LEFT_TANK_MAX_LOAD;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when RIGHT_TANK_MAX_LOAD is undefined', () => {
    configFormData.APPLICATION.RIGHT_TANK_MAX_LOAD = undefined;
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.rightTankMaxLoad.errorMessage =
      CONSTANTS.ERRORS.CONFIG_FORM.INVALID_RIGHT_TANK_MAX_LOAD;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when CENTER_TANK_MAX_LOAD is undefined', () => {
    configFormData.APPLICATION.CENTER_TANK_MAX_LOAD = undefined;
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.centerTankMaxLoad.errorMessage =
      CONSTANTS.ERRORS.CONFIG_FORM.INVALID_CENTER_TANK_MAX_LOAD;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when LEFT_TANK_MAX_LOAD is undefined', () => {
    configFormData.APPLICATION.LEFT_TANK_MAX_LOAD = undefined;
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.leftTankMaxLoad.errorMessage =
      CONSTANTS.ERRORS.CONFIG_FORM.INVALID_LEFT_TANK_MAX_LOAD;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when PRESETS is undefined', () => {
    configFormData.PRESETS = undefined;
    const result = formValidator.validateConfigForm(configFormData);
    for (let i = 0; i < 6; i++) {
      configFormResult['preset' + (i + 1).toString() + 'Name'].errorMessage =
        CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PRESET;
      configFormResult['preset' + (i + 1).toString() + 'Dose'].errorMessage =
        CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PRESET;
    }
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when PRESETS.NAME is undefined', () => {
    configFormData.PRESETS.P1.NAME = undefined;
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.preset1Name.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PRESET_NAME;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when PRESETS.NAME is empty', () => {
    configFormData.PRESETS.P1.NAME = '';
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.preset1Name.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PRESET_NAME;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when PRESETS.DOSE_AMOUNT is undefined', () => {
    configFormData.PRESETS.P1.DOSE_AMOUNT = undefined;
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.preset1Dose.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PRESET_VALUE;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when PRESETS.DOSE_AMOUNT is < 1', () => {
    configFormData.PRESETS.P1.DOSE_AMOUNT = 0;
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.preset1Dose.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PRESET_VALUE;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when STOP_REASONS_EVENTS is undefined', () => {
    configFormData.STOP_REASONS_EVENTS = undefined;
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.stopReasonEvent.errorMessage =
      CONSTANTS.ERRORS.CONFIG_FORM.INVALID_STOP_REASONS_EVENTS;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });
  it('should indicate that input is invalid when STOP_REASONS_EVENTS attribute is empty ', () => {
    configFormData.STOP_REASONS_EVENTS.T = '';
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.stopReasonEvent.errorMessage =
      CONSTANTS.ERRORS.CONFIG_FORM.INVALID_STOP_REASONS_EVENTS;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when PLOTS is undefined', () => {
    configFormData.PLOTS = undefined;
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.plots.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PLOTS;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when PLOTS attribute is empty ', () => {
    configFormData.PLOTS.T = '';
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.plots.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PLOTS;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should indicate that input is invalid when POISON_TYPE is undefined', () => {
    configFormData.POISON_TYPE = undefined;
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.poisonType.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_POISON_TYPE;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });
  it('should indicate that input is invalid when POISON_TYPE attribute is not one of PoisonTypeEnum ', () => {
    configFormData.POISON_TYPE = v4();
    const result = formValidator.validateConfigForm(configFormData);
    configFormResult.poisonType.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PLOTS;
    configFormResult.valid = false;
    expect(result).toEqual(configFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  // BEGIN validateFinishExecutionForm UNIT TEST

  it('should return an error message when reason is undefined ', () => {
    const result = formValidator.validateFinishExecutionForm(undefined);
    expect(result).toEqual(CONSTANTS.ERRORS.FINISH_EXECUTION_FORM.INVALID_REASON);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should return an error message when reason is an empty string ', () => {
    const result = formValidator.validateFinishExecutionForm('');
    expect(result).toEqual(CONSTANTS.ERRORS.FINISH_EXECUTION_FORM.INVALID_REASON);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should return an error message when reason is a string different from the cached possible reasons', () => {
    const result = formValidator.validateFinishExecutionForm(v4());
    expect(result).toEqual(CONSTANTS.ERRORS.FINISH_EXECUTION_FORM.INVALID_REASON);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should return undefined when reason is one of the cached possible', () => {
    const result = formValidator.validateFinishExecutionForm(stopReasonEvent);
    expect(result).toEqual(undefined);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(0);
  });

  // BEGIN validateUnderForestForm UNIT TEST

  it('should return an error message when underForest is undefined ', () => {
    const result = formValidator.validateUnderForestForm(undefined);
    expect(result).toEqual(CONSTANTS.ERRORS.UNDER_FOREST_FORM.INVALID_UNDER_FOREST);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should return an error message when underForest is an empty string ', () => {
    const result = formValidator.validateUnderForestForm('');
    expect(result).toEqual(CONSTANTS.ERRORS.UNDER_FOREST_FORM.INVALID_UNDER_FOREST);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should return an error message when underForest is a string different from the cached possible reasons', () => {
    const result = formValidator.validateUnderForestForm(v4());
    expect(result).toEqual(CONSTANTS.ERRORS.UNDER_FOREST_FORM.INVALID_UNDER_FOREST);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  it('should return undefined when underForest is one of the cached', () => {
    const result = formValidator.validateUnderForestForm(CONSTANTS.UNDER_FOREST_ITEMS[0].name);
    expect(result).toEqual(undefined);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(0);
  });
});

export {};
