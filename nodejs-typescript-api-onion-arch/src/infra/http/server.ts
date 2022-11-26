import express from 'express'
import config from '../../utils/config'
import logger from '../../utils/logger'
import { cors, errorHandler, helmet, hpp } from './middlewares'
import routes from './routes'

export default class Server {
    private readonly app

    private readonly port

    constructor() {
        this.app = express()
        this.port = config.port || 8080
    }

    public initializeRoutes() {
        this.app.use(routes)
        return this
    }

    public initializeGlobalMiddlewares() {
        this.app.disable('x-powered-by')
        this.app.set('trust proxy', true)
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(helmet())
        this.app.use(cors())
        this.app.use(hpp())
        return this
    }

    public initializeErrorHandlers() {
        this.app.use(errorHandler)
        return this
    }

    public listen() {
        this.app.listen(this.port, () =>
            logger.info(`done! server running on port ${this.port}`)
        )
        return this
    }
}
