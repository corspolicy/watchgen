<!-- Coded By PersoDev in 2025 for WatchGen -->
<template>
  <div v-if="!authStore.initialized" class="flex h-[calc(100vh-4rem)] items-center justify-center">
    <div class="text-center">
      <svg class="mx-auto h-12 w-12 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="mt-4 text-sm text-muted-foreground">Yükleniyor...</p>
    </div>
  </div>

  <div v-else-if="!authStore.isAuthenticated" class="flex h-[calc(100vh-4rem)] items-center justify-center">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-destructive">Giriş Yapılmadı</h2>
      <p class="mt-2 text-muted-foreground">Bu sayfaya erişmek için giriş yapmanız gerekiyor.</p>
      <router-link to="/login" class="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
        Giriş Yap
      </router-link>
    </div>
  </div>

  <div v-else-if="!authStore.isAdmin" class="flex h-[calc(100vh-4rem)] items-center justify-center">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-destructive">Yetkisiz Erişim</h2>
      <p class="mt-2 text-muted-foreground">Bu sayfaya erişmek için yönetici yetkisine sahip olmanız gerekiyor.</p>
    </div>
  </div>

  <div v-else>
    <div class="mb-8">
      <h2 class="text-2xl font-bold">Site Ayarları</h2>
      <p class="text-sm text-muted-foreground">Genel site ayarlarını buradan yönetebilirsiniz.</p>
    </div>

    <!-- Başarılı Mesajı -->
    <div v-if="successMessage" class="mb-4 rounded-md bg-green-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- SEO Ayarları -->
      <div class="rounded-lg border border-border p-6">
        <h3 class="mb-4 text-lg font-semibold">SEO Ayarları</h3>
        <div class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-medium">Site Başlığı</label>
            <input v-model="form.siteTitle" type="text" class="input w-full" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">Site Açıklaması</label>
            <textarea v-model="form.siteDescription" class="input min-h-[100px] w-full"></textarea>
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">Anahtar Kelimeler</label>
            <input v-model="form.siteKeywords" type="text" class="input w-full" placeholder="anime, manga, izle, vb." />
          </div>
        </div>
      </div>

      <!-- Bakım Modu -->
      <div class="rounded-lg border border-border p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Bakım Modu</h3>
          <label class="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" v-model="form.maintenanceMode" class="peer sr-only" />
            <div class="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
          </label>
        </div>
        <div class="mt-4">
          <label class="mb-2 block text-sm font-medium">Bakım Mesajı</label>
          <textarea v-model="form.maintenanceMessage" class="input min-h-[100px] w-full"></textarea>
        </div>
      </div>

      <!-- İletişim Ayarları -->
      <div class="rounded-lg border border-border p-6">
        <h3 class="mb-4 text-lg font-semibold">İletişim Ayarları</h3>
        <div class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-medium">İletişim E-posta</label>
            <input v-model="form.contactEmail" type="email" class="input w-full" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">Discord</label>
            <input v-model="form.socialLinks.discord" type="url" class="input w-full" placeholder="https://discord.gg/..." />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">Twitter</label>
            <input v-model="form.socialLinks.twitter" type="url" class="input w-full" placeholder="https://twitter.com/..." />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">GitHub</label>
            <input v-model="form.socialLinks.github" type="url" class="input w-full" placeholder="https://github.com/..." />
          </div>
        </div>
      </div>

      <!-- Hata Mesajı -->
      <div v-if="error" class="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
        {{ error }}
      </div>

      <!-- Kaydet Butonu -->
      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          <span v-if="loading">
            <svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Kaydediliyor...
          </span>
          <span v-else>Kaydet</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const settingsStore = useSettingsStore()
const authStore = useAuthStore()
const loading = ref(false)
const error = ref('')
const successMessage = ref('')

const form = ref({
  siteTitle: '',
  siteDescription: '',
  siteKeywords: '',
  maintenanceMode: false,
  maintenanceMessage: '',
  contactEmail: '',
  socialLinks: {
    discord: '',
    twitter: '',
    github: ''
  }
})

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    successMessage.value = ''
    
    // Form validasyonu
    if (form.value.maintenanceMode && !form.value.maintenanceMessage) {
      error.value = 'Bakım modu açıkken bakım mesajı zorunludur.'
      return
    }

    const success = await settingsStore.updateSettings(form.value)
    if (success) {
      successMessage.value = 'Ayarlar başarıyla güncellendi!'
      // 3 saniye sonra başarı mesajını kaldır
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }
  } catch (err: any) {
    error.value = err.message || 'Ayarlar kaydedilirken bir hata oluştu'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    loading.value = true
    error.value = ''

    if (!authStore.initialized) {
      await authStore.initializeAuth()
    }

    if (!authStore.isAuthenticated) {
      router.push('/login')
      return
    }

    if (!authStore.isAdmin) {
      error.value = 'Bu sayfaya erişmek için yönetici yetkisine sahip olmanız gerekiyor.'
      return
    }

    await settingsStore.fetchSettings()
    form.value = { ...settingsStore.settings }
  } catch (err: any) {
    error.value = err.message || 'Ayarlar yüklenirken bir hata oluştu'
  } finally {
    loading.value = false
  }
})
</script> 