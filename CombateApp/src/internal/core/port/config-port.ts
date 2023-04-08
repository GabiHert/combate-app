import { DEFAULT_CONFIG } from '../../config/config';
import { IConfigsProps } from '../../interface/config-props';
import { AConfig } from '../../adapter/config/config';
import { repository } from './repository-port';

export interface PConfig {
  getCache(): IConfigsProps;
  update(config: IConfigsProps): Promise<void>;
  updateCache(): Promise<void>;
}

export const config: PConfig = new AConfig(repository, DEFAULT_CONFIG);
