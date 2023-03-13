import { IcreateIconProps } from 'native-base/lib/typescript/components/primitives/Icon/types';
import { IConfigsProps } from '../../interface/config-props';
import { PConfig } from '../port/config-port';
import { PRepository } from '../port/repository-port';

export class AConfig implements PConfig {
  private cache: IConfigsProps;
  constructor(private repository: PRepository, initialConfig: IConfigsProps) {
    this.cache = initialConfig;
  }
  async update(config: IConfigsProps) {
    this.cache = config;
    const str = JSON.stringify(config);
    await this.repository.persist('CONFIG', str);
  }
  get(): IConfigsProps {
    return this.cache;
  }
}
