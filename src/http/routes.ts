import { FastifyInstance } from 'fastify'
import { register } from './controller/register'
import { authenticate } from '../http/controller/users/authenticate'
import { profile } from '../http/controller/users/profile'
import { verifyJWT } from './middlewares/verify-jwt'
import { verifyUserRole } from '../http/middlewares/verify-user-role'
import { validate } from './controller/check-ins/validate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)

  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
