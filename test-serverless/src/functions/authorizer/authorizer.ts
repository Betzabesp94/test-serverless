import {
  APIGatewayRequestAuthorizerEventV2,
  APIGatewaySimpleAuthorizerResult,
} from 'aws-lambda';

export const lambdaHandler = async (
  event: APIGatewayRequestAuthorizerEventV2,
): Promise<APIGatewaySimpleAuthorizerResult> => {
  try {
    // Add debug logging
    console.log('Headers received:', event.headers);
    console.log('Raw event:', JSON.stringify(event, null, 2));
    
    // Check both Auth and Authorization headers (case-insensitive)
    const authHeader = event.headers?.['authorization'] || 
                      event.headers?.['Authorization'] || 
                      event.headers?.['auth'] || 
                      event.headers?.['Auth'];

    if (!authHeader) {
      console.log('No authorization header found');
      return { isAuthorized: false };
    }

    // TODO: Implement proper token validation
    // This is just an example - replace with actual token validation logic
    if (authHeader.toLowerCase() === 'allow') {
      return { isAuthorized: true };
    }

    console.log('Invalid token provided');
    return { isAuthorized: false };
  } catch (error) {
    console.error('Authorization error:', error);
    return { isAuthorized: false };
  }
};