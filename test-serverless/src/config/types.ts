import { z } from 'zod';

export enum EnvStages {
  LOCAL = 'local',
  DEV = 'dev',
  TEST = 'test',
  UAT = 'uat',
  SANDBOX = 'sandbox',
  PROD = 'prod',
}

export const ConfigSchema = z.object({
  // The port on which the server will run
  PORT: z.coerce.number(),
  //  The AWS region for the application
  AWS_REGION: z.string(),
  // NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  NODE_ENV: z.enum(Object.values(EnvStages) as [EnvStages, ...EnvStages[]]),
  // Log level for the application
  LOG_LEVEL: z.enum(['info', 'debug', 'warn', 'error']).default('info'),
  // Sentry DSN for error tracking
  SENTRY_DSN: z.string().optional(),
});

export const EnvStagesList = Object.values(EnvStages);
