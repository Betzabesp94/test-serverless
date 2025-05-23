import { lambdaResponse } from '../../helpers/response';
import { logEventContext } from '../../middlewares/log';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { logger } from '@baselime/lambda-logger';
import { config } from '../../config';
import { errorMiddleware } from '../../middlewares/errorHandler';
import middy from '@middy/core';

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
) => {
  logger.info('Handling /hello path');
  return lambdaResponse(200, {
    message: 'Hello from path /hello!',
  });
};

export const lambdaHandler = middy(handler)
  .use(logEventContext)
  .use(errorMiddleware);
