import { IConfigsProps as IProperties } from '../../interface/config-props';
import { AConfigCache as ACache } from '../../adapter/cache/config-cache';

export interface PCache {
  getCache(): IProperties;
  update(config: IProperties): Promise<void>;
  updateCache(): Promise<void>;
}
