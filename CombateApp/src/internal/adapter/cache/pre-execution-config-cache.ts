import { IPreExecutionConfigProps } from '../../interface/config-props';
import { PRepository } from '../../core/port/repository-port';
import { PPreExecutionConfigCache as PPreExecutionCache } from '../../core/port/pre-execution-config-cache-port';

export class APreExecutionConfigCache implements PPreExecutionCache {
  constructor(
    private repository: PRepository,
    private cache?: IPreExecutionConfigProps,
    private prefix = 'PRE_EXECUTION_CONFIG'
  ) {
    this.updateCache();
  }
  async update(config: IPreExecutionConfigProps) {
    this.cache = config;
    const str = JSON.stringify(config);
    await this.repository.persist(this.prefix, str);
  }
  getCache(): IPreExecutionConfigProps {
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
