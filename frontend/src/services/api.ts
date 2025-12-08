import axios from "axios";

/**
 * Instância configurada do axios para comunicação com a API
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3333/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor de requisição para adicionar token JWT
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de resposta para tratar erros de autenticação
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401, 498].includes(error.response?.status)) {
      // Token expirado ou inválido
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
