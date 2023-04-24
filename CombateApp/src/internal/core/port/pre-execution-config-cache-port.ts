import { DEFAULT_CONFIG, DEFAULT_PRE_EXECUTION_CONFIG } from '../../config/config';
import { IConfigsProps, IPreExecutionConfigProps } from '../../interface/config-props';
import { AConfigCache } from '../../adapter/cache/config-cache';
import { repository } from './repository-port';
import { APreExecutionConfigCache } from '../../adapter/cache/pre-execution-config-cache';

export interface PPreExecutionConfigCache {
  getCache(): IPreExecutionConfigProps;
  update(config: IPreExecutionConfigProps): Promise<void>;
  updateCache(): Promise<void>;
}

export const preExecutionConfig: PPreExecutionConfigCache = new APreExecutionConfigCache(
  repository,
  DEFAULT_PRE_EXECUTION_CONFIG
);
