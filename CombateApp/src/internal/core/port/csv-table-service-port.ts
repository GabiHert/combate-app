import { RequestDto } from '../dto/request-dto';
import { ResponseDto } from '../dto/response-dto';

export interface PCsvTableService {
  begin(path:string):Promise<void>

  insert(path:string,requestDto: RequestDto, responseDto: ResponseDto):Promise<void>

  create(path: string):Promise<void>;
}
