/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

// Navigation guard para proteger rotas que requerem autenticação
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);

  // Se a rota requer autenticação e o usuário não está autenticado
  if (authRequired && !authStore.isAuthenticated) {
    return next("/login");
  }

  // Se está autenticado e tentando acessar login, redireciona para inicial
  if (to.path === "/login" && authStore.isAuthenticated) {
    return next("/inicial");
  }

  // Redireciona raiz para /inicial se autenticado, senão para /login
  if (to.path === "/") {
    return next(authStore.isAuthenticated ? "/inicial" : "/login");
  }

  next();
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (localStorage.getItem("vuetify:dynamic-reload")) {
      console.error("Dynamic import error, reloading page did not fix it", err);
    } else {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
