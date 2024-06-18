import { env } from './env'
import { app } from './app'

app
  .listen({
    host: '0.0.0.0', // Aplicação acessivel front-end
    port: env.PORT,
  })
  .then(() => {
    console.log('Http Server is running')
  })
