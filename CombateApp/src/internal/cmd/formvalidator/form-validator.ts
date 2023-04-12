import { CONSTANTS } from '../../config/config';
import { WeatherEnum } from '../../core/enum/weather';
import { PLogger } from '../../core/port/logger-port';
import { IConfigFormResult } from '../../interface/config-form-result';
import { IConfigsProps, IPreExecutionConfigProps } from '../../interface/config-props';
import { IPreExecutionFormResult } from '../../interface/pre-execution-form-result';
import { PValidator as PFormValidator } from '../port/validator-port';

export class FormValidator implements PFormValidator {
  constructor(private readonly logger: PLogger) {}
  validatePreExecutionForm(data: IPreExecutionConfigProps): IPreExecutionFormResult {
    let result: IPreExecutionFormResult = {
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
    this.logger.info({
      event: 'FormValidator.validatePreExecutionForm',
      details: 'Process started',
      data,
    });
    if (!data.clientName || data.clientName.length <= 2) {
      // clientName is invalid
      result.valid = false;
      result.clientName.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_CLIENT_NAME;
      this.logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - clientName is invalid',
        clientName: data.clientName,
      });
    }

    if (!data.projectName || data.projectName.length <= 2) {
      // projectName is invalid
      result.valid = false;
      result.projectName.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_PROJECT_NAME;
      this.logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - projectName is invalid',
        projectName: data.projectName,
      });
    }

    if (!data.farm || data.farm.length <= 2) {
      // farm is invalid
      result.valid = false;
      result.farm.errorMessage = CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_FARM;
      this.logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - farm is invalid',
        farm: data.farm,
      });
    }

    if (!data.plot || data.plot.length === 0) {
      // plot is invalid
      result.valid = false;
      result.plot.errorMessage = CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_PLOT;
      this.logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - plot is invalid',
        plotNumber: data.plot,
      });
    }

    if (!data.tractorName || data.tractorName.length === 0) {
      // tractorName is invalid
      result.valid = false;
      result.tractorName.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_TRACTOR_NAME;
      this.logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - tractorName is invalid',
        tractorName: data.tractorName,
      });
    }

    if (
      !data.weather ||
      data.weather.length === 0 ||
      ![
        WeatherEnum.AFTER_RAIN.name,
        WeatherEnum.CHANCE_OF_RAIN.name,
        WeatherEnum.DEW.name,
        WeatherEnum.DRY.name,
        WeatherEnum.HUMID.name,
      ].includes(data.weather)
    ) {
      // weather is invalid
      result.valid = false;
      result.weather.errorMessage = CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_WEATHER;
      this.logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - weather is invalid',
        weather: data.weather,
      });
    }

    if (!data.leftApplicatorLoad) {
      // leftApplicatorLoad is invalid
      result.valid = false;
      result.leftApplicatorLoad.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_LEFT_APPLICATOR_LOAD;
      this.logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - leftApplicatorLoad is invalid',
        leftApplicatorLoad: data.leftApplicatorLoad,
      });
    }

    if (!data.centerApplicatorLoad) {
      // centerApplicatorLoad is invalid
      result.valid = false;
      result.centerApplicatorLoad.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_CENTER_APPLICATOR_LOAD;
      this.logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - leftApplicatorLoad is invalid',
        leftApplicatorLoad: data.leftApplicatorLoad,
      });
    }

    if (!data.rightApplicatorLoad) {
      // rightApplicatorLoad is invalid
      result.valid = false;
      result.rightApplicatorLoad.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_RIGHT_APPLICATOR_LOAD;
      this.logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - leftApplicatorLoad is invalid',
        leftApplicatorLoad: data.leftApplicatorLoad,
      });
    }

    if (!data.streetsAmount || ![1, 2, 3, 5].includes(data.streetsAmount)) {
      // streetsAmount is invalid
      result.valid = false;
      result.streetsAmount.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_STREETS_AMOUNT;
      this.logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - streetsAmount is invalid',
        streetsAmount: data.streetsAmount,
      });
    }
    this.logger.info({
      event: 'FormValidator.validatePreExecutionForm',
      details: 'Process finished',
      result,
    });

    return result;
  }
  validateConfigForm(data: IConfigsProps): IConfigFormResult {
    let result: IConfigFormResult;
    if (!data.APPLICATION) {
      result.valid = false;
    } else {
      if (!data.APPLICATION.LEFT_TANK_MAX_LOAD || data.APPLICATION.LEFT_TANK_MAX_LOAD < 1) {
        result.valid = false;
        result.leftTankMaxLoad.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_LEFT_TANK_MAX_LOAD;
      }
      if (!data.APPLICATION.CENTER_TANK_MAX_LOAD || data.APPLICATION.CENTER_TANK_MAX_LOAD < 1) {
        result.valid = false;
        result.centerTankMaxLoad.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_CENTER_TANK_MAX_LOAD;
      }
      if (!data.APPLICATION.RIGHT_TANK_MAX_LOAD || data.APPLICATION.RIGHT_TANK_MAX_LOAD < 1) {
        result.valid = false;
        result.rightTankMaxLoad.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_RIGHT_TANK_MAX_LOAD;
      }
      if (!data.APPLICATION.DOSE_WEIGHT_KG || data.APPLICATION.DOSE_WEIGHT_KG < 1) {
        result.valid = false;
        result.doseWeightKg.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_DOSE_WEIGHT_KG;
      }
    }

    if (!data.PRESETS || Object.keys(data.PRESETS).length < 6) {
      result.valid = false;
    } else {
      for (const key in data.PRESETS) {
        if (!data.PRESETS[key].NAME || data.PRESETS[key].NAME.length === 0) {
          result.valid = false;
        }
        if (!data.PRESETS[key].DOSE_AMOUNT || data.PRESETS[key].DOSE_AMOUNT < 1) {
          result.valid = false;
        }
      }
    }

    if (!data.STOP_REASONS_EVENTS) {
      result.valid = false;
    } else {
      for (const key in data.STOP_REASONS_EVENTS) {
        if (!data.STOP_REASONS_EVENTS[key]) {
          result.valid = false;
        }
      }
    }

    if (!data.PLOTS) {
      result.valid = false;
    } else {
      for (const key in data.PLOTS) {
        if (!data.PLOTS[key] || data.PLOTS[key].length === 0) {
          result.valid = false;
        }
      }
    }

    if (!data.FILE_PATH || data.FILE_PATH.length < 3) {
      result.valid = false;
    }

    if (!data.POISON_TYPE || data.POISON_TYPE.length < 3) {
      result.valid = false;
    }

    return result;
  }
  validateFinishExecutionForm(reason: string): string {
    throw new Error('Method not implemented.');
  }
  validateUnderForestForm(underForest: string): string {
    throw new Error('Method not implemented.');
  }
}
