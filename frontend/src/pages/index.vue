<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <v-progress-circular indeterminate color="primary" size="64" />
        <p class="text-h6 mt-4">Carregando...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Ao montar, redireciona baseado no estado de autenticação
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.replace('/inicial')
  } else {
    router.replace('/login')
  }
})
</script>
