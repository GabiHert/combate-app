import { IConfigsProps } from '../../interface/config-props';

export interface PConfig {
  getCache(): IConfigsProps;
  update(config: IConfigsProps): Promise<void>;
}
