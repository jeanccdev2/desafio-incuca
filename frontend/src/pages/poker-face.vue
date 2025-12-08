<template>
  <v-container class="fill-height mood-container-poker" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-card class="mx-auto mood-card-poker" max-width="600" elevation="8">
          <v-card-text class="pa-12">
            <div class="mood-emoji mb-6">
              {{ moodStore.moodEmoji }}
            </div>
            <h1 class="text-h3 mb-4">{{ moodStore.moodDescription }}</h1>
            <p class="text-h6 text-medium-emphasis mb-4">
              Leia as piadas para melhorar seu humor!
            </p>
            
            <div class="mt-6">
              <v-progress-linear
                :model-value="moodStore.happiness"
                color="warning"
                height="8"
                rounded
              />
              <p class="text-caption mt-2">
                Nível de felicidade: {{ moodStore.happiness }}%
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal de Piadas -->
    <v-dialog
      v-model="showJokeModal"
      persistent
      max-width="700"
    >
      <v-card class="joke-modal">
        <v-card-title class="text-h5 pa-6 bg-gradient text-white">
          <v-icon start color="white">mdi-emoticon-happy</v-icon>
          Piada Geek #{{ jokesRead }}
        </v-card-title>

        <v-card-text class="pa-6">
          <div v-if="loadingJoke" class="text-center py-8">
            <v-progress-circular indeterminate color="primary" size="64" />
            <p class="text-h6 mt-4">Buscando piada...</p>
          </div>

          <div v-else-if="currentJoke" class="joke-content">
            <p class="text-h6 mb-4">{{ currentJoke }}</p>
            
            <v-alert
              type="info"
              variant="tonal"
              class="mt-4"
              icon="mdi-information"
            >
              Leia {{ jokesNeeded - jokesRead }} piada(s) para ficar 100% feliz!
            </v-alert>
          </div>

          <v-alert
            v-if="error"
            type="error"
            variant="tonal"
            class="mt-4"
            closable
            @click:close="error = null"
          >
            {{ error }}
          </v-alert>
        </v-card-text>

        <v-card-actions class="pa-6">
          <v-btn
            color="primary"
            variant="outlined"
            :disabled="loadingJoke"
            @click="fetchJoke"
          >
            <v-icon start>mdi-refresh</v-icon>
            Outra piada
          </v-btn>

          <v-spacer />

          <v-btn
            color="success"
            variant="elevated"
            :disabled="!moodStore.isFullyHappy"
            @click="closeModal"
          >
            <v-icon start>mdi-check</v-icon>
            {{ moodStore.isFullyHappy ? 'Estou Feliz!' : `Preciso de mais ${jokesNeeded - jokesRead} piada(s)` }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMoodStore } from '@/stores/mood'
import jokeService from '@/services/joke.service'

const router = useRouter()
const moodStore = useMoodStore()

const showJokeModal = ref(false)
const currentJoke = ref('')
const loadingJoke = ref(false)
const error = ref<string | null>(null)
const jokesRead = ref(0)
const jokesNeeded = 4 // Número de piadas necessárias para ficar 100% feliz

onMounted(() => {
  moodStore.setMood('poker')
  showJokeModal.value = true
  fetchJoke()
})

async function fetchJoke() {
  loadingJoke.value = true
  error.value = null

  try {
    const response = await jokeService.getRandomJoke()
    currentJoke.value = response.joke
    
    // Incrementa contador e felicidade
    jokesRead.value++
    moodStore.increaseHappiness(25)
  } catch (err: any) {
    error.value = err.message
  } finally {
    loadingJoke.value = false
  }
}

// Fecha modal e volta para inicial
function closeModal() {
  if (moodStore.isFullyHappy) {
    router.push('/feliz')
  }
}
</script>

<style scoped>
.mood-container-poker {
  min-height: 100vh;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.mood-card-poker {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.mood-emoji {
  font-size: 120px;
  line-height: 1;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.joke-modal {
  border-radius: 16px;
  overflow: hidden;
}

.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.joke-content {
  min-height: 120px;
  padding: 20px;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  border-radius: 12px;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
