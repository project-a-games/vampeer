import express from 'express';
import bodyParser from 'body-parser';
import serveFavicon from 'serve-favicon';
import path from 'path';
import { onListening, onError, getPort } from './server_helpers';
import logger from '../tools/logger';

export const app = express();

const port = getPort();
logger.info(`Setting "port" to [${port}]`);
app.set('port', port);

// Parsing Plugins
// support parsing of application/json type post data
app.use(bodyParser.json());
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(serveFavicon(path.join(__dirname, 'favicon.ico')));

// Log all requests
app.use((req, __, next) => {
    logger.info(`Received request: url=${req.originalUrl}`);
    next();
});

// Start server
app.listen(port, () => onListening(port)).on('error', err => onError(port, err));
