import data from '../../mocks/data/posts.json';
import { lambdaResponse } from '../../helpers/response';
import { logEventContext } from '../../middlewares/log';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { logger } from '@baselime/lambda-logger';
import { errorMiddleware } from '../../middlewares/errorHandler';
import middy from '@middy/core';

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
) => {
  logger.info('Fetching all posts');
  return lambdaResponse(200, {
    posts: data,
  });
};

export const lambdaHandler = middy(handler)
  .use(logEventContext)
  .use(errorMiddleware);
