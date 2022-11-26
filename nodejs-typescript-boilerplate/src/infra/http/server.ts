import express from 'express'
import config from '../../utils/config'
import logger from '../../utils/logger'
import { cors, helmet, errorHandler } from './middlewares'

export default class Server {
    private readonly app

    private readonly port

    constructor() {
        this.app = express()
        this.port = config.port || 3000
    }

    public initializeRoutes() {
        return this
    }

    public listen() {
        this.app.listen(this.port, () =>
            logger.info(`done! server running on port ${this.port}`)
        )
        return this
    }

    public initializeGlobalMiddlewares() {
        this.app.use(helmet())
        this.app.use(cors())
        return this
    }

    public initializeErrorHandlers() {
        this.app.use(errorHandler)
        return this
    }
}
