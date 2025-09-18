import { AppConfig, Logger } from '@types';
import pino from 'pino';

export function makeLogger(config: AppConfig): Logger {
  return pino({
    level: config.logger.level,
    enabled: config.env !== 'test',
    base: undefined, // omit pid, hostname for cleaner logs
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level(label) {
        return { level: label };
      },
      bindings() {
        return {};
      },
    },
    transport:
      config.env === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
  });
}
