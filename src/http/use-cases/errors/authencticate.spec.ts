import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '../authenticate'
import { InMemoryUsersRepository } from '@/http/repositories/in-memory-users-repository'
import { hash } from 'crypto'
import { InvalidCredentialsError } from './invalid-credentials-error'

describe('Authenticate use Case', () => {
  it('Should be able autheticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Jonh Doe',
      email: 'jongdoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe11@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('Should be able authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'johndoe11@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
