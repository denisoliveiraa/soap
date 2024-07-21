import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(4324),
})

const _env = envSchema.safeParse(process.env) // Valida se as variaveis ambiente "process.env" se tem exatamente as informações do envSchema
// process.env ele busca do .env qual setup está sendo utilizado  {NODE_ENV: 'dev'}

if (_env.success === false) {
  console.error('Invalid enviroment variable', _env.error.format())

  throw new Error('Invalid enrinment variables.') // somente para derrubar a aplicação se tem problema na varivel ambiente
}

// Caso seja sucesso

export const env = _env.data // data traz cada um dos valores da variável ambiente
