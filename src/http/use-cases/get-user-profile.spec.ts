import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user Profile use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('Should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe11@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })
    expect(user.name).toEqual('Jonh Doe')
  })

  it('Shoul not be acle to getr use profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
