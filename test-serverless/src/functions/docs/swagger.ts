import { APIGatewayProxyEventV2, Context } from 'aws-lambda';
import { logger } from '@baselime/lambda-logger';
import { lambdaErrorHandler } from '../../helpers/error';
import { lambdaResponse } from '../../helpers/response';
import { composeHandler } from '../../middlewares/compose';
import { logEventContext } from '../../middlewares/log';

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const express = require('express');
const openapiDocument = YAML.load('./openapi.yml');

const app = express();

// Serve Swagger UI at /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

export const handler = async (event: any, context: Context) => {
  try {
    const path = event['path'] || event.rawPath;

    if (path === '/dev/docs' || path === '/docs') {
      logger.info('Serving Swagger UI at /docs');
      const server = app.listen(3000, () => {
        logger.info('Express server started for Swagger UI');
      });

      // Close the server after the request is handled
      server.close();

      return lambdaResponse(200, {
        message: 'Swagger UI served at /docs',
      });
    }

    logger.warn('Path not found');
    return lambdaResponse(404, {
      error: 'Not Found',
    });
  } catch (err) {
    logger.error('Error in handler', err as Error);
    return lambdaErrorHandler(err);
  }
};

export const lambdaHandler = composeHandler(logEventContext(), handler);
