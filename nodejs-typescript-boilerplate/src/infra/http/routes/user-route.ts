import { Router } from 'express'
import UserController from '../controllers'

const route = Router()
export default (app) => {
    app.use('/users', route)
    route.post('/', UserController.post)
    route.get('/', UserController.get)
    // route.get('/login/', controller.getByLogin)
    // route.get('/:id', controller.getById)
    route.put('/:id', UserController.put)
    route.delete('/:id', UserController.delete)
}
