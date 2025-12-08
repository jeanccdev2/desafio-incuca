<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="elevation-12 rounded-lg">
          <v-card-title class="text-h4 pa-6 text-center bg-gradient">
            <div class="w-100">
              <div class="text-h3 mb-2">😄</div>
              <div>Melhore seu Humor</div>
              <div class="text-subtitle-2 text-medium-emphasis mt-2">
                Faça login para acessar piadas geek
              </div>
            </div>
          </v-card-title>

          <v-card-text class="pa-6">
            <v-form ref="formRef" v-model="valid" @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                placeholder="Digite seu e-mail"
                prepend-inner-icon="mdi-email"
                type="email"
                variant="outlined"
                color="primary"
                class="mb-3"
                required
              />

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Senha"
                placeholder="Digite sua senha"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                variant="outlined"
                color="primary"
                class="mb-3"
                required
                @click:append-inner="showPassword = !showPassword"
              />

              <v-alert
                v-if="authStore.error"
                type="error"
                variant="tonal"
                class="mb-4"
                closable
                @click:close="authStore.error = null"
              >
                {{ authStore.error }}
              </v-alert>

              <v-btn
                type="submit"
                :loading="authStore.loading"
                :disabled="!valid || authStore.loading"
                block
                color="primary"
                size="large"
                class="mb-3"
              >
                Entrar
              </v-btn>

              <div class="text-center text-caption text-medium-emphasis">
                Use: cliente@incuca.com.br
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formRef = ref()
const valid = ref(false)
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const emailRules = [
  (v: string) => !!v || 'E-mail é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
]

const passwordRules = [
  (v: string) => !!v || 'Senha é obrigatória',
  (v: string) => v.length >= 8 || 'Senha deve ter no mínimo 8 caracteres',
]

// Realiza o login do usuário
async function handleLogin() {
  if (!valid.value) return

  const success = await authStore.login({
    email: email.value,
    password: password.value,
  })

  if (success) {
    router.push('/inicial')
  }
}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.fill-height {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f5f7fa 0%, #c3cfe2 100%);
}
</style>
