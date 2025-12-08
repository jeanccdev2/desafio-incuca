/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Styles
import "unfonts.css";

// Stores
import { useAuthStore } from "@/stores/auth";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");

// Inicializar auth store após montagem
const authStore = useAuthStore();
authStore.initialize();
