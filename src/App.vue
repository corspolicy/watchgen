<template>
  <div class="min-h-screen bg-background font-sans">
    <nav class="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-8">
          <router-link to="/" class="flex items-center gap-2">
            <img src="@/assets/logo.svg" alt="WatchGen" class="h-8 w-8" />
            <span class="text-xl font-bold text-foreground">WatchGen</span>
          </router-link>

          <div class="hidden md:flex md:items-center md:gap-6">
            <router-link to="/" class="nav-link" active-class="active">Ana Sayfa</router-link>
            <router-link to="/browse" class="nav-link" active-class="active">Keşfet</router-link>
            <router-link to="/popular" class="nav-link" active-class="active">Popüler</router-link>
            <router-link to="/seasonal" class="nav-link" active-class="active">Sezonluk</router-link>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="relative hidden md:block">
            <input
              type="search"
              placeholder="Anime ara..."
              class="input w-64"
            />
          </div>

          <div class="flex items-center gap-4">
            <router-link to="/login" class="nav-link" v-if="!isLoggedIn">
              Giriş Yap
            </router-link>
            <router-link to="/register" class="btn btn-primary" v-if="!isLoggedIn">
              Üye Ol
            </router-link>
            
            <div class="relative" v-else>
              <button class="flex items-center gap-2 rounded-full bg-card p-2 hover:bg-card-hover" @click="isProfileMenuOpen = !isProfileMenuOpen">
                <img
                  :src="user?.avatar || '/default-avatar.png'"
                  alt="Profil"
                  class="h-8 w-8 rounded-full object-cover"
                />
                <span class="hidden text-sm font-medium text-foreground md:block">
                  {{ user?.username }}
                </span>
              </button>

              <div v-if="isProfileMenuOpen" class="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card py-1 shadow-lg">
                <router-link to="/profile" class="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profilim
                </router-link>
                <router-link v-if="user?.role === 'admin'" to="/admin" class="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin Panel
                </router-link>
                <router-link to="/favorites" class="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Favorilerim
                </router-link>
                <router-link to="/watchlist" class="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  İzleme Listem
                </router-link>
                <div class="my-1 border-t border-border"></div>
                <button @click="handleLogout" class="flex w-full items-center px-4 py-2 text-sm text-destructive hover:bg-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>

          <button class="btn btn-outline p-2 md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- VUE NIN AMNASINI AVARADITNI SIEKYIM -->
    <main class="min-h-[calc(100vh-4rem)]">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="border-t border-border bg-background">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <img src="/logo.svg" alt="WatchGen" class="h-8 w-8" />
              <span class="text-xl font-bold text-foreground">WatchGen</span>
            </div>
            <p class="text-sm text-gray-400">
              Modern ve yenilikçi anime izleme platformu
            </p>
          </div>

          <div>
            <h3 class="mb-4 text-sm font-semibold text-foreground">Hızlı Bağlantılar</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><router-link to="/browse" class="hover:text-foreground">Keşfet</router-link></li>
              <li><router-link to="/popular" class="hover:text-foreground">Popüler</router-link></li>
              <li><router-link to="/seasonal" class="hover:text-foreground">Sezonluk</router-link></li>
              <li><router-link to="/random" class="hover:text-foreground">Rastgele</router-link></li>
            </ul>
          </div>

          <div>
            <h3 class="mb-4 text-sm font-semibold text-foreground">Yasal</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><router-link to="/terms" class="hover:text-foreground">Kullanım Koşulları</router-link></li>
              <li><router-link to="/privacy" class="hover:text-foreground">Gizlilik Politikası</router-link></li>
              <li><router-link to="/dmca" class="hover:text-foreground">DMCA</router-link></li>
              <li><router-link to="/contact" class="hover:text-foreground">İletişim</router-link></li>
            </ul>
          </div>

          <div>
            <h3 class="mb-4 text-sm font-semibold text-foreground">Bizi Takip Edin</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-foreground">
                <span class="sr-only">Discord</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-foreground">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675c0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646a4.118 4.118 0 001.804-2.27a8.224 8.224 0 01-2.605.996a4.107 4.107 0 00-6.993 3.743a11.65 11.65 0 01-8.457-4.287a4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022a4.095 4.095 0 01-1.853.07a4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-foreground">
                <span class="sr-only">GitHub</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483c0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608c1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951c0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65c0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027c.546 1.379.202 2.398.1 2.651c.64.7 1.028 1.595 1.028 2.688c0 3.848-2.339 4.695-4.566 4.943c.359.309.678.92.678 1.855c0 1.338-.012 2.419-.012 2.747c0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="mt-8 border-t border-border pt-8">
          <p class="text-center text-sm text-gray-400">
            &copy; {{ new Date().getFullYear() }} WatchGen. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const isProfileMenuOpen = ref(false)
const user = ref(null)

const checkMaintenanceMode = () => {
  const settings = localStorage.getItem('siteSettings')
  if (settings) {
    const parsedSettings = JSON.parse(settings)
    if (parsedSettings.maintenanceMode) {
      const userStr = localStorage.getItem('user')
      const user = userStr ? JSON.parse(userStr) : null
      const currentPath = router.currentRoute.value.path
      
      // Login sayfasında değilse ve admin değilse maintenance sayfasına yönlendir
      if (currentPath !== '/login' && currentPath !== '/maintenance' && (!user || user.role !== 'admin')) {
        router.push('/maintenance')
      }
    }
  }
}

onMounted(() => {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  if (token && userStr) {
    isLoggedIn.value = true
    user.value = JSON.parse(userStr)
  }
  checkMaintenanceMode()
})

watch(() => router.currentRoute.value.path, () => {
  checkMaintenanceMode()
})

const handleLogout = () => {
  isLoggedIn.value = false
  isProfileMenuOpen.value = false
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 