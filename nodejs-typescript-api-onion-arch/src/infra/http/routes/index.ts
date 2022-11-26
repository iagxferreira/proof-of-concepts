import { Router } from 'express'
import UserRoute from './user-route'

const router = Router()

UserRoute(router)

export default router
