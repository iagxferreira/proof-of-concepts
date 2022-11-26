import { Router } from 'express'
import { UserController } from '../controllers'

const router = Router()
export default (app) => {
    app.use('/api/v1/users', router)
    // router.post('/', UserController.post)
    router.get('', UserController.get)
    router.get('/:id', UserController.getById)
    // router.put('/:id', UserController.put)
    // router.delete('/:id', UserController.delete)
}
