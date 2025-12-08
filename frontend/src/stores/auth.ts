import { defineStore } from "pinia";
import { ref, computed } from "vue";
import authService, { type LoginCredentials } from "@/services/auth.service";

// Gerencia o estado de autenticação do usuário
export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref(authService.getUser());
  const token = ref(authService.getToken());
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const currentUser = computed(() => user.value);

  // Realiza login do usuário
  async function login(credentials: LoginCredentials) {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.login(credentials);
      user.value = response.user;
      token.value = response.token;
      return true;
    } catch (err: any) {
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  }

  // Realiza logout do usuário
  function logout() {
    authService.logout();
    user.value = null;
    token.value = null;
  }

  // Inicializa o store verificando se há sessão ativa
  function initialize() {
    const storedUser = authService.getUser();
    const storedToken = authService.getToken();

    if (storedUser && storedToken) {
      user.value = storedUser;
      token.value = storedToken;
    }
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    // Getters
    isAuthenticated,
    currentUser,
    // Actions
    login,
    logout,
    initialize,
  };
});
