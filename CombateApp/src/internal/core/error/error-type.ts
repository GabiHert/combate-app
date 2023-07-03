import { PError } from './error-port';

export class BluetoothErrorType extends PError {
  constructor(message: string) {
    super(message, "001",true,true,false);
  }
}

export class ValidationErrorType extends PError {
  constructor(message: string) {
    super(message, "002",true,false,false);
  }
}

export class InvalidGpsDataErrorType extends PError {
  constructor(message: string) {
    super(message, "003",true,false,false);
  }
}

export class FileSystemErrorType extends PError {
  constructor(message: string) {
    super(message, "004",true,false,false);
  }
}

export class PermissionsErrorType extends PError {
  constructor(message: string) {
    super(message, "005",true,false,true);
  }
}


export class MaxVelocityErrorType extends PError {
  constructor(message: string) {
    super(message, "006",true,true,false);
  }
}