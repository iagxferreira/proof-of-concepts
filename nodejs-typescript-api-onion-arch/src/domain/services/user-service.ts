import { ServiceInterface } from '../abstract/service'
import { NotFoundError } from '../../utils/errors'
import UserModel from '../../infra/database/models/user-model'
import logger from "../../utils/logger";

export default class UserService implements ServiceInterface {
    private model: UserModel

    constructor(model) {
        this.model = model
    }

    erase(id: any) {}

    findAll() {
        return this.model.findAll()
    }

    async findById(id: any) {
        const user = await this.model.findOne({ id })
        if (!user) throw new NotFoundError('User not found!')
        return user
    }

    async findByEmail(email: any) {
        const user = await this.model.findByEmail({
            email: 'iago-ferreira@Outlook.com',
        })
        logger.info('user', user)
        if (!user) throw new NotFoundError('User not found!')
        return user
    }

    insert(document: any) {}

    update(id: any, document: any) {}
}
