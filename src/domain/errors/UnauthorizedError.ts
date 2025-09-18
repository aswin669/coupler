import { ErrorType, StatusCode } from '@constants';
import { ApiValidationErrorDetail } from '@types';

import { AppError } from './AppError';

export class UnauthorizedError extends AppError {
  constructor({
    message = 'Unauthorized',
    code = StatusCode.UNAUTHORIZED,
    type = ErrorType.UNAUTHORIZED,
    name = 'UnauthorizedError',
    additionalDetails = {
      field: 'authorization',
      message: 'Missing or invalid authorization header',
    },
  }: {
    message?: string;
    code?: StatusCode;
    type?: ErrorType;
    name?: string;
    additionalDetails?: ApiValidationErrorDetail;
  }) {
    super({ message, code, type, additionalDetails, name });
  }
}
