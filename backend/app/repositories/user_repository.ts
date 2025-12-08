import User from '#models/user'
import { AccessToken } from '@adonisjs/auth/access_tokens'

// Repository para operações de banco de dados relacionadas a usuários
export default class UserRepository {
  // Buscar usuário por email
  async findByEmail(email: string): Promise<User | null> {
    return await User.findBy('email', email)
  }

  // Buscar usuário por ID
  async findById(id: number): Promise<User | null> {
    return await User.find(id)
  }

  // Criar novo usuário
  async create(data: { email: string; password: string; fullName?: string }): Promise<User> {
    return await User.create(data)
  }

  // Verificar se email já existe
  async emailExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email)
    return user !== null
  }

  // Atualizar usuário
  async update(user: User, data: Partial<User>): Promise<User> {
    user.merge(data)
    await user.save()
    return user
  }

  // Deletar usuário
  async delete(user: User): Promise<void> {
    await user.delete()
  }

  // Listar todos os usuários (com paginação opcional)
  async list(page: number = 1, limit: number = 20) {
    return await User.query().paginate(page, limit)
  }

  // Login
  async login(user: User, expiresIn?: string): Promise<AccessToken> {
    return await User.accessTokens.create(user, ['*'], {
      expiresIn: expiresIn || '1 day',
    })
  }

  // Logout
  async logout(user: User, tokenIdentifier: string): Promise<void> {
    await User.accessTokens.delete(user, tokenIdentifier)
  }
}
