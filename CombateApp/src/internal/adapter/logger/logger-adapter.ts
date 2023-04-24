import { PLogger } from '../../core/port/logger-port';

export class ALogger implements PLogger {
  constructor(private readonly active: boolean) {}
  info(...args: any): void {
    if (this.active) {
      console.log({ severity: 'INFO', ...args });
    }
  }
  warn(...args: any): void {
    if (this.active) {
      console.log({ severity: 'WARN', ...args });
    }
  }
  error(...args: any): void {
    if (this.active) {
      console.log({ severity: 'ERROR', ...args });
    }
  }
}
