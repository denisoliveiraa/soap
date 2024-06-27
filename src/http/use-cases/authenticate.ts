import { compare } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repositories'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMathces = await compare(password, user.password_hash)

    if (!doesPasswordMathces) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
