import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { logger } from '@baselime/lambda-logger';

export const logEventContext =
  () => async (event: APIGatewayProxyEventV2, context: Context) => {
    logger.info('Event context logged', {
      event,
      context,
    });
  };
