import Model from './abstract/model'
import CrudInterface from './abstract/crud-interface'

export default class UserModel extends Model implements CrudInterface {
    public findAll() {
        return this.connection(this.tableName)
            .select()
            .where({ deleted_at: null })
    }

    public findOne({ id }: { id: string }) {
        return this.connection(this.tableName)
            .select(['id', 'name', 'email'])
            .where({ deleted_at: null, id })
            .first()
    }

    public findByEmail({ email }: { email: string }) {
        return this.connection(this.tableName)
            .select(['id', 'name', 'email'])
            .where({ deleted_at: null, email })
            .first()
    }
}
