import {Router} from 'express'
import {Register, Login, AuthenticatedUser, Logout} from './controllers/authControllers'
import { AllProducts, createProducts,  UpdateProducts } from './controllers/productsControllers'
import { Users } from './controllers/userControllers'
import { AuthMiddleware } from './middlewares/authMiddlewares'

 export const routes = (router: Router) => {
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthMiddleware, AuthenticatedUser)
    router.post('/api/logout',AuthMiddleware, Logout)



    router.get('/api/users', Users)



    router.post('/api/products', createProducts)
    router.get('/api/products',  AllProducts)
    
    router.put('/api/update',  UpdateProducts)
 }