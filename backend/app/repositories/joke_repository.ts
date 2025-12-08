import axios from 'axios'

export interface JokeData {
  joke: string
}

// Repository para buscar piadas da API externa
export default class JokeRepository {
  private readonly apiUrl = 'https://geek-jokes.sameerkumar.website/api'

  // Buscar uma piada aleatória da API externa
  async fetchRandomJoke(): Promise<JokeData> {
    try {
      const response = await axios.get<string>(`${this.apiUrl}?format=json`)

      return {
        joke: response.data,
      }
    } catch (error) {
      throw new Error('Failed to fetch joke from external API')
    }
  }

  // Verificar se a API externa está disponível
  async checkApiHealth(): Promise<boolean> {
    try {
      await axios.get(this.apiUrl, { timeout: 5000 })
      return true
    } catch {
      return false
    }
  }
}
