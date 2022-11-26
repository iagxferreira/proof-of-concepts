import { StatusCodes } from 'http-status-codes'
import ServerError from './server-error'

export default class NotFoundError extends ServerError {
    constructor(message: string) {
        super({ message, status: StatusCodes.NOT_FOUND, code: 'NOT_FOUND' })
    }
}
