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

      await RNFS.writeFile(fileName, data, 'utf8');

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
  create(path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
