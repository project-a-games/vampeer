import Ajv from 'ajv';
import assert from 'assert';
import {JSONSchema7Definition} from 'json-schema';
import logger from './logger';
import express, { IRouter } from 'express';
import { createJwtVerifier, createScopeVerifier } from './jwt';
import { ErrorResponse } from './errors';

const ajv = new Ajv({
    allErrors: true,
});

export interface Handler {
    (req: Req, input: any): Promise<any> | any;
    requestSchema?: JSONSchema7Definition;
    requestName: string;
}

export interface Route {
    type: 'get' | 'post';
    path: string;
    auth: boolean;
    scopes?: string[];
    handlers: Handler[];
}

interface ServiceConfig {
    jwtAudience: string;  // For jwt audience verification
    jwksUri: string;
    jwtIssuer: string;
    routes: Route[];
}


export type Req = Parameters<Parameters<IRouter['post']>[1]>[0] & {user: any, accessToken: string};
type Res = Parameters<Parameters<IRouter['post']>[1]>[1]

function errArrToString(errors?: Ajv.ErrorObject[] | null) {
    if (errors) {
        return errors.map(err => `${err.message}`).join('\n');
    }

    return '![unexpected empty error array]!';
}

export class Service {
    public router = express.Router();
    constructor(private _config: ServiceConfig) {
        this._applyRoutes();
    }

    _applyRoutes() {
        const verifyJwt = createJwtVerifier(this._config.jwksUri, this._config.jwtAudience, this._config.jwtIssuer);
        for (const route of this._config.routes) {
            if (route.auth && route.scopes) {
                this.router[route.type](
                    route.path,
                    verifyJwt,
                    createScopeVerifier(...route.scopes), 
                    (req, res) => this._handleRequest(req as Req, res, route));
            } else if (route.auth) {
                this.router[route.type](
                    route.path, 
                    verifyJwt,
                    (req, res) => this._handleRequest(req as Req, res, route));
            } else {
                this.router[route.type](
                    route.path,
                    (req, res) => this._handleRequest(req as Req, res, route));
            }
        }
    }

    async _handleRequest(req: Req, res: Res, route: Route) {
        logger.info(`Handling request in service - aud=${this._config.jwtAudience}`);
        try {
            const {requestInput, handler} = this._parseRequest(req, route);
            const payload = await handler(req, requestInput);
    
            logger.info('Sending response: ', payload);
            res.json({ payload });
        } catch (e) {
            logger.error('Error: ', req.body, e.message);
    
            if (e instanceof ErrorResponse) {
                res.status(e.httpStatus).send({ error: e.message });
            } else {
                console.log("Error type: ", e.constructor.name);
                res.status(400).send({error: e.message});
            }
        }        
    }
    
    _parseRequest({body}: Req, route: Route) {
        logger.info("Recieved body: ", body);
        
        assert(body && typeof body === 'object', 'req.body must be an object');

        const {requestName, requestInput} = body;

        const handler = route.handlers.find(handler => handler.requestName === requestName);

        if (!handler) {
            throw new Error(`[${requestName}] is an unrecognized request`);
        }

        if (handler.requestSchema) {
            const validate = ajv.compile(handler.requestSchema);
            if (!validate(requestInput)) {
                throw new Error(`Invalid input for [${requestName}] errors: [${errArrToString(validate.errors)}]`);
            }
        }
        
        return {requestInput, handler};
    }
}
