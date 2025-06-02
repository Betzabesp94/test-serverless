import { MiddlewareObj } from '@middy/core';
import { BaseLogicError } from '../common/error-codes/codes';
import { StatusCodes } from 'http-status-codes';
import { config } from '../config';
import { EnvStages } from '../config/types';

export const errorMiddleware: MiddlewareObj = {
  onError: async (request) => {
    const { error } = request;
    console.error('Error in errorMiddleware:', error);

    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';
    let appCode = 'UNEXPECTED_ERROR';

    if (error instanceof BaseLogicError) {
      statusCode = error.status;
      appCode = error.code;
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    const isNotProductionDeploy = config.NODE_ENV !== EnvStages.PROD;
    const formattedMessage = isNotProductionDeploy ? message : '';

    return {
      statusCode,
      body: JSON.stringify({
        error: StatusCodes[statusCode] || 'Internal Server Error',
        message: formattedMessage,
        appCode,
      }),
    };
  },
};
