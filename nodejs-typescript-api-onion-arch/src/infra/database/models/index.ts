import conn from '../connection'
import UserModelImpl from './user-model'
import RoleModelImpl from './role-model'

// eslint-disable-next-line import/prefer-default-export
export const UserModel = new UserModelImpl(conn, 'users')
export const RoleModel = new RoleModelImpl(conn, 'roles')
