import { RequestDto } from '../dto/request-dto';

export interface PRequest {
  /**
   * @return a protocol representation of the request
   */
  toProtocol(): string;

  /**
   * Self validation of the request
   * @throws ValidationError
   */
  validate(): void;

  /**
   * Sets and validates requestDto
   * @throws ValidationError
   */
  setRequestDto(requestDto: RequestDto): void;

  getRequestDto(): RequestDto;
}
