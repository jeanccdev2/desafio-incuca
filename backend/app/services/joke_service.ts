import JokeRepository from '#repositories/joke_repository'

export interface JokeResponse {
  joke: string
}

// Service de piadas - contém lógica de negócio
export default class JokeService {
  private jokeRepository: JokeRepository

  constructor() {
    this.jokeRepository = new JokeRepository()
  }

  // Buscar uma piada aleatória
  async getRandomJoke(): Promise<JokeResponse> {
    try {
      const jokeData = await this.jokeRepository.fetchRandomJoke()
      return jokeData
    } catch (error) {
      console.error('Error fetching joke:', error)
      throw new Error('Failed to fetch joke')
    }
  }

  // Verificar se o serviço de piadas está disponível
  async checkHealth(): Promise<boolean> {
    return await this.jokeRepository.checkApiHealth()
  }
}
