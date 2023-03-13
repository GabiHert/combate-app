import { IConfigsProps } from '../../interface/config-props';

export interface PConfig {
  get(): IConfigsProps;
  update(config: IConfigsProps): Promise<void>;
}
