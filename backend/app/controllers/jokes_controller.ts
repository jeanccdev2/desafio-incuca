import type { HttpContext } from '@adonisjs/core/http'
import JokeService from '#services/joke_service'

export default class JokesController {
  /**
   * Retorna uma piada aleatória da API externa
   * Endpoint protegido por autenticação
   */
  async random({ response }: HttpContext) {
    try {
      const jokeService = new JokeService()
      const joke = await jokeService.getRandomJoke()

      return response.ok(joke)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch joke',
      })
    }
  }
}
