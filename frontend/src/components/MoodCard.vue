<template>
    <v-card :class="['mx-auto', cardClass]" max-width="600" elevation="8">
        <v-card-text class="pa-12">
            <div class="mood-emoji mb-6" :class="emojiClass">
                <slot name="emoji">
                    {{ emoji }}
                </slot>
            </div>
            <h1 class="text-h3 mb-4" :class="titleClass">{{ title }}</h1>
            <p class="text-h6 mb-4" :class="subtitleClass">
                {{ description }}
            </p>

            <slot name="extra-content"></slot>

            <div class="mt-6">
                <v-progress-linear :model-value="happiness" :color="progressColor" height="8" rounded />
                <p class="text-caption mt-2">
                    Nível de felicidade: {{ happiness }}%
                </p>
            </div>

            <slot></slot>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
defineProps<{
    emoji?: string
    title: string
    description: string
    happiness: number
    cardClass?: string
    emojiClass?: string
    titleClass?: string
    subtitleClass?: string
    progressColor?: string
}>()
</script>

<style scoped>
.mood-emoji {
    font-size: 120px;
    line-height: 1;
}
</style>
