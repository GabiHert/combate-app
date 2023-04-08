import { PRepository } from '../../core/port/repository-port';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AAsyncStorage implements PRepository {
  async get(key: string): Promise<any> {
    try {
      const item = await AsyncStorage.getItem(key);
      return item;
    } catch {}
  }
  async delete(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
    try {
    } catch {}
  }
  async persist(key: string, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch {}
  }
}
