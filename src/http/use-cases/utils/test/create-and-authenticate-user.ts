import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Denis',
    email: 'Denis@hotmal',
    password: '12345',
  })

  const authReponse = await request(app.server).post('/sessions').send({
    email: 'Denis@hotmal',
    password: '12345',
  })

  const { token } = authReponse.body

  return token
}
