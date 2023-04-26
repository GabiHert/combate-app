import { CONSTANTS } from '../../internal/config/config';
import { PoisonEnum } from '../../internal/core/enum/poison';
import { WeatherEnum } from '../../internal/core/enum/weather';
import { PCache } from '../../internal/core/port/config-cache-port';
import { PLogger } from '../../internal/core/port/logger-port';
import { IConfigFormResult } from '../../internal/interface/config-form-result';
import { IConfigsProps, IPreExecutionConfigProps } from '../../internal/interface/config-props';
import { IPreExecutionFormResult } from '../../internal/interface/pre-execution-form-result';
import { PValidator } from '../port/validator-port';

export class Validator implements PValidator {
  constructor(private readonly _logger: PLogger, private readonly _config: PCache) {}

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
    this._logger.info({
      event: 'FormValidator.validatePreExecutionForm',
      details: 'Process started',
      data,
    });
    if (!data.clientName || data.clientName.length <= 2) {
      // clientName is invalid
      result.valid = false;
      result.clientName.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_CLIENT_NAME;
      this._logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - clientName is invalid',
        clientName: data.clientName,
      });
    }

    if (!data.projectName || data.projectName.length <= 2) {
      // projectName is invalid
      result.valid = false;
      result.projectName.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_PROJECT_NAME;
      this._logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - projectName is invalid',
        projectName: data.projectName,
      });
    }

    if (!data.farm || data.farm.length <= 2) {
      // farm is invalid
      result.valid = false;
      result.farm.errorMessage = CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_FARM;
      this._logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - farm is invalid',
        farm: data.farm,
      });
    }

    if (!data.plot || data.plot.length === 0) {
      // plot is invalid
      result.valid = false;
      result.plot.errorMessage = CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_PLOT;
      this._logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - plot is invalid',
        plotNumber: data.plot,
      });
    }

    if (!data.tractorName || data.tractorName.length === 0) {
      // tractorName is invalid
      result.valid = false;
      result.tractorName.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_TRACTOR_NAME;
      this._logger.warn({
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
      result.weather.errorMessage = CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_WEATHER;
      this._logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - weather is invalid',
        weather: data.weather,
      });
    }

    if (!data.leftApplicatorLoad) {
      // leftApplicatorLoad is invalid
      result.valid = false;
      result.leftApplicatorLoad.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_LEFT_APPLICATOR_LOAD;
      this._logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - leftApplicatorLoad is invalid',
        leftApplicatorLoad: data.leftApplicatorLoad,
      });
    }

    if (!data.centerApplicatorLoad) {
      // centerApplicatorLoad is invalid
      result.valid = false;
      result.centerApplicatorLoad.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_CENTER_APPLICATOR_LOAD;
      this._logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - leftApplicatorLoad is invalid',
        leftApplicatorLoad: data.leftApplicatorLoad,
      });
    }

    if (!data.rightApplicatorLoad) {
      // rightApplicatorLoad is invalid
      result.valid = false;
      result.rightApplicatorLoad.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_RIGHT_APPLICATOR_LOAD;
      this._logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - leftApplicatorLoad is invalid',
        leftApplicatorLoad: data.leftApplicatorLoad,
      });
    }

    if (!data.streetsAmount || ![1, 2, 3, 5].includes(data.streetsAmount)) {
      // streetsAmount is invalid
      result.valid = false;
      result.streetsAmount.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.INVALID_STREETS_AMOUNT;
      this._logger.warn({
        event: 'FormValidator.validatePreExecutionForm',
        details: 'Process warn - streetsAmount is invalid',
        streetsAmount: data.streetsAmount,
      });
    }
    this._logger.info({
      event: 'FormValidator.validatePreExecutionForm',
      details: 'Process finished',
      result,
    });

    return result;
  }
  validateConfigForm(data: IConfigsProps): IConfigFormResult {
    this._logger.info({
      event: 'FormValidator.validateConfigForm',
      details: 'Process started',
      data,
    });

    let result: IConfigFormResult = {
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
      events: { errorMessage: undefined },
      farms: { errorMessage: undefined },
      filePath: { errorMessage: undefined },
      plots: { errorMessage: undefined },
      poisonType: { errorMessage: undefined },
      preset5Dose: { errorMessage: undefined },
      preset5Name: { errorMessage: undefined },
      preset6Dose: { errorMessage: undefined },
      preset6Name: { errorMessage: undefined },
      spaceBetweenLines: { errorMessage: undefined },
      stopReasonEvent: { errorMessage: undefined },
      rightTankMaxLoad: { errorMessage: undefined },
    };

    if (!data.APPLICATION) {
      result.valid = false;
    } else {
      if (!data.APPLICATION.LEFT_TANK_MAX_LOAD || data.APPLICATION.LEFT_TANK_MAX_LOAD < 1) {
        result.valid = false;
        result.leftTankMaxLoad.errorMessage =
          CONSTANTS.ERRORS.CONFIG_FORM.INVALID_LEFT_TANK_MAX_LOAD;
        this._logger.warn({
          event: 'FormValidator.validateConfigForm',
          details: 'Process warn - Invalid LEFT_TANK_MAX_LOAD',
        });
      }
      if (!data.APPLICATION.CENTER_TANK_MAX_LOAD || data.APPLICATION.CENTER_TANK_MAX_LOAD < 1) {
        result.valid = false;
        result.centerTankMaxLoad.errorMessage =
          CONSTANTS.ERRORS.CONFIG_FORM.INVALID_CENTER_TANK_MAX_LOAD;
        this._logger.warn({
          event: 'FormValidator.validateConfigForm',
          details: 'Process warn - Invalid CENTER_TANK_MAX_LOAD',
        });
      }
      if (!data.APPLICATION.RIGHT_TANK_MAX_LOAD || data.APPLICATION.RIGHT_TANK_MAX_LOAD < 1) {
        result.valid = false;
        result.rightTankMaxLoad.errorMessage =
          CONSTANTS.ERRORS.CONFIG_FORM.INVALID_RIGHT_TANK_MAX_LOAD;
        this._logger.warn({
          event: 'FormValidator.validateConfigForm',
          details: 'Process warn - Invalid RIGHT_TANK_MAX_LOAD',
        });
      }
      if (!data.APPLICATION.DOSE_WEIGHT_KG || data.APPLICATION.DOSE_WEIGHT_KG < 0.005) {
        result.valid = false;
        result.doseWeightKg.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_DOSE_WEIGHT_KG;
        this._logger.warn({
          event: 'FormValidator.validateConfigForm',
          details: 'Process warn - Invalid DOSE_WEIGHT_KG',
        });
      }
    }

    if (!data.PRESETS || Object.keys(data.PRESETS).length < 6) {
      result.valid = false;
      this._logger.warn({
        event: 'FormValidator.validateConfigForm',
        details: 'Process warn - Invalid PRESETS',
      });
      for (let i = 0; i < 6; i++) {
        result['preset' + (i + 1) + 'Name'].errorMessage =
          CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PRESET;
        result['preset' + (i + 1) + 'Dose'].errorMessage =
          CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PRESET;
      }
    } else {
      for (const key in data.PRESETS) {
        if (!data.PRESETS[key].NAME || data.PRESETS[key].NAME.length === 0) {
          result.valid = false;
          result['preset' + key[1] + 'Name'].errorMessage =
            CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PRESET_NAME;
          this._logger.warn({
            event: 'FormValidator.validateConfigForm',
            details: 'Process warn - Invalid PRESET.NAME',
          });
        }
        if (!data.PRESETS[key].DOSE_AMOUNT || data.PRESETS[key].DOSE_AMOUNT < 1) {
          result.valid = false;
          result['preset' + key[1] + 'Dose'].errorMessage =
            CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PRESET_VALUE;

          this._logger.warn({
            event: 'FormValidator.validateConfigForm',
            details: 'Process warn - Invalid PRESET.DOSE_AMOUNT',
          });
        }
      }
    }

    if (!data.STOP_REASONS_EVENTS) {
      result.valid = false;
      result.stopReasonEvent.errorMessage =
        CONSTANTS.ERRORS.CONFIG_FORM.INVALID_STOP_REASONS_EVENTS;
      this._logger.warn({
        event: 'FormValidator.validateConfigForm',
        details: 'Process warn - Invalid STOP_REASON_EVENTS',
      });
    } else {
      for (const key in data.STOP_REASONS_EVENTS) {
        if (!data.STOP_REASONS_EVENTS[key].length) {
          result.valid = false;
          result.stopReasonEvent.errorMessage =
            CONSTANTS.ERRORS.CONFIG_FORM.INVALID_STOP_REASONS_EVENTS;
          this._logger.warn({
            event: 'FormValidator.validateConfigForm',
            details: 'Process warn - Invalid STOP_REASON_EVENTS attribute',
          });
        }
      }
    }

    if (!data.FARMS) {
      result.valid = false;
      result.farms.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_FARMS;
      this._logger.warn({
        event: 'FormValidator.validateConfigForm',
        details: 'Process warn - Invalid FARMS',
      });
    } else {
      for (const key in data.PLOTS) {
        if (!data.FARMS[key] || data.FARMS[key].length === 0) {
          result.valid = false;
          result.farms.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_FARMS;
          this._logger.warn({
            event: 'FormValidator.validateConfigForm',
            details: 'Process warn - Invalid FARMS attribute',
          });
        }
      }
    }

    if (!data.PLOTS) {
      result.valid = false;
      result.plots.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PLOTS;
      this._logger.warn({
        event: 'FormValidator.validateConfigForm',
        details: 'Process warn - Invalid PLOTS',
      });
    } else {
      for (const key in data.PLOTS) {
        if (!data.PLOTS[key] || data.PLOTS[key].length === 0) {
          result.valid = false;
          result.plots.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_PLOTS;
          this._logger.warn({
            event: 'FormValidator.validateConfigForm',
            details: 'Process warn - Invalid PLOTS attribute',
          });
        }
      }
    }

    if (!data.FILE_PATH || data.FILE_PATH.length < 3) {
      result.valid = false;
      result.filePath.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_FILE_PATH;
      this._logger.warn({
        event: 'FormValidator.validateConfigForm',
        details: 'Process warn - Invalid FILE_PATH',
      });
    }

    const poisonTypes = [];
    Object.keys(PoisonEnum).forEach((key) => {
      poisonTypes.push(PoisonEnum[key].name);
    });

    if (!data.POISON_TYPE || !poisonTypes.includes(data.POISON_TYPE)) {
      result.valid = false;
      result.poisonType.errorMessage = CONSTANTS.ERRORS.CONFIG_FORM.INVALID_POISON_TYPE;
      this._logger.warn({
        event: 'FormValidator.validateConfigForm',
        details: 'Process warn - Invalid POISON_TYPE',
        poisonType: data.POISON_TYPE,
      });
    }

    this._logger.info({
      event: 'FormValidator.validateConfigForm',
      details: 'Process started',
      result,
    });
    return result;
  }
  validateFinishExecutionForm(reason: string): string {
    this._logger.info({
      event: 'FormValidator.validateFinishExecutionForm',
      details: 'Process started',
      reason,
    });
    const keys = Object.keys(this._config.getCache().STOP_REASONS_EVENTS);
    const values = [];
    keys.forEach((key) => {
      values.push(this._config.getCache().STOP_REASONS_EVENTS[key]);
    });
    if (!reason || reason.length < 1 || !values.includes(reason)) {
      this._logger.warn({
        event: 'FormValidator.validateFinishExecutionForm',
        details: 'Process warn - reason is invalid',
      });
      this._logger.info({
        event: 'FormValidator.validateFinishExecutionForm',
        details: 'Process finished',
      });
      return CONSTANTS.ERRORS.FINISH_EXECUTION_FORM.INVALID_REASON;
    }

    this._logger.info({
      event: 'FormValidator.validateFinishExecutionForm',
      details: 'Process finished',
    });
    return;
  }

  validateUnderForestForm(underForest: string): string {
    this._logger.info({
      event: 'FormValidator.validateUnderForestForm',
      details: 'Process started',
      underForest,
    });

    const names = [];
    CONSTANTS.UNDER_FOREST_ITEMS.forEach((key) => {
      names.push(key.name);
    });
    if (!underForest || underForest.length < 1 || !names.includes(underForest)) {
      this._logger.warn({
        event: 'FormValidator.validateUnderForestForm',
        details: 'Process warn - underForest is invalid',
      });
      this._logger.info({
        event: 'FormValidator.validateUnderForestForm',
        details: 'Process finished',
      });
      return CONSTANTS.ERRORS.FINISH_EXECUTION_FORM.INVALID_REASON;
    }

    this._logger.info({
      event: 'FormValidator.validateUnderForestForm',
      details: 'Process finished',
    });
    return;
  }
}
