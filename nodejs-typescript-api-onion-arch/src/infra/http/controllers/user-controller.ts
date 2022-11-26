import { StatusCodes } from 'http-status-codes'
import { UserService } from '../../../domain/services'
import logger from '../../../utils/logger'

export default class UserController {
    async get(req, res, next) {
        try {
            const users = await UserService.findAll()
            return res.status(StatusCodes.OK).send({ users })
        } catch (error) {
            return next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const {
                params: { id },
            } = req
            const user = await UserService.findById(id)
            return res.status(StatusCodes.OK).json({ user })
        } catch (error) {
            return next(error)
        }
    }

    async getByEmail(req, res, next) {
        try {
            logger.info(req.query)
            const user = await UserService.findByEmail(req.query.email)
            return res.status(StatusCodes.OK).json({ user })
        } catch (error) {
            return next(error)
        }
    }

    async post(req, res, next) {
        try {
            return res.status(StatusCodes.OK).json({ ok: true })
        } catch (error) {
            return next(error)
        }
    }

    async put(req, res, next) {
        try {
            return res.status(StatusCodes.OK).json({ ok: true })
        } catch (error) {
            return next(error)
        }
    }

    async delete(req, res, next) {
        try {
            return res.status(StatusCodes.OK)
        } catch (error) {
            return next(error)
        }
    }
}
