import { ErrorType, StatusCode } from '@constants';
import { ZodIssue } from 'zod';

export class ValidationError extends Error {
  public readonly type: ErrorType;
  public readonly code: StatusCode;
  public readonly message: string;
  public readonly issues: ZodIssue[];
  public readonly isOperational: boolean;

  constructor(issues: ZodIssue[], message = 'Validation failed') {
    super(ErrorType.VALIDATION_ERROR);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'ValidationError';
    this.type = ErrorType.VALIDATION_ERROR;
    this.message = message;
    this.code = StatusCode.BAD_REQUEST;
    this.issues = issues;
    this.isOperational = true;
    Error.captureStackTrace(this);
  }
}
