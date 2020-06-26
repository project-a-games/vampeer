import {connect, connection} from 'mongoose';
import logger from '../tools/logger';

const uri = process.env.MONGODB_URI as string;
if (typeof uri !== 'string') throw new Error(`Failed to read MONGODB_URI - received ${uri}`);
connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});    

connection.on('error', error => {
    console.error('Mongo connection error:', error);
    process.exit(1);
});

connection.on('open', () => {
    logger.info("Mongo connected");
});
