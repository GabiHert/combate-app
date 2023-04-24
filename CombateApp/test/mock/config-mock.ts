import { PConfig } from '../../src/internal/core/port/config-port';
import { IConfigsProps } from '../../src/internal/interface/config-props';

export class ConfigMock implements PConfig {
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
