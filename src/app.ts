import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

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
