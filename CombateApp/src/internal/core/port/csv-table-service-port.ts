import { ResponseDto } from '../dto/response-dto';
import { Event } from '../enum/event';

export interface PCsvTableService {
  insert(data: ResponseDto, event: Event);
}
