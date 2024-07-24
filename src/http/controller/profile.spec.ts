import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('Shoul be able to get user profile', async () => {
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

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Barer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'Denis@hotmal',
      }),
    )
  })
})
