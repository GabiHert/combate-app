import { PCache } from '../../src/internal/core/port/cache-port';
import { IConfigsProps } from '../../src/internal/interface/config-props';

export class ConfigMock implements PCache {
  [x: string]: {};
  cache: IConfigsProps;
  getCache(): IConfigsProps {
    return this.cache;
  }
  update(config: IConfigsProps): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateCache(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
