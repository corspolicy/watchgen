<!-- Coded By PersoDev in 2025 for WatchGen -->
<template>
  <div class="min-h-screen bg-background">
    <div class="flex">
      <aside class="fixed inset-y-0 z-50 flex w-72 flex-col border-r border-border bg-card">
        <div class="flex h-16 items-center gap-2 border-b border-border px-6">
          <img src="@/assets/logo.svg" alt="WatchGen" class="h-8 w-8" />
          <span class="text-xl font-bold">Admin Panel</span>
        </div>

        <nav class="flex-1 space-y-1 px-3 py-4">
          <router-link to="/admin" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors" :class="{ 'bg-primary/10 text-primary': $route.name === 'admin-dashboard', 'hover:bg-muted': $route.name !== 'admin-dashboard' }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </router-link>

          <router-link to="/admin/anime" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors" :class="{ 'bg-primary/10 text-primary': $route.name?.startsWith('admin-anime'), 'hover:bg-muted': !$route.name?.startsWith('admin-anime') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            Anime Yönetimi
          </router-link>

          <router-link to="/admin/users" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors" :class="{ 'bg-primary/10 text-primary': $route.name === 'admin-users', 'hover:bg-muted': $route.name !== 'admin-users' }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Kullanıcı Yönetimi
          </router-link>

          <router-link to="/admin/subtitles" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors" :class="{ 'bg-primary/10 text-primary': $route.name === 'admin-subtitles', 'hover:bg-muted': $route.name !== 'admin-subtitles' }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            Altyazı Yönetimi
          </router-link>

          <router-link to="/admin/settings" class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors" :class="{ 'bg-primary/10 text-primary': $route.name === 'admin-settings', 'hover:bg-muted': $route.name !== 'admin-settings' }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Ayarlar
          </router-link>
        </nav>

        <div class="border-t border-border p-4">
          <div class="flex items-center gap-3">
            <img :src="user?.avatar" :alt="user?.username" class="h-10 w-10 rounded-full" />
            <div>
              <p class="text-sm font-medium">{{ user?.username }}</p>
              <p class="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
          <button @click="handleLogout" class="mt-4 flex w-full items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Çıkış Yap
          </button>
        </div>
      </aside>

      <main class="ml-72 flex-1 p-8">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('user')
  router.push('/login')
}

onMounted(() => {
  if (!user.value?.role === 'admin') {
    router.push('/login')
  }
})
</script> 