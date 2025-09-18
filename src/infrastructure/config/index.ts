import { EnvSchema } from '@schemas';
import { AppConfig } from '@types';
import dotenv from 'dotenv';

// Load environment variables from .env file
export async function loadEnvironmentVariables() {
  const envName = process.env.NODE_ENV ?? 'local';
  let envFile;
  if (envName.startsWith('development')) {
    envFile = '.env.dev';
  } else if (envName.startsWith('staging')) {
    envFile = '.env.staging';
  } else if (envName.startsWith('production')) {
    envFile = '.env.prod';
  } else {
    envFile = `.env.${envName}`;
  }

  dotenv.config({
    path: envFile,
  });
}

let config: AppConfig | null = null;

export async function makeConfig(): Promise<AppConfig> {
  if (!config) {
    const parsedEnv = EnvSchema.parse(process.env);

    config = {
      env: parsedEnv.NODE_ENV,
      isProduction: parsedEnv.NODE_ENV === 'production',
      server: {
        port: parsedEnv.PORT,
        host: parsedEnv.HOST,
      },
      logger: {
        level: parsedEnv.LOG_LEVEL,
      },
      database: {
        url: parsedEnv.DATABASE_URL,
        maxConnections: parsedEnv.DATABASE_MAX_CONNECTIONS,
        connectionTimeout: parsedEnv.DATABASE_CONNECTION_TIMEOUT,
      },
      service: {
        name: parsedEnv.SERVICE_NAME,
        version: parsedEnv.SERVICE_VERSION,
      },
      jwt: {
        accessTokenSecret: parsedEnv.ACCESS_TOKEN_SECRET,
        accessTokenExpiresIn: parsedEnv.ACCESS_TOKEN_EXPIRES_IN,
        refreshTokenSecret: parsedEnv.REFRESH_TOKEN_SECRET,
        refreshTokenExpiresIn: parsedEnv.REFRESH_TOKEN_EXPIRES_IN,
      },
      rateLimiting: {
        maxAttempts: parsedEnv.RATE_LIMIT_MAX_ATTEMPTS,
        windowMs: parsedEnv.RATE_LIMIT_WINDOW_MS,
      },

      swagger: {
        host: parsedEnv.SWAGGER_HOST,
        name: parsedEnv.SWAGGER_HOST_NAME,
      },
    };
  }

  return config;
}
