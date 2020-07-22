import { Route } from '../../tools/service';

export const testRoute: Route = {
    path: '/api',
    type: 'post',
    auth: false,
    handlers: {
        test: {
            handle: () => 'Test successful',
        },
    },
};
