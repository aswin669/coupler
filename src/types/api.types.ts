import { ErrorType, StatusCode } from '@constants';

export type ApiResponseStatus = 'success' | 'error' | 'pending';

export interface ApiErrorDetail {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface ApiError {
  type: string;
  details: ApiErrorDetail | ApiErrorDetail[] | null;
}

export interface ApiMetadata {
  total?: number | null;
  limit?: number | null;
  offset?: number | null;
  next?: string | null;
  previous?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allows for additional metadata properties
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  status: ApiResponseStatus;
  code: number;
  message: string | null;
  data: T | null;
  error: ApiError | null;
  // metadata: ApiMetadata | null;
}

// Specific type for validation errors with details as an array of field-message objects
export interface ApiValidationErrorDetail {
  field: string;
  message: string;
}

export interface DuplicateErrorDetail extends ApiValidationErrorDetail {
  duplicates: Array<{ field: string; value: string; name: string }>;
}

export interface ApiValidationErrorResponse extends ApiResponse<null> {
  status: 'error';
  code: StatusCode.BAD_REQUEST;
  error: {
    type: ErrorType.VALIDATION_ERROR;
    details: ApiValidationErrorDetail[];
  };
}

// Type alias for a successful API response with data
export type ApiSuccessResponse<T> = Omit<ApiResponse<T>, 'status' | 'code' | 'error'> & {
  status: 'success';
  code?: number; // Typically 2xx
  error: null;
};

// Type alias for a general error API response
export type ApiErrorResponse = Omit<ApiResponse<null>, 'status' | 'code' | 'data'> & {
  status: 'error';
  code?: number; // Typically 4xx or 5xx
  data: null;
};

// Type alias for a pending API response
export type ApiPendingResponse = Omit<ApiResponse<null>, 'status' | 'code' | 'data'> & {
  status: 'pending';
  code?: number; // Typically 202
  data: null;
  error: null;
};
