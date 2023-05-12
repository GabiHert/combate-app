import { PRepository } from '../../core/port/repository-port';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLogger } from '../../core/port/logger-port';

export class AAsyncStorage implements PRepository {
  constructor(private readonly _logger: PLogger) {}
  async get(key: string): Promise<any> {
    try {
      this._logger.info({ event: 'AAsyncStorage.get', details: 'Process started', key });
      const item = await AsyncStorage.getItem(key);
      this._logger.info({ event: 'AAsyncStorage.get', details: 'Process started', item });

      return item;
    } catch (err) {
      this._logger.error({
        event: 'AAsyncStorage.get',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }
  async delete(key: string): Promise<void> {
    try {
      this._logger.info({ event: 'AAsyncStorage.delete', details: 'Process started', key });

      await AsyncStorage.removeItem(key);

      this._logger.info({ event: 'AAsyncStorage.delete', details: 'Process started' });
    } catch (err) {
      this._logger.error({
        event: 'AAsyncStorage.delete',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }
  async persist(key: string, value: any): Promise<void> {
    try {
      this._logger.info({ event: 'AAsyncStorage.persist', details: 'Process started', key, value });

      await AsyncStorage.setItem(key, value);

      this._logger.info({ event: 'AAsyncStorage.persist', details: 'Process started' });
    } catch (err) {
      this._logger.error({
        event: 'AAsyncStorage.persist',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }
}
