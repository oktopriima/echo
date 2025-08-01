import {createLogger, format, Logger, transports} from "winston";
import path from "path";
import fs from "fs";

const logDir: string = path.join(__dirname, "../../logs/app");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, {recursive: true});
}

const logger: Logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    format.errors({stack: true}),
    format.printf(({timestamp, level, message, stack}): string => {
      return `[${timestamp}] [${level.toUpperCase()}] ${stack || message}`;
    }),
  ),
  transports: [
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join(logDir, "combined.log"),
    }),
  ],
});

export default logger;
