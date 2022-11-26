import winston from 'winston'
import config from '../config'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: process.env.SERVICE_NAME },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
        new winston.transports.Console(),
    ],
})

if (config.env !== 'production')
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    )

export default logger
