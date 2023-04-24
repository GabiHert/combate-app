import { PError } from './error-port';

export class BluetoothErrorType implements PError {
  constructor(message: string) {
    this.message = message;
  }
  message: string;
  readonly errorCode: number = 1;
}
