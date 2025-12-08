import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth_validator'
import AuthService from '#services/auth_service'

export default class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  // Login de usuário com JWT
  async login({ request, response }: HttpContext) {
    try {
      const credentials = await request.validateUsing(loginValidator)

      const authResponse = await this.authService.login(credentials)

      return response.ok(authResponse)
    } catch (error) {
      return response.unauthorized({
        message: 'Invalid credentials',
      })
    }
  }

  // Logout do usuário
  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      await this.authService.logout(user, String(user.currentAccessToken.identifier))

      return response.ok({
        message: 'Logged out successfully',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to logout',
      })
    }
  }

  // Retorna usuário autenticado
  async me({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()

      return response.ok({
        user: {
          id: user.id,
          email: user.email,
          name: user.fullName,
        },
      })
    } catch (error) {
      return response.unauthorized({
        message: 'Not authenticated',
      })
    }
  }
}
