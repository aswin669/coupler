import { ErrorType, StatusCode } from '@constants';
import { ApiValidationErrorDetail } from '@types';

import { AppError } from './AppError';

export class BadRequestError extends AppError {
  constructor({
    message = 'Bad Request',
    code = StatusCode.BAD_REQUEST,
    type = ErrorType.BAD_REQUEST,
    additionalDetails,
    name = 'BadRequestError',
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
