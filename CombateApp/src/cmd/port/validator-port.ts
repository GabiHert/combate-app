import { IConfigFormResult } from "../../internal/interface/config-form-result";
import {
  IConfigsProps,
  IPreExecutionConfigProps,
} from "../../internal/interface/config-props";
import { IPreExecutionFormResult } from "../../internal/interface/pre-execution-form-result";

export interface PValidator {
  /**
   *
   * @param data configuration to be validated
   * @return an error message to each invalid field
   */
  validatePreExecutionForm(
    data: IPreExecutionConfigProps
  ): IPreExecutionFormResult;

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

  /**
   *
   * @param stopReason configuration to be validated
   * @return an error message if stopReason is invalid
   */
  validateStopReasonForm(stopReason: string): string;

  /**
   *
   * @param plot configuration to be validated
   * @return an error message if plot is invalid
   */
  validatePlotForm(plot: string): string;

  /**
   *
   * @param farm configuration to be validated
   * @return an error message if farm is invalid
   */
  validateFarmForm(farm: string): string;

  /**
   *
   * @param event configuration to be validated
   * @return an error message if event is invalid
   */
  validateEventForm(event: string): string;
}
