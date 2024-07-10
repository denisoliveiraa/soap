import { CheckInsRepository } from '../repositories/check-ins-repositories'
import { GymsRepository } from '../repositories/gyms-repositories'
import { CheckIn } from '@prisma/client'

interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string
}
interface FetchUserCheckInHistoryUseCaseResponse {
  checkIns: CheckIn[]
}
export class FetchUserCheckInHistoryUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
  }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId)

    return {
      checkIns,
    }
  }
}
