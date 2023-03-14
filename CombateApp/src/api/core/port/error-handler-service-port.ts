export interface PErrorHandlerService {
  handle(err: any): Promise<void>;
}
