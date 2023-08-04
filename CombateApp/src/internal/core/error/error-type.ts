import { RequestDto } from '../dto/request-dto';
import { ResponseDto } from '../dto/response-dto';
import { PError } from './error-port';




export class ValidationErrorType extends PError {
  constructor(message: string,requestDto?:RequestDto,responseDto?:ResponseDto) {
    super("Erro Validação",message, "001",true,false,false,responseDto,requestDto);
  }
}

export class DoseProcessTimeOut extends PError {
  constructor(message: string,requestDto?:RequestDto,responseDto?:ResponseDto) {
    super("Erro Dose",message, "002",true,true,true,responseDto,requestDto);
  }
}

export class GpsErrorType extends PError {
  constructor(message: string,requestDto?:RequestDto,responseDto?:ResponseDto) {
    super("Erro GPS",message, "003",true,false,false,responseDto,requestDto);
  }
}

export class FileSystemErrorType extends PError {
  constructor(message: string,requestDto?:RequestDto,responseDto?:ResponseDto) {
    super("Erro Arquivo",message, "004",true,false,false,responseDto,requestDto);
  }
}

export class PermissionsErrorType extends PError {
  constructor(message: string,requestDto?:RequestDto,responseDto?:ResponseDto) {
    super("Erro Permissão",message, "005",true,false,true,responseDto,requestDto);
  }
}

export class MaxVelocityErrorType extends PError {
  constructor(message: string,requestDto?:RequestDto,responseDto?:ResponseDto) {
    super("Velocidade maxima atingida",message, "006",true,true,false,responseDto,requestDto);
  }
}

export class BluetoothErrorType extends PError {
  constructor(message: string,requestDto?:RequestDto,responseDto?:ResponseDto) {
    super("Bluetooth",message, "007",true,false,false,responseDto,requestDto);
  }
}

export class GenericErrorType extends PError {
  constructor(message: string,requestDto?:RequestDto,responseDto?:ResponseDto) {
    super("Genérico",message, "008",true,false,false,responseDto,requestDto);
  }
}
