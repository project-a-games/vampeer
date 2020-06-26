import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: process.env.VERBOSITY,
    transports: [],
});

const alignedWithColorsAndTime = format.combine(
    format.colorize(),
    format.metadata(),
    format.printf(info => {
        if (Object.keys(info.metadata).length === 0) {
            return `${info.level}: ${info.message}`;
        }

        return `${info.level}: ${info.message} | ${JSON.stringify(info.metadata, null, 0)}`;
    }),
);

if (true /* process.env.NODE_ENV !== 'production' */) {
    logger.add(new transports.Console({
        format: alignedWithColorsAndTime,
    }));
}

export default logger;

