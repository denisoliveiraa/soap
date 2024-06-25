import { describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'

describe('Register use Case', () => {
  it('Should hash user password upon registration', async () => {
    const primaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(primaUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    console.log(user.password_hash)
  })
})
