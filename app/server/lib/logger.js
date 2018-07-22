const winston = require('winston');

module.exports = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
  ),
  transports: [
    new winston.transports.File({ filename: './logs/combined.log' }),
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
  ],
});