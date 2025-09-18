export type AppConfig = {
  env: 'local' | 'development' | 'production' | 'staging' | 'test';
  isProduction: boolean;
  server: {
    port: number;
    host: string;
  };
  logger: {
    level: 'info' | 'error' | 'warn' | 'debug' | 'trace';
  };
  database: {
    url: string;
    maxConnections: number;
    connectionTimeout: number;
  };
  service: {
    name: string;
    version: string;
  };
  jwt: {
    accessTokenSecret: string;
    accessTokenExpiresIn: string;
    refreshTokenSecret: string;
    refreshTokenExpiresIn: string;
  };
  rateLimiting: {
    maxAttempts: number;
    windowMs: number;
  };

  swagger: {
    host: string;
    name: string;
  };
};
