export interface PFileSystem {
  write(data: string, path: string): Promise<void>;
  create(path: string): Promise<void>;
}
