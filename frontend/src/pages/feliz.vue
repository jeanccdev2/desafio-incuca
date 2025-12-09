<template>
    <v-container class="fill-height mood-container-happy" fluid @click="handleClick">
        <v-row align="center" justify="center">
            <v-col cols="12" class="text-center">
                <MoodCard :emoji="moodStore.moodEmoji" :title="moodStore.moodDescription"
                    description="🎉 Você está completamente feliz! 🎉" :happiness="moodStore.happiness"
                    card-class="mood-card-happy" emoji-class="celebrate-emoji" title-class="text-happy"
                    subtitle-class="text-success" progress-color="success">
                    <p class="text-body-1 text-medium-emphasis">
                        Clique em qualquer lugar para voltar ao início
                    </p>
                </MoodCard>

                <!-- Confetes -->
                <div class="confetti-container">
                    <div v-for="i in 30" :key="i" class="confetti" :style="{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        backgroundColor: getRandomColor(),
                        transform: `rotate(${Math.random() * 360}deg)`
                    }" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMoodStore } from '@/stores/mood'
import MoodCard from '@/components/MoodCard.vue'

const router = useRouter()
const moodStore = useMoodStore()

onMounted(() => {
    moodStore.setMood('happy')
})

// Ao clicar, reseta e volta para inicial
function handleClick() {
    moodStore.reset()
    router.push('/inicial')
}

// Retorna cor aleatória para os confetes
function getRandomColor(): string {
    const colors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24',
        '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe',
        '#fd79a8', '#fdcb6e', '#e17055', '#00b894'
    ]
    return colors[Math.floor(Math.random() * colors.length)] || '#667eea'
}
</script>

<style scoped>
.mood-container-happy {
    min-height: 100vh;
    background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    position: relative;
}

.mood-container-happy:hover {
    background: linear-gradient(135deg, #fdcb6e 0%, #ffeaa7 100%);
}

.mood-card-happy {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;
    position: relative;
    z-index: 2;
}

.mood-card-happy:hover {
    transform: scale(1.05);
}

.celebrate-emoji {
    font-size: 120px;
    line-height: 1;
    animation: celebrate 1s ease-in-out infinite;
}

.text-happy {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

@keyframes celebrate {

    0%,
    100% {
        transform: scale(1) rotate(0deg);
    }

    25% {
        transform: scale(1.2) rotate(-10deg);
    }

    75% {
        transform: scale(1.2) rotate(10deg);
    }
}

.confetti-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    top: -10px;
    animation: fall-confetti 5s linear infinite;
    opacity: 0.8;
}

@keyframes fall-confetti {
    0% {
        top: -10%;
        transform: translateX(0) rotateZ(0deg);
    }

    100% {
        top: 110%;
        transform: translateX(100px) rotateZ(720deg);
    }
}
</style>
