import { composeHandler } from '../../middlewares/compose';
import { lambdaErrorHandler } from '../../helpers/error';
import { lambdaResponse } from '../../helpers/response';
import { logEventContext } from '../../middlewares/log';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { logger } from '@baselime/lambda-logger';

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
) => {
  try {
    const path = event.rawPath;

    if (path === '/') {
      logger.info('Handling root path');
      return lambdaResponse(200, {
        message: 'Hello from root Betza!',
      });
    }

    if (path === '/hello') {
      logger.info('Handling /hello path');
      return lambdaResponse(200, {
        message: 'Hello from path!',
      });
    }

    logger.warn('Path not found');
    return lambdaResponse(404, {
      error: 'Not Found',
    });
  } catch (err) {
    logger.error('Error in handler', err as Error);
    return lambdaErrorHandler(err);
  }
};

export const lambdaHandler = composeHandler(logEventContext(), handler);
