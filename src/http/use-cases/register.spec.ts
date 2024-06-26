import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository'

describe('Register use Case', () => {
  it('Should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe11@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHased = await compare('123456', user.password_hash)
    expect(isPasswordCorrectlyHased).toBe(true)
  })
})
