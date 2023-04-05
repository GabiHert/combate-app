import { CONSTANTS } from '../../config/config';
import { WeatherEnum } from '../../core/enum/weather';
import { IConfigFormResult } from '../../interface/config-form-result';
import { IConfigsProps, IPreExecutionConfigProps } from '../../interface/config-props';
import { IPreExecutionFormResult } from '../../interface/pre-execution-form-result';
import { PValidator as PFormValidator } from '../port/validator-port';

export class FormValidator implements PFormValidator {
  validatePreExecutionForm(data: IPreExecutionConfigProps): IPreExecutionFormResult {
    let result: IPreExecutionFormResult;

    if (!data.clientName || data.clientName.length <= 2) {
      // clientName is invalid
      result.valid = false;
      result.clientName.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_CLIENT_NAME;
    }

    if (!data.projectName || data.projectName.length <= 2) {
      // projectName is invalid
      result.valid = false;
      result.projectName.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_PROJECT_NAME;
    }

    if (!data.farm || data.farm.length <= 2) {
      // farm is invalid
      result.valid = false;
      result.farm.errorMessage = CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_FARM;
    }

    if (!data.plot || data.plot.length === 0) {
      // plot is invalid
      result.valid = false;
      result.plotNumber.errorMessage = CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_PLOT;
    }

    if (!data.tractorName || data.tractorName.length === 0) {
      // tractorName is invalid
      result.valid = false;
      result.tractorName.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_TRACTOR_NAME;
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
    }

    if (!data.leftApplicatorLoad) {
      // leftApplicatorLoad is invalid
      result.valid = false;
      result.leftLoad.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_LEFT_APPLICATOR_LOAD;
    }

    if (!data.centerApplicatorLoad) {
      // centerApplicatorLoad is invalid
      result.valid = false;
      result.centerLoad.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_CENTER_APPLICATOR_LOAD;
    }

    if (!data.rightApplicatorLoad) {
      // rightApplicatorLoad is invalid
      result.valid = false;
      result.rightLoad.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_RIGHT_APPLICATOR_LOAD;
    }

    if (!data.streetsAmount || ![1, 2, 3, 5].includes(data.streetsAmount)) {
      // streetsAmount is invalid
      result.valid = false;
      result.streetsAmount.errorMessage =
        CONSTANTS.ERRORS.PRE_EXECUTION_FORM_VALIDATOR.UNDEFINED_STREETS_AMOUNT;
    }

    return result;
  }
  validateConfigForm(data: IConfigsProps): IConfigFormResult {
    throw new Error('Method not implemented.');
  }
  validateFinishExecutionForm(reason: string): string {
    throw new Error('Method not implemented.');
  }
  validateUnderForestForm(underForest: string): string {
    throw new Error('Method not implemented.');
  }
}
