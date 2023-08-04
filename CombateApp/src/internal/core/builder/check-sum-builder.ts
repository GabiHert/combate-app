import { PLogger } from '../port/logger-port';

export class CheckSumBuilder {
  constructor(private readonly _logger: PLogger) {}
  build(str: string): string {
    this._logger.info({ event: 'CheckSumBuilder.build', details: 'Process started', str });
    let sum = 0;
    for (let i = 0; i < str.length; i++){
      sum += str.charCodeAt(i)
    };

    const csNumber = 256 - (sum % 256);
    const csString = String.fromCharCode(csNumber);

    this._logger.info({
      event: 'CheckSumBuilder.build',
      details: 'Process finished',
      csString,
      csNumber,
    });

    return csString;
  }
}
