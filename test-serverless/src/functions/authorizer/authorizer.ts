import {
  APIGatewayRequestAuthorizerEventV2,
  APIGatewaySimpleAuthorizerResult,
} from 'aws-lambda';

export const lambdaHandler = async (
  event: APIGatewayRequestAuthorizerEventV2,
): Promise<APIGatewaySimpleAuthorizerResult> => {
  // Check for Auth or Authorization header
  const authHeader =
    event.headers?.Auth ||
    event.headers?.Authorization ||
    event.headers?.authorization;

  // Simple check: allow if header is present and equals 'allow', deny otherwise
  if (authHeader && authHeader === 'allow') {
    return {
      isAuthorized: true,
    };
  }

  // Deny if header is missing or incorrect
  return {
    isAuthorized: false,
  };
};
