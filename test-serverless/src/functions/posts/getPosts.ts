import data from '../../mocks/data/posts.json';
import { lambdaResponse } from '../../helpers/response';
import { logEventContext } from '../../middlewares/log';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { logger } from '@baselime/lambda-logger';
import { errorMiddleware } from '../../middlewares/errorHandler';
import middy from '@middy/core';
import { getSecret } from '../../common/error-codes/providers/aws/secretsManager';

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
) => {
  logger.info('Fetching all posts');

  logger.info('Fetching secret');
  const secret = await getSecret(process.env.JWT_SECRET!);
  logger.info('Secret fetched', { secret });
  return lambdaResponse(200, {
    secret,
  });
};

export const lambdaHandler = middy(handler)
  .use(logEventContext)
  .use(errorMiddleware);
