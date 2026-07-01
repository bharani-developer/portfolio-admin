// src\shared\lib\logger.ts
interface LoggerMeta {
  [key: string]: unknown;
}

type LogLevel = "info" | "warn" | "error" | "debug";

const isDevelopment = import.meta.env.DEV;

function log(level: LogLevel, message: string, meta?: LoggerMeta): void {
  if (!isDevelopment) {
    return;
  }

  const timestamp = new Date().toISOString();

  const payload = {
    timestamp,
    level,
    message,
    ...(meta ? { meta } : {}),
  };

  switch (level) {
    case "info":
      console.info(payload);
      break;

    case "warn":
      console.warn(payload);
      break;

    case "error":
      console.error(payload);
      break;

    case "debug":
      console.debug(payload);
      break;

    default:
      console.log(payload);
  }
}

export const logger = {
  info(message: string, meta?: LoggerMeta): void {
    log("info", message, meta);
  },

  warn(message: string, meta?: LoggerMeta): void {
    log("warn", message, meta);
  },

  error(message: string, meta?: LoggerMeta): void {
    log("error", message, meta);
  },

  debug(message: string, meta?: LoggerMeta): void {
    log("debug", message, meta);
  },
} as const;
