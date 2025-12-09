<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" persistent
        max-width="700">
        <v-card class="joke-modal">
            <v-card-title class="text-h5 pa-6 bg-gradient text-white">
                <v-icon start color="white">mdi-emoticon-happy</v-icon>
                Piada Geek #{{ jokesRead }}
            </v-card-title>

            <v-card-text class="pa-6">
                <div v-if="loading" class="text-center py-8">
                    <v-progress-circular indeterminate color="primary" size="64" />
                    <p class="text-h6 mt-4">Buscando piada...</p>
                </div>

                <div v-else-if="joke" class="joke-content">
                    <p class="text-h6 mb-4">{{ joke }}</p>

                    <v-alert type="info" variant="tonal" class="mt-4" icon="mdi-information">
                        {{ jokesNeeded - jokesRead === 0
                            ? 'Você já atingiu o nível máximo de felicidade com nossas piadas!'
                            : `Leia ${jokesNeeded - jokesRead} piada(s) para ficar 100% feliz!`
                        }}
                    </v-alert>
                </div>

                <v-alert v-if="error" type="error" variant="tonal" class="mt-4" closable
                    @click:close="$emit('clear-error')">
                    {{ error }}
                </v-alert>
            </v-card-text>

            <v-card-actions class="pa-6">
                <v-btn color="primary" variant="outlined" :disabled="loading" @click="$emit('fetch-joke')">
                    <v-icon start>mdi-refresh</v-icon>
                    Outra piada
                </v-btn>

                <v-spacer />

                <v-btn color="success" variant="elevated" :disabled="!isFullyHappy" @click="$emit('finish')">
                    <v-icon start>mdi-check</v-icon>
                    {{ isFullyHappy ? 'Estou Feliz!' : `Preciso de mais ${jokesNeeded - jokesRead} piada(s)` }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: boolean
    joke: string
    loading: boolean
    error: string | null
    jokesRead: number
    jokesNeeded: number
    isFullyHappy: boolean
}>()

defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'fetch-joke'): void
    (e: 'finish'): void
    (e: 'clear-error'): void
}>()
</script>

<style scoped>
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
