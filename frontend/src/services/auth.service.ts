import api from "./api";

// Interface para dados de login
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interface para resposta de autenticação
export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name?: string;
  };
}

// Service de autenticação - encapsula lógica de login e gestão de tokens
class AuthService {
  // Realiza login do usuário
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", credentials);
      const { token, user } = response.data;

      // Persistir token e dados do usuário na sessão
      this.setToken(token);
      this.setUser(user);

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Erro ao realizar login"
      );
    }
  }

  // Realiza logout do usuário
  logout(): void {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  }

  // Armazena token JWT no localStorage
  private setToken(token: string): void {
    localStorage.setItem("auth_token", token);
  }

  // Armazena dados do usuário no localStorage
  private setUser(user: any): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  // Recupera token JWT do localStorage
  getToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  // Recupera dados do usuário do localStorage
  getUser(): any | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  // Verifica se usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();
