import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import logger from '../../../utils/logger'
import { ServerError } from '../../../utils/errors'

export default function errorHandler(
    error: Error | ServerError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!error) return next()
    if (error instanceof ServerError) {
        const { status, message } = error
        return res.status(status).json({ message })
    }
    logger.error({ error })
    return res.status(500).json({
        type: 'Internal server error',
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Sorry we cannot handle your request, please report this error to: ${process.env.SUPPORT_EMAIL}`,
    })
}
