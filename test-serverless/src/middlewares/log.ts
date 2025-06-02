import { MiddlewareObj } from '@middy/core';
import { config } from '../config';
import pinoLogger from '../helpers/logger';

export const logEventContext: MiddlewareObj<any, any, Error, any, any> = {
  before: async (request) => {
    const { event, context } = request;

    // Add structured logging with context
    pinoLogger.info({
      message: 'Event context logged',
      functionName: context.functionName,
      stage: config.NODE_ENV || 'unknown',
      requestId: context.awsRequestId,
      ...(config.NODE_ENV === 'local' ? { event } : {}),
    });
  },
};
