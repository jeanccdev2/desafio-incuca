import api from "./api";

// Interface para resposta de piada
export interface Joke {
  joke: string;
}

// Service de piadas - encapsula lógica de busca de piadas do backend
class JokeService {
  // Busca uma piada aleatória do backend
  async getRandomJoke(): Promise<Joke> {
    try {
      const response = await api.get<Joke>("/jokes/random");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao buscar piada");
    }
  }
}

export default new JokeService();
