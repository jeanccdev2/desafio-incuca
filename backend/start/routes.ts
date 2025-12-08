/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const JokesController = () => import('#controllers/jokes_controller')

// Rota de health check
router.get('/', async () => {
  return {
    message: 'Desafio Incuca - API de Piadas Geek',
    version: '1.0.0',
    status: 'online',
  }
})

// Rotas de API com prefixo /api
router
  .group(() => {
    // Rotas de autenticação (públicas)
    router
      .group(() => {
        router.post('/login', [AuthController, 'login'])
      })
      .prefix('/auth')

    // Rotas protegidas por autenticação
    router
      .group(() => {
        // Autenticação
        router.post('/auth/logout', [AuthController, 'logout'])
        router.get('/auth/me', [AuthController, 'me'])

        // Piadas (requer autenticação)
        router.get('/jokes/random', [JokesController, 'random'])
      })
      .use(middleware.auth())
  })
  .prefix('/api')
