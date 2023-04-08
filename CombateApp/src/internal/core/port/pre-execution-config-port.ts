import { DEFAULT_CONFIG, DEFAULT_PRE_EXECUTION_CONFIG } from '../../config/config';
import { IConfigsProps, IPreExecutionConfigProps } from '../../interface/config-props';
import { AConfig } from '../../adapter/config/config';
import { repository } from './repository-port';
import { APreExecutionConfig } from '../../adapter/config/pre-execution-config';

export interface PPreExecutionConfig {
  getCache(): IPreExecutionConfigProps;
  update(config: IPreExecutionConfigProps): Promise<void>;
  updateCache(): Promise<void>;
}

export const preExecutionConfig: PPreExecutionConfig = new APreExecutionConfig(
  repository,
  DEFAULT_PRE_EXECUTION_CONFIG
);
