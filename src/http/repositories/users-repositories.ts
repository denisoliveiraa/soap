/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, User } from '@prisma/client'

export interface usersRepository {
  [x: string]: any
  create(data: Prisma.UserCreateInput): Promise<User>
}
