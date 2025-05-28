import {
  APIGatewayRequestAuthorizerEventV2,
  APIGatewaySimpleAuthorizerResult,
} from 'aws-lambda';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { IClerkJwtClaims } from '../../types';
import { logger } from '@baselime/lambda-logger';
import middy from '@middy/core';
import { logEventContext } from '../../middlewares/log';
import { errorMiddleware } from '../../middlewares/errorHandler';


 const handler = async (
  event: APIGatewayRequestAuthorizerEventV2,
): Promise<APIGatewaySimpleAuthorizerResult> => {
  try {

    // Extract the Authorization header (case-insensitive)
    const authHeader = event.headers?.Authorization

    logger.info(`Auth header: ${authHeader || 'No auth header found'}`);

    if (!authHeader || (!authHeader && !authHeader.startsWith('Bearer '))) {
      logger.info('Unauthorized: Missing or invalid Authorization header');
      return { isAuthorized: false };
    }
    // Extract the token from the Authorization header
    const token: string = authHeader.split(' ')[1];
    const publicKey = config.CLERK_PEM_PUBLIC_KEY;

    logger.info(`Public key: ${publicKey || 'No public key found'}`);

    if (!publicKey) {
      logger.info('Unauthorized: Missing public key');
      return { isAuthorized: false };
    }


    try {
      // Verify the JWT
      const decoded = jwt.verify(token, publicKey) as IClerkJwtClaims;
      if (!decoded) {
        logger.info('Unauthorized: Invalid token payload');
        return { isAuthorized: false };
      }
      // Optionally, you can add more checks on decoded claims here
      // e.g., check audience, issuer, etc.
      return { isAuthorized: true,
       };
    } catch (err: unknown) {
      logger.info('Unauthorized: Invalid token', { error: err });
      return { isAuthorized: false };
    }
  } catch (error: unknown) {
    console.error('Authorization error:', { error });
    return { isAuthorized: false };
  }
};


export const lambdaHandler = middy(handler)
  .use(logEventContext)
  .use(errorMiddleware);