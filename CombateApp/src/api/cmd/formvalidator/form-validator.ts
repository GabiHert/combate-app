import { IConfigFormResult } from '../../interface/config-form-result';
import { IPreExecutionConfigProps, IConfigsProps } from '../../interface/config-props';
import { IPreExecutionFormResult } from '../../interface/pre-execution-form-result';
import { PValidator as PFormValidator } from '../port/validator-port';

export class FormValidator implements PFormValidator {
  validatePreExecutionForm(data: IPreExecutionConfigProps): IPreExecutionFormResult {
    throw new Error('Method not implemented.');
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
