import { ALogger } from '../../adapter/logger/logger-adapter';

export interface PLogger {
  info(...args: any): void;
  warn(...args: any): void;
  error(...args: any): void;
}

export const logger = new ALogger(true);
