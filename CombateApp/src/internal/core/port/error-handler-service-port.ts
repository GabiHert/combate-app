import { PError } from '../error/error-port';

export interface PErrorHandlerService {
  handle(err: PError): Promise<void>;
  begin(filePath:string):void;
}
