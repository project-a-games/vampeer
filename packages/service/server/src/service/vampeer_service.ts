import { Service } from "../tools/service";
import { authorized } from "./authorized/route";

const jwksUri = `https://dev-ymqe4ffj.auth0.com/.well-known/jwks.json`;
const serviceId = "'https://vampeer-service.herokuapp.com/api'";
const jwtIssuer = `https://dev-ymqe4ffj.auth0.com/`;

export const vampeerService = new Service({
    jwksUri,
    jwtAudience: serviceId,
    jwtIssuer,
    routes: [authorized],
});
