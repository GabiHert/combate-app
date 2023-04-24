import { IConfigFormResult } from '../../interface/config-form-result';
import { IConfigsProps, IPreExecutionConfigProps } from '../../interface/config-props';
import { IPreExecutionFormResult } from '../../interface/pre-execution-form-result';

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
