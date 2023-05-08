import { PError } from '../error/error-port';

export const timeout = (millis, promise, error: PError) => {
  const timeout = new Promise((resolve, reject) =>
    setTimeout(() => {
      reject(error);
    }, millis)
  );
  return Promise.race([promise, timeout]);
};
