import pino from 'pino';
import { createWriteStream } from 'pino-sentry';
import { config } from '../config';

// Configuración de pino-sentry
const sentryOptions = {
  dsn: config.SENTRY_DSN || '', // Tu DSN de Sentry
  environment: config.NODE_ENV || 'development',
  level: 'error' as
    | 'info'
    | 'debug'
    | 'error'
    | 'fatal'
    | 'log'
    | 'warning'
    | 'critical', // Nivel mínimo de logs que se enviarán a Sentry
};

// Crear el logger con pino-sentry como destino solo si hay un DSN
const pinoLogger = config.SENTRY_DSN
  ? pino(
      {
        level:
          config.NODE_ENV === 'test' ? 'silent' : config.LOG_LEVEL || 'info',
      },
      createWriteStream(sentryOptions),
    )
  : pino({
      level: config.NODE_ENV === 'test' ? 'silent' : config.LOG_LEVEL || 'info',
    });

export default pinoLogger;
