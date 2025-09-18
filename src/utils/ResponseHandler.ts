import { ErrorType, StatusCode } from '@constants';
import {
  AppError,
  BadRequestError,
  DuplicateError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '@domain/errors';
import { Prisma } from '@prisma/client';
import type { ApiErrorDetail, ApiErrorResponse, ApiSuccessResponse, ApiValidationErrorDetail } from '@types';
import { FastifyError, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

export class ResponseHandler {
  static success<T>(
    reply: FastifyReply,
    data: T,
    message: string = 'Operation successful',
    code: StatusCode = StatusCode.SUCCESS,
  ): FastifyReply {
    const response: ApiSuccessResponse<T> = {
      status: 'success',
      code,
      data,
      message,
      error: null,
    };
    reply.log.info(`Response data: ${JSON.stringify(response)}`);
    return reply.status(code).send(response);
  }

  static unauthorized(reply: FastifyReply, message: string = 'Unauthorized'): FastifyReply {
    const response: ApiErrorResponse = {
      status: 'error',
      code: StatusCode.UNAUTHORIZED,
      message,
      error: {
        type: ErrorType.UNAUTHORIZED,
        details: null,
      },
      data: null,
    };
    reply.log.error(`Response error: ${JSON.stringify(response)}`);
    return reply.status(StatusCode.UNAUTHORIZED).send(response);
  }

  static error(reply: FastifyReply, error?: Error): FastifyReply {
    reply.log.error(error);

    let code = StatusCode.SERVER_ERROR;
    let response: ApiErrorResponse;

    if (error) {
      if (error.name === 'ValidationError' || error.name === 'ZodError') {
        const customError = error as ValidationError | ZodError;
        if (error.name === 'ValidationError') {
          code = (error as ValidationError).code || StatusCode.BAD_REQUEST;
        } else {
          code = StatusCode.BAD_REQUEST;
        }

        const details: ApiValidationErrorDetail[] = customError.issues.map((i) => ({
          field: i.path.join('.'),
          message: i.message,
        }));
        response = {
          status: 'error',
          code,
          message: customError.message,
          error: {
            type: ErrorType.VALIDATION_ERROR,
            details,
          },
          data: null,
        };
      } else if (
        (error as FastifyError).code === ErrorType.FST_ERR_VALIDATION ||
        (error as FastifyError).code === ErrorType.FST_ERR_NOT_FOUND
      ) {
        const fastifyError = error as FastifyError;
        const errorMessage =
          fastifyError.code === ErrorType.FST_ERR_VALIDATION ? 'Validation failed' : 'Resource not found';
        code = fastifyError.code === ErrorType.FST_ERR_VALIDATION ? StatusCode.BAD_REQUEST : StatusCode.NOT_FOUND;
        const type =
          fastifyError.code === ErrorType.FST_ERR_VALIDATION
            ? ErrorType.VALIDATION_ERROR
            : ErrorType.RESOURCE_NOT_FOUND;
        const details: ApiErrorDetail[] = fastifyError.validation
          ? fastifyError.validation.map((v) => ({
              field:
                v.instancePath.replace(/^\//, '').replace(/\//g, '.') || (v.params?.missingProperty as string) || '',
              message: v.message ?? errorMessage,
            }))
          : [];
        response = {
          code,
          status: 'error',
          message: errorMessage,
          error: {
            type,
            details,
          },
          data: null,
        };
      } else if (
        error.name === 'UnauthorizedError' ||
        error.name === 'DuplicateError' ||
        error.name === 'NotFoundError' ||
        error.name === 'AppError' ||
        error.name === 'BadRequestError' ||
        error.name === 'ForbiddenError' ||
        error.name === 'InternalServerError'
      ) {
        const customError = error as
          | UnauthorizedError
          | DuplicateError
          | NotFoundError
          | AppError
          | BadRequestError
          | ForbiddenError
          | InternalServerError;
        code = customError.code || StatusCode.BAD_REQUEST;
        response = {
          status: 'error',
          code: customError.code,
          message: customError.message,
          error: {
            type: customError.type,
            details: customError.additionalDetails ?? null,
          },
          data: null,
        };
      } else if (error.name === 'SyntaxError') {
        code = StatusCode.BAD_REQUEST;
        response = {
          status: 'error',
          code,
          message: 'Invalid JSON payload',
          error: {
            type: 'JsonParseError',
            details: {
              field: null,
              message: error.message,
            },
          },
          data: null,
        };
      } else if (error.name === 'TypeError') {
        code = code || StatusCode.SERVER_ERROR;
        response = {
          status: 'error',
          code,
          message: `A type error occurred during request processing, error: ${error.message}`,
          error: {
            type: ErrorType.UNKNOWN_ERROR,
            details: {
              field: null,
              message: error.message,
            },
          },
          data: null,
        };
      } else if (error.name === 'PrismaClientKnownRequestError') {
        const prismaError = error as Prisma.PrismaClientKnownRequestError;
        switch (prismaError.code) {
          case 'P2002':
            code = StatusCode.CONFLICT;
            response = {
              status: 'error',
              code,
              message: 'Unique constraint failed',
              error: {
                type: ErrorType.DUPLICATE_ENTRY,
                details: {
                  field: null,
                  message: prismaError.message,
                },
              },
              data: null,
            };
            break;
          case 'P2025':
            code = StatusCode.NOT_FOUND;
            response = {
              status: 'error',
              code,
              message: 'Record not found',
              error: {
                type: ErrorType.RESOURCE_NOT_FOUND,
                details: {
                  field: null,
                  message: prismaError.message,
                },
              },
              data: null,
            };
            break;
          case 'P2003':
            code = StatusCode.BAD_REQUEST;
            response = {
              status: 'error',
              code,
              message: 'Foreign key constraint failed',
              error: {
                type: ErrorType.RESOURCE_NOT_FOUND,
                details: {
                  field: null,
                  message: prismaError.message,
                },
              },
              data: null,
            };
            break;
          // Add others as needed
          default:
            code = StatusCode.SERVER_ERROR;
            response = {
              status: 'error',
              code,
              message: `Database error: ${prismaError.code}`,
              error: {
                type: ErrorType.RESOURCE_NOT_FOUND,
                details: {
                  field: null,
                  message: prismaError.message,
                },
              },
              data: null,
            };
            break;
        }
      } else {
        response = {
          status: 'error',
          code: code,
          message: error.message || 'Something went wrong',
          error: {
            type: error.name || ErrorType.INTERNAL_SERVER_ERROR,
            details: {},
          },
          data: null,
        };
      }
    } else {
      response = {
        status: 'error',
        code: code,
        message: 'Something went wrong',
        error: {
          type: ErrorType.INTERNAL_SERVER_ERROR,
          details: {},
        },
        data: null,
      };
    }

    return reply.status(code).send(response);
  }
}
