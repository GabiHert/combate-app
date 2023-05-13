export interface PCache<T> {
  getCache(): T;
  update(config: T): Promise<void>;
  updateCache(): Promise<void>;
}
