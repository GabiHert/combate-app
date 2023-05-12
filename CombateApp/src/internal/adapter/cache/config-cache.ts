import { IConfigsProps } from '../../interface/config-props';
import { PCache } from '../../core/port/config-cache-port';
import { PRepository } from '../../core/port/repository-port';
import { PLogger } from '../../core/port/logger-port';

export class AConfigCache implements PCache {
  constructor(
    private readonly _logger: PLogger,
    private repository: PRepository,
    private _cache?: IConfigsProps,
    private prefix = 'CONFIG'
  ) {
    this.updateCache();
  }
  async update(config: IConfigsProps) {
    try {
      this._logger.info({
        event: 'AConfigCache.update',
        details: 'Process started',
        config,
      });

      this._cache = config;
      const str = JSON.stringify(config);
      await this.repository.persist(this.prefix, str);

      this._logger.info({
        event: 'AConfigCache.update',
        details: 'Process finished',
      });
    } catch (err) {
      this._logger.error({
        event: 'AConfigCache.update',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
  getCache(): IConfigsProps {
    return this._cache;
  }
  async updateCache(): Promise<void> {
    try {
      this._logger.info({
        event: 'AConfigCache.update',
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
        event: 'AConfigCache.update',
        details: 'Process finished',
        config,
      });
    } catch (err) {
      this._logger.error({
        event: 'AConfigCache.updateCache',
        details: 'Process error',
        error: err.message,
      });

      throw err;
    }
  }
}
