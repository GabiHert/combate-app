import { IConfigFormResult } from '../../interface/config-form-result';
import { IConfigsProps, IPreExecutionConfigProps } from '../../interface/config-props';
import { IPreExecutionFormResult } from '../../interface/pre-execution-form-result';

export interface PValidator {
  validatePreExecutionForm(data: IPreExecutionConfigProps): IPreExecutionFormResult;
  validateConfigForm(data: IConfigsProps): IConfigFormResult;
  validateFinishExecutionForm(reason: string): string;
  validateUnderForestForm(underForest: string): string;
}
