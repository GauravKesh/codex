const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({
      filename: "../logs/error.log",
      level: "error",
    }),
    new transports.File({
      filename: "../logs/info.log",
      level: "info",
    }),
    new transports.File({ filename: "../logs/combined.log" }),
    new transports.File({
      filename: "../logs/warn.log",
      level: "warn",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = logger;
