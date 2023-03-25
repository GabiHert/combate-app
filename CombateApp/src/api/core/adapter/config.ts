import { IcreateIconProps } from 'native-base/lib/typescript/components/primitives/Icon/types';
import { defaultConfig } from 'native-base/lib/typescript/core/NativeBaseContext';
import { IConfigsProps } from '../../interface/config-props';
import { PConfig } from '../port/config-port';
import { PRepository } from '../port/repository-port';

export class AConfig implements PConfig {
  private cache: IConfigsProps;
  constructor(private repository: PRepository, def?: IConfigsProps) {
    this.cache = def;
    this.updateCache();
  }
  async update(config: IConfigsProps) {
    this.cache = config;
    const str = JSON.stringify(config);
    await this.repository.persist('CONFIG', str);
  }
  getCache(): IConfigsProps {
    return this.cache;
  }
  async updateCache(): Promise<void> {
    let str = await this.repository.get('CONFIG');
    if (!str) {
      this.update(this.cache);
      return;
    }
    const config = JSON.parse(str);
    //todo: validate config
    this.cache = config;
  }
}
