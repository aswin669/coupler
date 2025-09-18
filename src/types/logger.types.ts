type LogMethod = {
  (msg: string, ...args: unknown[]): void;
  (obj: Record<string, unknown>, msg?: string, ...args: unknown[]): void;
};

export type Logger = {
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  fatal: LogMethod;
};
