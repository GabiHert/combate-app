import { PLogger, logger } from '../port/logger-port';

export class CheckSumBuilder {
  constructor(private readonly _logger: PLogger) {}
  build(protocol: string): string {
    let sum = 0;
    for (let i = 0; i < protocol.length; i++) sum += protocol.charCodeAt(i);

    const csNumber = 256 - (sum % 256);
    const csString = String.fromCharCode(csNumber);

    return csString;
  }
}

export const checkSumBuilder = new CheckSumBuilder(logger);
