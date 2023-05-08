import { PError } from '../error/error-port';
import { BluetoothErrorType } from '../error/error-type';

export const timeout = (millis, promise, error: PError) => {
  const timeout = new Promise((resolve, reject) =>
    setTimeout(() => {
      throw error;
    }, millis)
  );
  return Promise.race([promise, timeout]);
};
