import createJwtVerifierInternal from 'express-jwt';
import createScopeVerifierInternal from 'express-jwt-authz';
import { expressJwtSecret } from 'jwks-rsa';

export function createJwtVerifier(jwksUri: string, serviceId: string, issuer: string) {
    return createJwtVerifierInternal({
        // Dynamically provide a signing key
        // based on the kid in the header and
        // the signing keys provided by the JWKS endpoint.
        secret: expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri,
        }),

        // Validate the audience and the issuer.
        audience: serviceId,
        issuer,
        algorithms: ['RS256'],
        userProperty: 'user',
    });
}

export function createScopeVerifier(...scopes: string[]) {
    return createScopeVerifierInternal(scopes);
}
