import { ErrorType, StatusCode } from '@constants';

import { AppError } from './AppError';

export class InternalServerError extends AppError {
  constructor({
    message = 'Internal Server Error',
    code = StatusCode.SERVER_ERROR,
    type = ErrorType.INTERNAL_SERVER_ERROR,
    name = 'InternalServerError',
  }: {
    message?: string;
    code?: StatusCode;
    type?: ErrorType;
    name?: string;
  } = {}) {
    super({ message, code, type, name });
  }
}
