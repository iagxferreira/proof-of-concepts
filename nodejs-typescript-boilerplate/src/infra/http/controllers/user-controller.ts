import { StatusCodes } from 'http-status-codes'
import { IService } from '../../../domain/abstract/service'

export default class UserController {
    constructor(protected readonly service: IService) {
        this.service = service
    }

    async get(req, res, next) {
        try {
            const users = await this.service.findAll()
            return req.status(StatusCodes.OK).json(users)
        } catch (error) {
            return next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params
            const user = await this.service.findById(id)
            return req.status(StatusCodes.OK).json(user)
        } catch (error) {
            return next(error)
        }
    }

    async post(req, res, next) {
        try {
            const { body } = req
            const user = await this.service.insert(body)
            return req.status(StatusCodes.OK).json(user)
        } catch (error) {
            return next(error)
        }
    }

    async put(req, res, next) {
        try {
            const {
                body,
                params: { id },
            } = req
            const user = await this.service.update(id, body)
            return req.status(StatusCodes.OK).json(user)
        } catch (error) {
            return next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await this.service.erase(id)
            return req.status(StatusCodes.OK).json({ deleted: true })
        } catch (error) {
            return next(error)
        }
    }
}
