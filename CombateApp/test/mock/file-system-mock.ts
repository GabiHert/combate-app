import { PFileSystem } from '../../src/internal/core/port/file-system-port';

export class FileSystemMock implements PFileSystem {
  writeCalled: number;
  writeCalledWith: Array<{ data: string; path: string }>;
  createCalled: number;
  clear() {
    this.writeCalled = 0;
    this.createCalled = 0;
    this.writeCalledWith = [];
  }
  async write(data: string, path: string): Promise<void> {
    this.writeCalledWith.push({ data, path });
    this.writeCalled++;
  }
  async create(path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
