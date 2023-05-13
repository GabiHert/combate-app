import { PCache } from '../../core/port/cache-port';
import { PLogger } from '../../core/port/logger-port';
import { PRepository } from '../../core/port/repository-port';
import { IPreExecutionConfigProps } from '../../interface/config-props';

export class APreExecutionConfigCache implements PCache<IPreExecutionConfigProps> {
  constructor(
    private readonly _logger: PLogger,
    private readonly repository: PRepository,
    private _cache?: IPreExecutionConfigProps,
    private readonly prefix = 'PRE_EXECUTION_CONFIG'
  ) {
    this.updateCache();
  }
  async update(config: IPreExecutionConfigProps) {
    try {
      this._logger.info({
        event: 'APreExecutionConfigCache.update',
        details: 'Process started',
        config,
      });

      this._cache = config;
      const str = JSON.stringify(config);
      await this.repository.persist(this.prefix, str);

      this._logger.info({
        event: 'APreExecutionConfigCache.update',
        details: 'Process finished',
      });
    } catch (err) {
      this._logger.error({
        event: 'APreExecutionConfigCache.update',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
  getCache(): IPreExecutionConfigProps {
    return this._cache;
  }
  async updateCache(): Promise<void> {
    try {
      this._logger.info({
        event: 'APreExecutionConfigCache.update',
        details: 'Process started',
        config: this._cache,
      });
      let str = await this.repository.get(this.prefix);
      if (!str) {
        this.update(this._cache);
        return;
      }
      const config = JSON.parse(str);
      //todo: validate config
      this._cache = config;
      this._logger.info({
        event: 'APreExecutionConfigCache.update',
        details: 'Process finished',
        config,
      });
    } catch (err) {
      this._logger.error({
        event: 'APreExecutionConfigCache.updateCache',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
}
