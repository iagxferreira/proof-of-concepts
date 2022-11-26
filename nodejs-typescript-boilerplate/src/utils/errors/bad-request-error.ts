import { StatusCodes } from 'http-status-codes'
import ServerError from './server-error'

export default class BadRequestError extends ServerError {
    constructor(message: string) {
        super({ message, status: StatusCodes.BAD_REQUEST, code: 'BAD_REQUEST' })
    }
}
