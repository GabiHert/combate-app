import { IPreExecutionConfigProps } from '../../interface/config-props';

export interface PPreExecutionConfigCache {
  getCache(): IPreExecutionConfigProps;
  update(config: IPreExecutionConfigProps): Promise<void>;
  updateCache(): Promise<void>;
}
