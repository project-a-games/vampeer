import express from 'express';

export function makeWebRouter() {
    const router = express.Router();

    router.get('/*', (__, res) => {
        res.send('There is no web-app here...');
    });

    return router;
}
