import knex from 'knex'
import config from '../../utils/config'
import logger from '../../utils/logger'

export default knex({
    client: config.database.dialect,
    connection: {
        host: config.database.host,
        port: +config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.name,
    },
    pool: {
        min: 0,
        max: 7,
    },
    log: {
        warn(message) {
            logger.warn(message)
        },
        error(message) {
            logger.error(message)
        },
        deprecate(message) {
            logger.warn(message)
        },
        debug(message) {
            logger.info(message)
        },
    },
})
