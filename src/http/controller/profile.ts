import { FastifyReply, FastifyRequest } from 'fastify'
export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify() // busca o token no header e se realmente foi gerado pela applicação

  return reply.status(200).send()
}
