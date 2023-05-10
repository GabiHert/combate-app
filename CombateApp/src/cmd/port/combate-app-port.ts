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
   * Sets file path to the csv file. This method creates the file
   * @param path path to the csv file
   */
  setFilePath(path: string): Promise<void>;
}
