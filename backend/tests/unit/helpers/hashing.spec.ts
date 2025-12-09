import { describe, it, expect, vi } from 'vitest'
import { Hashing } from '../../../app/helpers/hashing.js'
import hash from '@adonisjs/core/services/hash'

// Mock the Adonis hash service
vi.mock('@adonisjs/core/services/hash', () => {
  return {
    default: {
      verify: vi.fn(),
      make: vi.fn(),
    },
  }
})

describe('Hashing Helper', () => {
  it('should verify a hash correctly', async () => {
    // Arrange
    const password = 'my_password'
    const hashedPassword = 'hashed_password'
    const mockVerify = vi.mocked(hash.verify)
    mockVerify.mockResolvedValue(true)

    // Act
    const result = await Hashing.verify(password, hashedPassword)

    // Assert
    expect(result).toBe(true)
    expect(mockVerify).toHaveBeenCalledWith(password, hashedPassword)
  })

  it('should return false for invalid hash', async () => {
    // Arrange
    const password = 'my_password'
    const hashedPassword = 'wrong_hash'
    const mockVerify = vi.mocked(hash.verify)
    mockVerify.mockResolvedValue(false)

    // Act
    const result = await Hashing.verify(password, hashedPassword)

    // Assert
    expect(result).toBe(false)
    expect(mockVerify).toHaveBeenCalledWith(password, hashedPassword)
  })
})
