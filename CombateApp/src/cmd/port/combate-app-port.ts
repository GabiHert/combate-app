import { RequestDto } from "../../internal/core/dto/request-dto";
import { ResponseDto } from "../../internal/core/dto/response-dto";

export interface PCombateApp {
  /**
   * Requests CB to start a task
   * @param requestDto request to be decoded and sent
   */
  request(requestDto: RequestDto): Promise<ResponseDto>;
  /**
   * Starts the combateApp with it`s basic information
   * this method must be called before `request`
   * @param filePath path to the csv file
   * @param systematicMetersBetweenDose
   * @param doseCallback callback function to be executed after each dose
   */
  begin(
    filePath: string,
    systematicMetersBetweenDose: number,
    doseCallback?: (done: number, target: number) => void
  ): Promise<void>;

  permissions(): Promise<void>;
}
