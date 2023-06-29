import * as RNFS from 'react-native-fs';
import { PFileSystem } from '../../core/port/file-system-port';
import { PLogger } from '../../core/port/logger-port';

export class AFileSystem implements PFileSystem {
  constructor(private readonly _logger: PLogger) {}
  async write(data: string, fileName: string): Promise<void> {
    try {
      fileName = RNFS.DownloadDirectoryPath + '/' + fileName;

      this._logger.info({
        event: 'AFileSystem.write',
        details: 'Process started',
        data,
        path: fileName,
      });

      await RNFS.write(fileName, data);
      
      this._logger.info({ event: 'AFileSystem.write', details: 'Process finished' });
    } catch (err) {
      this._logger.error({
        event: 'AFileSystem.write',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }
  }
  async create(fileName: string): Promise<void> {
    try {
      fileName = RNFS.DownloadDirectoryPath + '/' + fileName;

      this._logger.info({
        event: 'AFileSystem.create',
        details: 'Process started',
        path: fileName,
      });

      await RNFS.writeFile(fileName,"");

      this._logger.info({ event: 'AFileSystem.create', details: 'Process finished' });
    } catch (err) {
      this._logger.error({
        event: 'AFileSystem.create',
        details: 'Process error',
        error: err.message,
      });
      throw err;
    }

  }
}
