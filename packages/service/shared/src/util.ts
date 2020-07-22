export const isJson = (response: Response) => (response.headers.get('content-type')?.indexOf('application/json') ?? -1) > -1;
