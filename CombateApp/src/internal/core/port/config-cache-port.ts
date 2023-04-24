import { DEFAULT_CONFIG as DEFAULT_PROPERTIES } from '../../config/config';
import { IConfigsProps as IProperties } from '../../interface/config-props';
import { AConfigCache as ACache } from '../../adapter/cache/config-cache';
import { repository } from './repository-port';

export interface PCache {
  getCache(): IProperties;
  update(config: IProperties): Promise<void>;
  updateCache(): Promise<void>;
}

export const config: PCache = new ACache(repository, DEFAULT_PROPERTIES);
