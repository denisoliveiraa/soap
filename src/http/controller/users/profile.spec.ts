import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/http/use-cases/utils/test/create-and-authenticate-user'

describe('profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('Shoul be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Barer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'Some Description',
        phone: '119999999',
        latitude: -27.2092052,
        longitude: -19.6401091,
      })

    expect(profileResponse.statusCode).toEqual(201)
  })
})
