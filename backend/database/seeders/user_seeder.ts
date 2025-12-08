import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Criar usuário inicial conforme requisitos
    await User.firstOrCreate(
      { email: 'cliente@incuca.com.br' },
      {
        email: 'cliente@incuca.com.br',
        password: 'seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga',
        fullName: 'Cliente Incuca',
      }
    )
  }
}
