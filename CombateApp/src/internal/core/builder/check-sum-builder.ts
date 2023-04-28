import { PLogger, logger } from '../port/logger-port';

export class CheckSumBuilder {
  constructor(private readonly _logger: PLogger) {}
  static Build(protocol: string): string {
    //todo: implement
    return '';
  }
}

export const checkSumBuilder = new CheckSumBuilder(logger);
