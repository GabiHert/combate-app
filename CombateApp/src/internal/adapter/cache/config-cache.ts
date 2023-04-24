import { defaultConfig } from 'native-base/lib/typescript/core/NativeBaseContext';
import { IConfigsProps } from '../../interface/config-props';
import { PCache as PConfigCache } from '../../core/port/config-cache-port';
import { PRepository } from '../../core/port/repository-port';

export class AConfigCache implements PConfigCache {
  constructor(
    private repository: PRepository,
    private cache?: IConfigsProps,
    private prefix = 'CONFIG'
  ) {
    this.updateCache();
  }
  async update(config: IConfigsProps) {
    this.cache = config;
    const str = JSON.stringify(config);
    await this.repository.persist(this.prefix, str);
  }
  getCache(): IConfigsProps {
    return this.cache;
  }
  async updateCache(): Promise<void> {
    let str = await this.repository.get(this.prefix);
    if (!str) {
      this.update(this.cache);
      return;
    }
    const config = JSON.parse(str);
    //todo: validate config
    this.cache = config;
  }
}
