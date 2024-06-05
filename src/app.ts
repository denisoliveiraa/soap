import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'Denis',
    email: 'denis@hotmail',
  },
})

export const app = fastify()
