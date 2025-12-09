<template>
  <v-container class="fill-height mood-container-poker" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <MoodCard :emoji="moodStore.moodEmoji" :title="moodStore.moodDescription"
          description="Leia as piadas para melhorar seu humor!" :happiness="moodStore.happiness"
          card-class="mood-card-poker" emoji-class="bounce-emoji" progress-color="warning" />
      </v-col>
    </v-row>

    <!-- Modal de Piadas -->
    <JokeDialog v-model="showJokeModal" :joke="currentJoke" :loading="loadingJoke" :error="error"
      :jokes-read="jokesRead" :jokes-needed="jokesNeeded" :is-fully-happy="moodStore.isFullyHappy"
      @fetch-joke="fetchJoke" @finish="closeModal" @clear-error="error = null" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMoodStore } from '@/stores/mood'
import jokeService from '@/services/joke.service'
import MoodCard from '@/components/MoodCard.vue'
import JokeDialog from '@/components/JokeDialog.vue'

const router = useRouter()
const moodStore = useMoodStore()

const showJokeModal = ref(false)
const currentJoke = ref('')
const loadingJoke = ref(false)
const error = ref<string | null>(null)
const jokesRead = ref(0)
const jokesNeeded = 3

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

.bounce-emoji {
  font-size: 120px;
  line-height: 1;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}
</style>
