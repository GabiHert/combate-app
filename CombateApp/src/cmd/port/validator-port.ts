import { config } from '../../internal/core/port/config-cache-port';
import { logger } from '../../internal/core/port/logger-port';
import { IConfigFormResult } from '../../internal/interface/config-form-result';
import { IConfigsProps, IPreExecutionConfigProps } from '../../internal/interface/config-props';
import { IPreExecutionFormResult } from '../../internal/interface/pre-execution-form-result';
import { Validator } from '../formvalidator/form-validator';

export interface PValidator {
  /**
   *
   * @param data configuration to be validated
   * @return an error message to each invalid field
   */
  validatePreExecutionForm(data: IPreExecutionConfigProps): IPreExecutionFormResult;

  /**
   *
   * @param data configuration to be validated
   * @return an error message to each invalid field
   */
  validateConfigForm(data: IConfigsProps): IConfigFormResult;
  /**
   *
   * @param reason configuration to be validated
   * @return an error message if reason is invalid
   */
  validateFinishExecutionForm(reason: string): string;

  /**
   *
   * @param underForest configuration to be validated
   * @return an error message if underForest is invalid
   */
  validateUnderForestForm(underForest: string): string;
}

export const validator: PValidator = new Validator(logger, config);
