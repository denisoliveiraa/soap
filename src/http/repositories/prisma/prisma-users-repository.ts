import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { usersRepository } from '../users-repositories'

export class PrismaUsersRepository implements usersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = prisma.user.create({
      data,
    })

    return user
  }
}
