import { PLogger } from '../../core/port/logger-port';

export class ALogger implements PLogger {
  constructor(private readonly active: boolean) {}
  info(...args: any): void {
    if (this.active) {
      console.log(JSON.stringify({ severity: 'INFO', ...args }));
      console.log('');
    }
  }
  warn(...args: any): void {
    if (this.active) {
      console.log(JSON.stringify({ severity: 'WARN', ...args }));
      console.log('');
    }
  }
  error(...args: any): void {
    if (this.active) {
      console.log({ severity: 'ERROR', ...args });
      console.log('');
    }
  }
}
