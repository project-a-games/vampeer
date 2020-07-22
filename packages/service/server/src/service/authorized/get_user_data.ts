import fetch from 'node-fetch';
import { response } from 'express';
import { Req } from '../../tools/service';
import { MongoUser } from '../../database/models/users';
import logger from '../../tools/logger';
import { isJson } from '../../../../shared/src/request';

export const handleGetUserData = async (req: Req) => {
    logger.error(`Requesting with token: ${JSON.stringify(req.user)}`);

    const auth = req.get('authorization');

    const response = await fetch('https://dev-ymqe4ffj.auth0.com/userinfo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: auth,
        },
    });

    if (isJson(response)) {
        const userInfo = response.json();
        logger.info('user info: ', JSON.stringify(userInfo, null, 2));
    }

    return ' this is a triumph';
};

// const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkdQUVdVbU5vc0lWLW0tbDVldDFvTCJ9.eyJpc3MiOiJodHRwczovL2Rldi15bXFlNGZmai5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDk5OTMxMTI3NTY5Mzc3NjQwMzYiLCJhdWQiOlsiJ2h0dHBzOi8vdmFtcGVlci1zZXJ2aWNlLmhlcm9rdWFwcC5jb20vYXBpJyIsImh0dHBzOi8vZGV2LXltcWU0ZmZqLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE1OTMwOTk4NTMsImV4cCI6MTU5MzE4NjI1MywiYXpwIjoiT0ZrTWNqTGJqbE1NVHgxMTNCaGxrSVZWeE1KajZncGYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIn0.g-02tb0v8SEkqZqjLoU4N1TMUJQ_XWUsPvbkry-0URCJGfqiMB4wwD92j9V7x0n0vAHvNkz_WhDR_nQ7mmnqMyqaviQwOWnEc6jhnRGCKtN49BYJYPVV4ixHTZt-W0LtnF84lE_y3dDbt5gEP4xJz30f8D3hYBGYa66EPugPyqA43GBBiCR6dX1NOSFM3ZWhbDzKQ--9mfZKRBxC8CQ4_A592GKpJ6XUN1UTf-PH9sBZ3l6kIydM6Uwffe-uPHGEvN4sRQLj4TjQC7ubhD6n8EmhblMBj9jjzvA6O7kdawA_a0qbQK81wNC6RjJoDY5kumaY4rj_YqZlc7CHIKWFwA';

// async function testIt() {
//     console.log('testing');
//     try {
//         const result = await handler({ accessToken: token } as any);
//         console.log('Testing result: ', result);
//     } catch (e) {
//         console.log('Testing failed: ', e.message);
//     }
// }

// testIt();
