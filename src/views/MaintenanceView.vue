<!-- Coded By PersoDev in 2025 for WatchGen -->
<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <h1 class="mb-4 text-4xl font-bold">🛠️ Bakım Modu</h1>
      <p class="mb-8 text-lg text-muted-foreground">{{ maintenanceMessage }}</p>
      <div v-if="isAdmin" class="space-y-4">
        <p class="text-sm text-muted-foreground">Admin olarak giriş yaptınız</p>
        <router-link to="/admin" class="btn btn-primary">Admin Paneline Git</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const maintenanceMessage = ref('Sitemiz bakımdadır. Lütfen daha sonra tekrar deneyin.')
const isAdmin = ref(false)

onMounted(() => {
  const settings = localStorage.getItem('siteSettings')
  if (settings) {
    const { maintenanceMessage: message } = JSON.parse(settings)
    maintenanceMessage.value = message
  }

  const user = localStorage.getItem('user')
  if (user) {
    const { role } = JSON.parse(user)
    isAdmin.value = role === 'admin'
  }
})
</script> 