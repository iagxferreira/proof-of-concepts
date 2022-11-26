import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const envFound = dotenv.config()
if (!envFound) {
    throw new Error("Couldn't find .env file.️")
}

export default {
    env: process.env.NODE_ENV,
    port: process.env.APP_PORT,
    database: {
        name: process.env.DATABASE,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        dialect: process.env.DIALECT,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
    },
    supportEmail: process.env.SUPPORT_EMAIL,
    jwt: process.env.JWT,
    timer: process.env.TOKENTIME,
}
