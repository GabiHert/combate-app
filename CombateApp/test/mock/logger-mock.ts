import { PLogger } from "../../src/internal/core/port/logger-port";

export class LoggerMock implements PLogger {
  infoCalled: number;
  warnCalled: number;
  errorCalled: number;
  constructor() {}
  clear(): void {
    this.infoCalled = 0;
    this.warnCalled = 0;
    this.errorCalled = 0;
  }

  info(...args: any): void {
    this.infoCalled++;
  }
  warn(...args: any): void {
    this.warnCalled++;
  }
  error(...args: any): void {
    this.errorCalled++;
  }
}
