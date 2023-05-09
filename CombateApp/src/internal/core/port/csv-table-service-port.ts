import { RequestDto } from '../dto/request-dto';
import { ResponseDto } from '../dto/response-dto';
import { Event } from '../enum/event';

export interface PCsvTableService {
  insert(data: RequestDto, event: Event, path: string): { column: number; row: number };
  delete(line: number, row: number): void;
  save(): Promise<void>;
}
