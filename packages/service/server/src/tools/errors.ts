

export class ErrorResponse extends Error {
    constructor(message: string, public httpStatus = 400) {
        super(message);
    }
}