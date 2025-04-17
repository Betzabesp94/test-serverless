import { APIGatewayProxyEventV2, Context } from 'aws-lambda';

export const composeHandler = (...middlewares: Function[]) => {
  return async (event: APIGatewayProxyEventV2, context: Context) => {
    let handler = middlewares.pop();
    for (const middleware of middlewares) {
      await middleware(event, context);
    }
    if (!handler) {
      throw new Error('No handler provided in composeHandler');
    }
    return handler(event, context);
  };
};
