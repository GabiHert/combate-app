import { AAsyncStorage } from '../../adapter/repository/async-storage-adapter';

export interface PRepository {
  get(key: string): Promise<any>;
  delete(key: string): Promise<void>;
  persist(key: string, value: string): Promise<void>;
}

export const repository: PRepository = new AAsyncStorage();
