import { RequestDto } from '../dto/request-dto';
import { ResponseDto } from '../dto/response-dto';
import { Event } from '../enum/event';

export interface PCsvTableService {
  insert(
    requestDto: RequestDto,
    responseDto: ResponseDto,
    event: Event
  ): { column: number; row: number };
  erase(line: number, row: number): void;
  save(path: string): Promise<void>;
}
