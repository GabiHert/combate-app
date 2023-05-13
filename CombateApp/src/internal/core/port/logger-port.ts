export interface PLogger {
  info(...args: any): void;
  warn(...args: any): void;
  error(...args: any): void;
}
