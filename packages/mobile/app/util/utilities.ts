
export const sleep = (ms: number) => new Promise((a) => setTimeout(a, ms));

export const isJson = (response: Response) => (response.headers.get('content-type')?.indexOf('application/json') ?? -1) > -1;
