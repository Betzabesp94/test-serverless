import Data from '../../mocks/data/posts.json';
import { lambdaResponse } from '../../helpers/response';
import { logEventContext } from '../../middlewares/log';
import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { logger } from '@baselime/lambda-logger';
import middy from '@middy/core';
import { BaseLogicError, ErrorCodes } from '../../common/error-codes/codes';
import { errorMiddleware } from '../../middlewares/errorHandler';

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
) => {
  const postId = event.pathParameters?.id; // Extract the `id` from path parameters
  if (postId) {
    logger.info(`Fetching post with id: ${postId}`);
    const post = Data.find((p) => p.id === parseInt(postId, 10));

    if (post) {
      return lambdaResponse(200, {
        post,
      });
    }

    if (!post) {
      logger.warn(`Post with id ${postId} not found`);
      throw new BaseLogicError(
        ErrorCodes.NOT_FOUND,
        'Post not found by the provided ID',
      );
    }
  }
};

export const lambdaHandler = middy(handler)
  .use(logEventContext)
  .use(errorMiddleware);
