import { RequestDto } from '../../internal/core/dto/request-dto';

export interface PCombateApp {
  /**
   * Requests CB to start a task
   * @param requestDto request to be decoded and sent
   */
  request(requestDto: RequestDto): Promise<void>;

  /**
   * Function to be executed when a dose is finished
   * @param callback callback function
   */
  setDoseCallback(callback: (done: number, target: number) => void): void;

  /**
   * Makes a request to identify the CB protocol version
   *
   */
  syncProtocolVersion(): Promise<void>;
}
