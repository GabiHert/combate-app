import { v4 } from 'uuid';
import { FormValidator } from '../../../../src/internal/cmd/formvalidator/form-validator';
import { CONSTANTS } from '../../../../src/internal/config/config';
import { WeatherEnum } from '../../../../src/internal/core/enum/weather';
import {
  IConfigsProps,
  IPreExecutionConfigProps,
} from '../../../../src/internal/interface/config-props';
import { IPreExecutionFormResult } from '../../../../src/internal/interface/pre-execution-form-result';
import { LoggerMock } from '../../../mock/logger-mock';
import { IConfigFormResult } from '../../../../src/internal/interface/config-form-result';
import { PoisonEnum } from '../../../../src/internal/core/enum/poison';

describe('FormValidator unit tests', () => {
  const loggerMocked = new LoggerMock();
  const formValidator = new FormValidator(loggerMocked);

  let preExecutionFormData: IPreExecutionConfigProps;
  let preExecutionFormResult: IPreExecutionFormResult;
  let configFormData: IConfigsProps;
  let configFormResult: IConfigFormResult;

  beforeEach(() => {
    loggerMocked.clear();
    preExecutionFormData = {
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
    };

    configFormData = {
      APPLICATION: {
        CENTER_TANK_MAX_LOAD: 30,
        DOSE_WEIGHT_KG: 0.025,
        LEFT_TANK_MAX_LOAD: 0,
        RIGHT_TANK_MAX_LOAD: 0,
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
      SPACE_BETWEEN_LINES: 1,
      STOP_REASONS_EVENTS: { 1: v4() },
      SYSTEMATIC_DOSE: { METERS_BETWEEN_DOSE: 10 },
    };

    configFormResult = {
      valid: true,
      centerTankMaxLoad: { errorMessage: undefined },
      doseWeightKg: { errorMessage: undefined },
      leftTankMaxLoad: { errorMessage: undefined },
      preset1Dose: { errorMessage: undefined },
      preset1Name: { errorMessage: undefined },
      preset2Dose: { errorMessage: undefined },
      preset2Name: { errorMessage: undefined },
      preset3Dose: { errorMessage: undefined },
      preset3Name: { errorMessage: undefined },
      preset4Dose: { errorMessage: undefined },
      preset4Name: { errorMessage: undefined },
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_CLIENT_NAME;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_CLIENT_NAME;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_PROJECT_NAME;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_PROJECT_NAME;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_FARM;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_FARM;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_PLOT;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_PLOT;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_STREETS_AMOUNT;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_STREETS_AMOUNT;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_STREETS_AMOUNT;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_STREETS_AMOUNT;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_WEATHER;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_WEATHER;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_TRACTOR_NAME;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_TRACTOR_NAME;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_RIGHT_APPLICATOR_LOAD;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_CENTER_APPLICATOR_LOAD;
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
      CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_LEFT_APPLICATOR_LOAD;
    preExecutionFormResult.valid = false;

    expect(result).toEqual(preExecutionFormResult);
    expect(loggerMocked.infoCalled).toBeGreaterThan(1);
    expect(loggerMocked.errorCalled).toBe(0);
    expect(loggerMocked.warnCalled).toBe(1);
  });

  // END validatePreExecutionForm UNIT TEST
  // START validateConfigForm UNIT TEST
});

export {};
