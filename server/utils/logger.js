const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.splat(),
    format.simple()
  ),
  transports: [
    new transports.Console()
  ]
});

module.exports = logger;