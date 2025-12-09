import { describe, it, expect, vi, beforeEach } from 'vitest'
import AuthController from '#controllers/auth_controller'

// Mock AuthService
vi.mock('#services/auth_service')

describe('AuthController', () => {
  let authController: AuthController
  let mockAuthService: any
  let ctx: any

  beforeEach(() => {
    vi.clearAllMocks()
    authController = new AuthController()
    // Access mocked service instance
    mockAuthService = (authController as any).authService

    // Mock HttpContext
    ctx = {
      request: {
        validateUsing: vi.fn(),
      },
      response: {
        ok: vi.fn((data) => data),
        unauthorized: vi.fn((data) => data),
        internalServerError: vi.fn((data) => data),
      },
      auth: {
        getUserOrFail: vi.fn(),
      },
    }
  })

  describe('login', () => {
    it('should login successfully', async () => {
      const credentials = { email: 'test@example.com', password: 'password' }
      const authResponse = {
        token: 'token',
        user: { id: 1, email: 'test@example.com', name: 'Test' },
      }

      ctx.request.validateUsing.mockResolvedValue(credentials)
      mockAuthService.login.mockResolvedValue(authResponse)

      await authController.login(ctx)

      expect(ctx.request.validateUsing).toHaveBeenCalled()
      expect(mockAuthService.login).toHaveBeenCalledWith(credentials)
      expect(ctx.response.ok).toHaveBeenCalledWith(authResponse)
    })

    it('should return unauthorized on login failure', async () => {
      ctx.request.validateUsing.mockResolvedValue({})
      mockAuthService.login.mockRejectedValue(new Error('Invalid credentials'))

      await authController.login(ctx)

      expect(ctx.response.unauthorized).toHaveBeenCalledWith({ message: 'Invalid credentials' })
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      const user = { id: 1, currentAccessToken: { identifier: 'token_id' } }
      ctx.auth.getUserOrFail.mockReturnValue(user)
      mockAuthService.logout.mockResolvedValue(undefined)

      await authController.logout(ctx)

      expect(ctx.auth.getUserOrFail).toHaveBeenCalled()
      expect(mockAuthService.logout).toHaveBeenCalledWith(user, 'token_id')
      expect(ctx.response.ok).toHaveBeenCalledWith({ message: 'Logged out successfully' })
    })
  })

  describe('me', () => {
    it('should return current user', async () => {
      const user = { id: 1, email: 'test@example.com', fullName: 'Test User' }
      ctx.auth.getUserOrFail.mockReturnValue(user)

      await authController.me(ctx)

      expect(ctx.response.ok).toHaveBeenCalledWith({
        user: {
          id: user.id,
          email: user.email,
          name: user.fullName,
        },
      })
    })
  })
})
