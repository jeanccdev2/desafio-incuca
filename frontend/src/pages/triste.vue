<template>
  <v-container class="fill-height mood-container-sad" fluid @click="handleClick">
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-card class="mx-auto mood-card-sad" max-width="600" elevation="8">
          <v-card-text class="pa-12">
            <div class="mood-emoji mb-6">
              {{ moodStore.moodEmoji }}
            </div>
            <h1 class="text-h3 mb-4 text-sad">{{ moodStore.moodDescription }}</h1>
            <p class="text-h6 text-medium-emphasis">
              A vida é difícil... Clique para melhorar
            </p>
            
            <div class="mt-6">
              <v-progress-linear
                :model-value="moodStore.happiness"
                color="error"
                height="8"
                rounded
              />
              <p class="text-caption mt-2">
                Nível de felicidade: {{ moodStore.happiness }}%
              </p>
            </div>

            <!-- Efeito de lágrimas -->
            <div class="tears">
              <div class="tear" v-for="i in 3" :key="i" :style="{ left: `${20 + i * 25}%`, animationDelay: `${i * 0.5}s` }">💧</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMoodStore } from '@/stores/mood'

const router = useRouter()
const moodStore = useMoodStore()

onMounted(() => {
  moodStore.setMood('sad')
})

// Ao clicar, vai para poker-face e busca piada
function handleClick() {
  router.push('/poker-face')
}
</script>

<style scoped>
.mood-container-sad {
  min-height: 100vh;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  cursor: pointer;
  transition: all 0.3s ease;
}

.mood-container-sad:hover {
  background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
}

.mood-card-sad {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
  position: relative;
  overflow: visible;
}

.mood-card-sad:hover {
  transform: scale(1.05);
}

.mood-emoji {
  font-size: 120px;
  line-height: 1;
  animation: shake 2s ease-in-out infinite;
}

.text-sad {
  color: #5a6c7d;
}

@keyframes shake {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
}

.tears {
  position: absolute;
  top: 180px;
  left: 0;
  right: 0;
  pointer-events: none;
}

.tear {
  position: absolute;
  font-size: 24px;
  animation: fall 3s ease-in infinite;
}

@keyframes fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(200px);
    opacity: 0;
  }
}
</style>
