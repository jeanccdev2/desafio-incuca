<template>
  <v-container class="fill-height mood-container" fluid @click="handleClick">
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-card class="mx-auto mood-card" max-width="600" elevation="8">
          <v-card-text class="pa-12">
            <div class="mood-emoji mb-6">
              {{ moodStore.moodEmoji }}
            </div>
            <h1 class="text-h3 mb-4">{{ moodStore.moodDescription }}</h1>
            <p class="text-h6 text-medium-emphasis">
              Clique em qualquer lugar para começar
            </p>
            
            <div class="mt-6">
              <v-progress-linear
                :model-value="moodStore.happiness"
                color="primary"
                height="8"
                rounded
              />
              <p class="text-caption mt-2">
                Nível de felicidade: {{ moodStore.happiness }}%
              </p>
            </div>
          </v-card-text>
        </v-card>

        <v-btn
          class="mt-6"
          color="error"
          variant="outlined"
          @click.stop="handleLogout"
        >
          <v-icon start>mdi-logout</v-icon>
          Sair
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMoodStore } from '@/stores/mood'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const moodStore = useMoodStore()
const authStore = useAuthStore()

onMounted(() => {
  moodStore.setMood('neutral')
})

// Ao clicar na tela, muda para triste
function handleClick() {
  router.push('/triste')
}

// Realiza logout
function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.mood-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  transition: all 0.3s ease;
}

.mood-container:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.mood-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.mood-card:hover {
  transform: scale(1.05);
}

.mood-emoji {
  font-size: 120px;
  line-height: 1;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>
