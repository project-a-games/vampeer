import { createLogger, format, transports } from 'winston';
import { SPLAT } from 'triple-beam';

const myFormat = format.printf((info) => {
    const {
        timestamp, level, message, data,
    } = info;

    const dataString = data ? (data as Array<any>).map(item => JSON.stringify(item)).join(', ') : '';
    return `${timestamp} ${level}: ${message} ${dataString}`;
});

const additionalData = format((info) => Object.assign(info, { data: info[SPLAT] }));

const logger = createLogger({
    level: process.env.VERBOSITY,
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        additionalData(),
        myFormat,
    ),
    transports: [new transports.Console()],
});

export default logger;
