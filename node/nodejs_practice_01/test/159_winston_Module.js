const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const moment = require('moment');

function tsFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
            timestamp: tsFormat,
            colorize: true,
            level: 'debug',
        }),
        new winstonDaily({
            level: 'info',
            dirname: 'Log',
            filename: 'logs.log',
            timestamp: tsFormat,
            datePattern: '_yyyy-MM-dd',
            format: winston.format.simple(),
            maxsize: 1000000,
            maxFiles: 5,
        }),
    ],
    exceptionHandlers: [
        new winstonDaily({
            level: 'info',
            dirname: 'Log',
            filename: 'exception.log',
            timestamp: tsFormat,
            datePattern: '_yyyy-MM-dd',
            format: winston.format.simple(),
            maxsize: 1000000,
            maxFiles: 5,
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
            timestamp: tsFormat,
            colorize: true,
            level: 'debug',
        }),
    ],
});

logger.info('인포 로깅');
logger.error('에러 로깅');
