import { describe, it, expect, vi, beforeEach } from 'vitest'
import AuthService from '#services/auth_service'

// Mock UserRepository
vi.mock('#repositories/user_repository')

// Mock Hashing helper
vi.mock('#helpers/hashing.js', () => {
  return {
    Hashing: {
      verify: vi.fn(),
    },
  }
})

describe('AuthService', () => {
  let authService: AuthService
  let mockRepo: any

  beforeEach(() => {
    vi.clearAllMocks()
    // When classes are mocked, new Class() returns an instance of the mock
    authService = new AuthService()
    // Access the mock instance created inside the constructor
    // Since we mocked the module, the default export is the mocked class.
    // We can access instances via .mock.instances if it's a vitest mock.
    // However, simpler is to access the property on the service service if public, or via reflection/cast.
    mockRepo = (authService as any).userRepository
  })

  it('should login successfully with valid credentials', async () => {
    const credentials = { email: 'test@example.com', password: 'password' }
    const user = {
      id: 1,
      email: 'test@example.com',
      password: 'hashed_password',
      fullName: 'Test User',
      serialize: vi.fn(),
    }
    const token = {
      value: {
        release: () => 'mock_token',
      },
    }

    mockRepo.findByEmail.mockResolvedValue(user)
    mockRepo.login.mockResolvedValue(token)

    // We need to ensure Hashing.verify returns true
    // Since we mocked '#helpers/hashing', we need to control it.
    // Note: If the source imports relatively, mocking '#helpers/hashing' might fail if vitest doesn't map it.
    // But we setup aliases.
    const { Hashing } = await import('../../../app/helpers/hashing.js')
    vi.mocked(Hashing.verify).mockResolvedValue(true)

    const response = await authService.login(credentials)

    expect(response.token).toBe('mock_token')
    expect(response.user.email).toBe('test@example.com')
    expect(mockRepo.findByEmail).toHaveBeenCalledWith(credentials.email)
    expect(Hashing.verify).toHaveBeenCalledWith(user.password, credentials.password)
    expect(mockRepo.login).toHaveBeenCalledWith(user)
  })

  it('should throw error if user not found', async () => {
    const credentials = { email: 'wrong@example.com', password: 'password' }
    mockRepo.findByEmail.mockResolvedValue(null)

    await expect(authService.login(credentials)).rejects.toThrow('Invalid credentials')
    expect(mockRepo.findByEmail).toHaveBeenCalledWith(credentials.email)
  })

  it('should throw error if password invalid', async () => {
    const credentials = { email: 'test@example.com', password: 'wrong' }
    const user = { id: 1, email: 'test@example.com', password: 'hashed' }

    mockRepo.findByEmail.mockResolvedValue(user)
    const { Hashing } = await import('../../../app/helpers/hashing.js')
    vi.mocked(Hashing.verify).mockResolvedValue(false)

    await expect(authService.login(credentials)).rejects.toThrow('Invalid credentials')
  })
})
