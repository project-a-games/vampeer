import logger from '../tools/logger';

export function getPort(): number | string {
    const port = process.env.PORT || 5000;

    if (typeof port === 'string') {
        const portNum = parseInt(port as string, 10);

        if (isNaN(portNum)) {
            // named pipe
            return port;
        }

        return portNum;
    }

    return port;
}

/**
 * Event listener for HTTP server "error" event.
 */

export function onError(port: any, error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
        default:
            logger.error('Handled server onError');
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
export function onListening(port: string | number) {
    const bind = typeof port === 'string'
        ? `pipe ${port}`
        : `port ${port}`;
    logger.info(`Listening on ${bind}`);
}
