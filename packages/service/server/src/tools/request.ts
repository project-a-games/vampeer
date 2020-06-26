import {request as httpsRequest, RequestOptions} from 'https';


export function request(url: string, options: RequestOptions) {
    return new Promise((a, r) => {
        console.log('Making requst: ', url);
        httpsRequest(url, options, res => {
            console.log('Callback received: ', res);
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                a(data);
            });
        }).on('error', error => {
            r(error);
        });
    }); 
}