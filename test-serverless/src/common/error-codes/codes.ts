import { StatusCodes } from 'http-status-codes';

export enum ErrorCodes {
  /*   
  This list provides a centralized way to manage error codes and their 
  corresponding HTTP status codes and messages.
  It's important to try to use the standard and well-known error codes 
  for most cases and just create custom error codes for specific cases 
  like business logic errors or application-specific errors.
  This way, the error handling becomes more consistent and easier to
  maintain.

  To Create a new error code, follow these steps:
  1. Add a new entry in the ErrorCodes enum with a descriptive name.
  2. Add a corresponding entry in the ErrorConfig object with the appropriate status code and message.
  3. If necessary, update the BaseLogicError class to handle the new error code.
  4. Ensure that the error code is used consistently throughout the application.
   */

  // Common HTTP error codes
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',
  BAD_REQUEST = 'BAD_REQUEST',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
  CONFLICT = 'CONFLICT',
  GONE = 'GONE',
  PAYLOAD_TOO_LARGE = 'PAYLOAD_TOO_LARGE',
  URI_TOO_LONG = 'URI_TOO_LONG',
  UNSUPPORTED_MEDIA_TYPE = 'UNSUPPORTED_MEDIA_TYPE',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_GATEWAY = 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',

  // Custom error codes | Business Rules errors
  // Generic business rule error
  BUSINESS_RULE_ERROR = 'BUSINESS_RULE_ERROR',
  /* Add specific business rule errors here if needed 
  to map to certain frontend message errors
Example: 
  INFUCICIENT_SERVICES_TO_ACTIVATE_PLAN = 'INFUCICIENT_SERVICES_TO_ACTIVATE_PLAN',
  INSUFICIENT_PRODUCTS_TO_ACTIVATE_PLAN = 'INSUFICIENT_PRODUCTS_TO_ACTIVATE_PLAN',
  */
}

// Centralized error configuration
export const ErrorConfig = {
  [ErrorCodes.UNAUTHORIZED]: {
    status: StatusCodes.UNAUTHORIZED,
    message: 'Unauthorized',
  },
  [ErrorCodes.NOT_FOUND]: {
    status: StatusCodes.NOT_FOUND,
    message: 'Not Found',
  },
  [ErrorCodes.FORBIDDEN]: {
    status: StatusCodes.FORBIDDEN,
    message: 'Forbidden',
  },
  [ErrorCodes.BAD_REQUEST]: {
    status: StatusCodes.BAD_REQUEST,
    message: 'Bad Request',
  },
  [ErrorCodes.METHOD_NOT_ALLOWED]: {
    status: StatusCodes.METHOD_NOT_ALLOWED,
    message: 'Method Not Allowed',
  },
  [ErrorCodes.REQUEST_TIMEOUT]: {
    status: StatusCodes.REQUEST_TIMEOUT,
    message: 'Request Timeout',
  },
  [ErrorCodes.CONFLICT]: { status: StatusCodes.CONFLICT, message: 'Conflict' },
  [ErrorCodes.GONE]: { status: StatusCodes.GONE, message: 'Gone' },
  [ErrorCodes.PAYLOAD_TOO_LARGE]: {
    status: StatusCodes.REQUEST_TOO_LONG,
    message: 'Payload Too Large',
  },
  [ErrorCodes.URI_TOO_LONG]: {
    status: StatusCodes.REQUEST_URI_TOO_LONG,
    message: 'URI Too Long',
  },
  [ErrorCodes.UNSUPPORTED_MEDIA_TYPE]: {
    status: StatusCodes.UNSUPPORTED_MEDIA_TYPE,
    message: 'Unsupported Media Type',
  },
  [ErrorCodes.TOO_MANY_REQUESTS]: {
    status: StatusCodes.TOO_MANY_REQUESTS,
    message: 'Too Many Requests',
  },
  [ErrorCodes.INTERNAL_SERVER_ERROR]: {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error',
  },
  [ErrorCodes.BAD_GATEWAY]: {
    status: StatusCodes.BAD_GATEWAY,
    message: 'Bad Gateway',
  },
  [ErrorCodes.SERVICE_UNAVAILABLE]: {
    status: StatusCodes.SERVICE_UNAVAILABLE,
    message: 'Service Unavailable',
  },
  [ErrorCodes.BUSINESS_RULE_ERROR]: {
    status: StatusCodes.FORBIDDEN,
    message: 'Business Logic Error',
  },
};

// Base error class
export class BaseLogicError extends Error {
  public readonly code: ErrorCodes;
  public readonly status: number;

  constructor(code: ErrorCodes, message?: string) {
    super(message || ErrorConfig[code]?.message || 'An error occurred');
    this.code = code;
    this.status =
      ErrorConfig[code]?.status || StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
