import {
  APIGatewayRequestAuthorizerEventV2,
  APIGatewaySimpleAuthorizerResult,
} from 'aws-lambda';

export const lambdaHandler = async (
  event: APIGatewayRequestAuthorizerEventV2,
): Promise<APIGatewaySimpleAuthorizerResult> => {
  try {
    // Check both Auth and Authorization headers (case-insensitive)
    const authHeader = event.headers?.['authorization'] || event.headers?.['Authorization'];
    const altAuthHeader = event.headers?.['auth'] || event.headers?.['Auth'];

    const token = authHeader || altAuthHeader;

    if (!token) {
      console.log('No authorization header found');
      return { isAuthorized: false };
    }

    // TODO: Implement proper token validation
    // This is just an example - replace with actual token validation logic
    if (token === 'allow') {
      return { isAuthorized: true };
    }

    console.log('Invalid token provided');
    return { isAuthorized: false };
  } catch (error) {
    console.error('Authorization error:', error);
    return { isAuthorized: false };
  }
};