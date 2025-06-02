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
  // Make PORT optional with a default value
  PORT: z.coerce.number().optional().default(3000),
  // Make NODE_ENV optional with a default value
  NODE_ENV: z.enum(Object.values(EnvStages) as [EnvStages, ...EnvStages[]]).default(EnvStages.DEV),
  // Log level for the application
  LOG_LEVEL: z.enum(['info', 'debug', 'warn', 'error']).default('info'),
  // Sentry DSN for error tracking
  SENTRY_DSN: z.string().optional(),
  // Clerk PEM public key for JWT validation
  CLERK_PEM_PUBLIC_KEY: z.string().optional(),
});

export const EnvStagesList = Object.values(EnvStages);
