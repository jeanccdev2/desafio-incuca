import { vi } from 'vitest'

// Mock Hash service
vi.mock('@adonisjs/core/services/hash', () => {
  return {
    default: {
      use: vi.fn().mockReturnThis(),
      make: vi.fn(),
      verify: vi.fn(),
    },
  }
})

// Mock Database/Lucid if needed
vi.mock('@adonisjs/lucid/orm', () => ({
  BaseModel: class {},
  column: Object.assign(() => {}, { dateTime: () => {} }),
}))

// Mock Auth mixin
vi.mock('@adonisjs/auth/mixins/lucid', () => ({
  withAuthFinder: () => (base: any) => base,
}))

// Mock Access Tokens
vi.mock('@adonisjs/auth/access_tokens', () => ({
  DbAccessTokensProvider: {
    forModel: vi.fn(),
  },
}))
