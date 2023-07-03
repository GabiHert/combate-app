import { PError } from './error-port';



export class ValidationErrorType extends PError {
  constructor(message: string) {
    super(message, "001",true,false,false);
  }
}

export class DoseProcessTimeOut extends PError {
  constructor(message: string) {
    super(message, "002",true,true,true);
  }
}

export class GpsErrorType extends PError {
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

export class BluetoothErrorType extends PError {
  constructor(message: string) {
    super(message, "007",true,true,false);
  }
}

export class GenericErrorType extends PError {
  constructor(message: string) {
    super(message, "008",true,false,false);
  }
}