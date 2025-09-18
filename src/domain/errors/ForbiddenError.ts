import { ErrorType, StatusCode } from '@constants';
import { ApiValidationErrorDetail } from '@types';

import { AppError } from './AppError';

export class ForbiddenError extends AppError {
  constructor({
    message = 'Access to this resource on the server is denied!',
    code = StatusCode.FORBIDDEN,
    type = ErrorType.FORBIDDEN,
    name = 'ForbiddenError',
    additionalDetails = {
      field: 'role',
      message: 'You do not have permission to perform this action.',
    },
  }: {
    message?: string;
    code?: StatusCode;
    type?: ErrorType;
    name?: string;
    additionalDetails?: ApiValidationErrorDetail;
  } = {}) {
    super({ message, code, type, name, additionalDetails });
  }
}
