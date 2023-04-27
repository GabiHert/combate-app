import { DResponse } from '../dto/response-dto';
import { PRequest } from './request-port';

export interface PCbService {
  /**
   * Executes the dose request
   * @param doseRequest poison amount to be dosed and assigned applicators
   * @param callback callback function called after each dose response (only when Protocol >= V5)
   */
  request(request: PRequest, callback?: (done: number, target: number) => void): Promise<DResponse>;
}
