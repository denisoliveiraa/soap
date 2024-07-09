import { Gym } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repositories'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { hash } from 'bcryptjs'

interface CreateGymUseCaseRequest {
  title: string
  description?: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: gymsRepository) {}
  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
