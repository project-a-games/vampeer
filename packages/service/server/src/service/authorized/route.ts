import { getUserData } from "./get_user_data";
import { Route } from "../../tools/service";

export const authorized: Route = {
    path: '/api/auth',
    type: 'post',
    auth: true,
    handlers: [getUserData]
}