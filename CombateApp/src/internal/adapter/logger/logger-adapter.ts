import { PLogger } from '../../core/port/logger-port';

export class ALogger implements PLogger {
  constructor(private readonly active: boolean, private readonly id?: string) {}
  info(...args: any): void {
    if (this.active) {
      console.log({ id: this.id, severity: 'INFO', ...args });
    }
  }
  warn(...args: any): void {
    if (this.active) {
      console.log({ id: this.id, severity: 'WARN', ...args });
    }
  }
  error(...args: any): void {
    if (this.active) {
      console.log({ id: this.id, severity: 'ERROR', ...args });
    }
  }
}
