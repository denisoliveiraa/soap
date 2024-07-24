import { FastifyInstance } from 'fastify'
import { register } from './controller/register'
import { authenticate } from '../http/controller/users/authenticate'
import { profile } from '../http/controller/users/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
