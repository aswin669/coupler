import { ErrorType, StatusCode } from '@constants';
import { ApiValidationErrorDetail } from '@types';

import { AppError } from './AppError';

export class NotFoundError extends AppError {
  constructor({
    message = 'Resource not found',
    code = StatusCode.NOT_FOUND,
    type = ErrorType.RESOURCE_NOT_FOUND,
    additionalDetails,
    name = 'NotFoundError',
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
