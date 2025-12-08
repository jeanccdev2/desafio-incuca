import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Tipos de humor possíveis
export type MoodType = "neutral" | "sad" | "poker" | "happy";

// Store de humor - gerencia o estado emocional da aplicação
export const useMoodStore = defineStore("mood", () => {
  // State
  const currentMood = ref<MoodType>("neutral");
  const happiness = ref(0); // 0 a 100

  // Getters
  const moodEmoji = computed(() => {
    switch (currentMood.value) {
      case "neutral":
        return "😐";
      case "sad":
        return "😢";
      case "poker":
        return "😑";
      case "happy":
        return "😊";
      default:
        return "😐";
    }
  });

  const moodDescription = computed(() => {
    switch (currentMood.value) {
      case "neutral":
        return "Nem feliz, nem triste";
      case "sad":
        return "100% triste";
      case "poker":
        return "Poker face";
      case "happy":
        return "100% feliz";
      default:
        return "";
    }
  });

  const isFullyHappy = computed(() => happiness.value >= 100);

  // Define o humor atual
  function setMood(mood: MoodType) {
    currentMood.value = mood;

    // Ajusta o nível de felicidade baseado no humor
    switch (mood) {
      case "neutral":
        happiness.value = 50;
        break;
      case "sad":
        happiness.value = 0;
        break;
      case "poker":
        happiness.value = 25;
        break;
      case "happy":
        happiness.value = 100;
        break;
    }
  }

  // Incrementa a felicidade gradualmente (ao ler piadas)
  function increaseHappiness(amount: number = 25) {
    happiness.value = Math.min(100, happiness.value + amount);

    // Atualiza o humor baseado no nível de felicidade
    if (happiness.value >= 100) {
      currentMood.value = "happy";
    } else if (happiness.value >= 50) {
      currentMood.value = "poker";
    }
  }

  // Reseta o humor para o estado inicial
  function reset() {
    currentMood.value = "neutral";
    happiness.value = 50;
  }

  return {
    // State
    currentMood,
    happiness,
    // Getters
    moodEmoji,
    moodDescription,
    isFullyHappy,
    // Actions
    setMood,
    increaseHappiness,
    reset,
  };
});
