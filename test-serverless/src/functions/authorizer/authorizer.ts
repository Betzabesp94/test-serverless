import {
  APIGatewayRequestAuthorizerEventV2,
  APIGatewaySimpleAuthorizerResult,
} from 'aws-lambda';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { IClerkJwtClaims } from '../../types';

export const lambdaHandler = async (
  event: APIGatewayRequestAuthorizerEventV2,
): Promise<APIGatewaySimpleAuthorizerResult> => {
  try {

    // Extract the Authorization header (case-insensitive)
    const authHeader = event.headers?.Authorization || event.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Unauthorized: Missing or invalid Authorization header');
      return { isAuthorized: false };
    }
    // Extract the token from the Authorization header
    const token: string = authHeader.split(' ')[1];
    const publicKey = config.CLERK_PEM_PUBLIC_KEY;

    if (!publicKey) {
      console.log('Unauthorized: Missing public key');
      return { isAuthorized: false };
    }


    try {
      // Verify the JWT
      const decoded = jwt.verify(token, publicKey) as IClerkJwtClaims;
      if (!decoded) {
        console.log('Unauthorized: Invalid token payload');
        return { isAuthorized: false };
      }
      // Optionally, you can add more checks on decoded claims here
      // e.g., check audience, issuer, etc.
      return { isAuthorized: true };
    } catch (err) {
      console.log('Unauthorized: Invalid token', err);
      return { isAuthorized: false };
    }
  } catch (error) {
    console.error('Authorization error:', error);
    return { isAuthorized: false };
  }
};