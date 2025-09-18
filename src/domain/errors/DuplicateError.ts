import { ErrorType, StatusCode } from '@constants';
import { ApiValidationErrorDetail, DuplicateErrorDetail } from '@types';

import { AppError } from './AppError';

export class DuplicateError extends AppError {
  constructor({
    message = 'Duplicate entry found',
    code = StatusCode.CONFLICT,
    type = ErrorType.DUPLICATE_ENTRY,
    additionalDetails,
    name = 'DuplicateError',
  }: {
    message?: string;
    code?: StatusCode;
    type?: ErrorType;
    name?: string;
    additionalDetails?: ApiValidationErrorDetail | DuplicateErrorDetail;
  }) {
    super({ message, code, type, additionalDetails, name });
  }
}
