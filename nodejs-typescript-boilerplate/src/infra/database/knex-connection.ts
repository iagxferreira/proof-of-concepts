import Knex from 'knex'
import config from '../../utils/config'

export default Knex({
    client: config.database.dialect,
    connection: async () => {
        const { host, password, name: database, port, user } = config.database
        return {
            host,
            port,
            user,
            password,
            database,
        }
    },
})
