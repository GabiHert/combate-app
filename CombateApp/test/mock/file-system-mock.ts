import { WriteFileErrorType } from '../../src/internal/core/error/error-type';
import { PFileSystem } from '../../src/internal/core/port/file-system-port';

export class FileSystemMock implements PFileSystem {
  writeCalled: number;
  writeCalledWith: Array<{ data: string; path: string }>;
  createCalled: number;
  writeError: string;
  clear() {
    this.writeError = undefined;
    this.writeCalled = 0;
    this.createCalled = 0;
    this.writeCalledWith = [];
  }
  async write(data: string, path: string): Promise<void> {
    this.writeCalledWith.push({ data, path });
    this.writeCalled++;
    if (this.writeError !== undefined) {
      throw new WriteFileErrorType(this.writeError);
    }
  }
  async create(path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
