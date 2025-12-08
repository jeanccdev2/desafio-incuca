import User from '#models/user'
import UserRepository from '#repositories/user_repository'
import { Hashing } from '../helpers/hashing.js'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: number
    email: string
    name: string | null
  }
}

// Service de autenticação - contém lógica de negócio
export default class AuthService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  // Realizar login do usuário
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { email, password } = credentials

    // Buscar usuário via repository
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    // Verificar senha
    const isPasswordValid = await Hashing.verify(user.password, password)

    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    // Gerar token
    const token = await this.userRepository.login(user)

    return {
      token: token.value!.release(),
      user: {
        id: user.id,
        email: user.email,
        name: user.fullName,
      },
    }
  }

  // Buscar usuário por ID
  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id)
  }

  // Logout (invalidar token)
  async logout(user: User, tokenIdentifier: string): Promise<void> {
    await this.userRepository.logout(user, tokenIdentifier)
  }

  // Verificar se email existe
  async emailExists(email: string): Promise<boolean> {
    return await this.userRepository.emailExists(email)
  }
}
