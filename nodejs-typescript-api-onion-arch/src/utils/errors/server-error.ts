import ErrorParamns from './interfaces/error-params'

export default class ServerError extends Error {
    public status: number

    public code: string

    constructor({ message, status, code, headers }: ErrorParamns) {
        super(message)
        this.status = status
        this.code = code

        Object.defineProperty(this, 'headers', { value: headers || {} })
        Object.defineProperty(this, 'name', { value: this.constructor.name })
    }
}
