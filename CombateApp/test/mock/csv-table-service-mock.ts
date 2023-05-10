import { RequestDto } from '../../src/internal/core/dto/request-dto';
import { ResponseDto } from '../../src/internal/core/dto/response-dto';
import { Event } from '../../src/internal/core/enum/event';
import { WriteFileErrorType } from '../../src/internal/core/error/error-type';
import { PCsvTableService } from '../../src/internal/core/port/csv-table-service-port';

export class CsvTableServiceMock implements PCsvTableService {
  insertCalled: number;
  insertCalledWith: { requestDto: RequestDto; responseDto: ResponseDto; event: Event };
  eraseCalled: number;
  saveCalled: number;
  saveError: string;

  clear() {
    this.insertCalled = 0;
    this.insertCalledWith = undefined;
    this.eraseCalled = 0;
    this.saveCalled = 0;
    this.saveError = undefined;
  }

  insert(
    requestDto: RequestDto,
    responseDto: ResponseDto,
    event: Event
  ): { column: number; row: number } {
    this.insertCalled++;
    this.insertCalledWith = { requestDto, responseDto, event };

    return undefined;
  }
  erase(line: number, row: number): void {
    throw new Error('Method not implemented.');
  }
  async save(path: string): Promise<void> {
    this.saveCalled++;
    if (this.saveError) {
      throw new WriteFileErrorType(this.saveError);
    }
  }
}
