import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('Shoul be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Denis',
      email: 'Denis@hotmal',
      password: '12345',
    })

    expect(response.statusCode).toEqual(201)
  })
})
