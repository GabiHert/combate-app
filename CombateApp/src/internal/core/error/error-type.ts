import { PError } from './error-port';

export class BluetoothErrorType extends PError {
  constructor(message: string) {
    super(message, 1);
  }
}

export class ValidationErrorType extends PError {
  constructor(message: string) {
    super(message, 3);
  }
}

export class InvalidGpsDataErrorType extends PError {
  constructor(message: string) {
    super(message, 3);
  }
}

export class RequestTimeoutErrorType extends PError {
  constructor(message: string) {
    super(message, 4);
  }
}

export class WriteFileErrorType extends PError {
  constructor(message: string) {
    super(message, 5);
  }
}
