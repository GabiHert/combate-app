import { RequestDto } from '../dto/request-dto';
import { ResponseDto } from '../dto/response-dto';

export interface PCsvTableService {
  insert(requestDto: RequestDto, responseDto: ResponseDto): { column: number; row: number };

  erase(line: number, row: number): void;

  save(path: string): Promise<void>;
}
