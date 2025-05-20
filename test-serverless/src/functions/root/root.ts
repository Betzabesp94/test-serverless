import { lambdaResponse } from '../../helpers/response';
import { logEventContext } from '../../middlewares/log';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { logger } from '@baselime/lambda-logger';
import middy from '@middy/core';
import { errorMiddleware } from '../../middlewares/errorHandler';
import { BaseLogicError, ErrorCodes } from '../../common/error-codes/codes';

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
) => {
  const path = event.rawPath;

  if (path === '/') {
    logger.info('Handling root path');
    return lambdaResponse(200, {
      message: 'Hello World from root!',
    });
  } else {
    throw new BaseLogicError(ErrorCodes.NOT_FOUND, 'Page not found');
  }
};

export const lambdaHandler = middy(handler)
  .use(logEventContext)
  .use(errorMiddleware);
