import ServerError from './server-error'

export default class UnauthorizedError extends ServerError {
    constructor(message: string, challenge: string = 'Role') {
        super({
            message,
            status: 401,
            code: 'UNAUTHORIZED',
            headers: { 'WWW-Authenticate': challenge },
        })
    }
}
