export interface PRepository {
  get(key: string): Promise<any>;
  delete(key: string): Promise<void>;
  persist(key: string, value: string): Promise<void>;
}
