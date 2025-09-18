import { ErrorType, StatusCode } from '@constants';
import { ApiValidationErrorDetail } from '@types';

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly code: StatusCode;
  public readonly message: string;
  public readonly additionalDetails?: ApiValidationErrorDetail | Record<string, string>;
  public readonly isOperational: boolean;

  constructor({
    message,
    code = StatusCode.BAD_REQUEST,
    type = ErrorType.FORBIDDEN,
    additionalDetails,
    name = 'AppError',
  }: {
    message: string;
    code?: StatusCode;
    type?: ErrorType;
    additionalDetails?: ApiValidationErrorDetail | Record<string, string>;
    name?: string;
  }) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.message = message;
    this.type = type;
    this.code = code;
    this.additionalDetails = additionalDetails;
    this.isOperational = true;
    Error.captureStackTrace(this);
  }
}
