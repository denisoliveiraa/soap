import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repositories'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Ceeate Gym use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('Should hash user password upon registration', async () => {
    const { gym } = await sut.execute({
      title: 'Javascriot Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -19.6401091,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
