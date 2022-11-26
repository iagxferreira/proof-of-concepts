import UserServiceImpl from './user-service'
import { UserModel } from '../../infra/database/models'

// eslint-disable-next-line import/prefer-default-export
export const UserService = new UserServiceImpl(UserModel)
