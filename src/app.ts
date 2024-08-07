import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '../env'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controller/users/routes'
import { gymsRoutes } from './http/controller/gyms/routes'
import { checkInsRoutes } from './http/controller/check-ins/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
app.register(fastifyCookie)
app.setErrorHandler((Error, _, reply) => {
  if (Error instanceof ZodError) {
    // zodError é o tipo de error que o zod envia
    return reply
      .status(400)
      .send({ message: 'Validantion error', issues: Error.format() })
  }
  // eslint-disable-next-line eqeqeq
  if (env.NODE_ENV != 'production') {
    console.error(Error)
  } else {
    // TODO: Here we should log to an extenal toll like Datalog
  }
  return reply.status(500).send({ message: 'Internal Server error' })
})
