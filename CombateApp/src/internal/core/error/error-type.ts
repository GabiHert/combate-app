import { PError } from './error-port';

export class BluetoothErrorType extends PError {
  constructor(message: string) {
    super(message, 1);
  }
}

export class ValidationErrorType extends PError {
  constructor(message: string) {
    super(message, 1);
  }
}
