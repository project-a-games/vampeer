import Ajv from 'ajv';
import AjvErrors from 'ajv-errors';
import { JsonSchema } from './json_schema';

/**
 * @future: All schemas for input validation will be remote - that way we
 * can use the same schema to validate on server and client, and changes will
 * be automatically synchronized. AJV has a DI cache
 * mechanism where we can use Realm.
 */

const authenticationSchema: JsonSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
            errorMessage: {
                format: 'Email must be a valid email',
            },
        },
        password: {
            type: 'string',
            pattern: '^(?=.*\d)(?=.*[A-z]).{6,}$',
            errorMessage: {
                pattern: 'Password must be at least 6 characters and include at least one letter and one number',
            },
        },
    },
    errorMessage: {
        required: {
            email: 'Email is required',
            password: 'Password is required',
        },
    },
};

export const validateAuth = AjvErrors(new Ajv({
    allErrors: true,
    jsonPointers: true,
}), {
    keepErrors: false,
    singleError: true,
}).compile(authenticationSchema);
