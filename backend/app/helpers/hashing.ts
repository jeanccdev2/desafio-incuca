import hash from '@adonisjs/core/services/hash'

export class Hashing {
  static async verify(original: string, hashed: string): Promise<boolean> {
    return await hash.verify(original, hashed)
  }
}
