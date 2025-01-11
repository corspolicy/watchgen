<template>
  <div class="container mx-auto max-w-md py-16">
    <div class="rounded-lg border border-border bg-card p-8">
      <h1 class="mb-6 text-2xl font-bold">Hesap Oluştur</h1>
      
      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Kullanıcı Adı -->
        <div>
          <label for="username" class="mb-2 block text-sm font-medium">Kullanıcı Adı</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="input w-full"
            placeholder="kullanici_adi"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="mb-2 block text-sm font-medium">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="input w-full"
            placeholder="ornek@email.com"
          />
        </div>

        <!-- Şifre -->
        <div>
          <label for="password" class="mb-2 block text-sm font-medium">Şifre</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="input w-full"
            placeholder="••••••••"
          />
        </div>

        <!-- Şifre Tekrar -->
        <div>
          <label for="confirmPassword" class="mb-2 block text-sm font-medium">Şifre Tekrar</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="input w-full"
            placeholder="••••••••"
          />
        </div>

        <!-- Kullanım Koşulları -->
        <div class="flex items-start">
          <div class="flex h-5 items-center">
            <input
              id="terms"
              v-model="acceptTerms"
              type="checkbox"
              required
              class="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
            />
          </div>
          <div class="ml-3">
            <label for="terms" class="text-sm">
              <router-link to="/terms" class="text-primary hover:underline">Kullanım koşullarını</router-link>
              okudum ve kabul ediyorum
            </label>
          </div>
        </div>

        <!-- Hata Mesajı -->
        <div v-if="error" class="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
          {{ error }}
        </div>

        <!-- Kayıt Ol Butonu -->
        <button type="submit" class="btn btn-primary w-full" :disabled="loading || !isFormValid">
          <span v-if="loading">Kayıt yapılıyor...</span>
          <span v-else>Kayıt Ol</span>
        </button>
      </form>

      <!-- Giriş Yap Linki -->
      <p class="mt-4 text-center text-sm">
        Zaten hesabın var mı?
        <router-link to="/login" class="text-primary hover:underline">
          Giriş yap
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/auth'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const loading = ref(false)
const error = ref('')

const isFormValid = computed(() => {
  return (
    username.value.length >= 3 &&
    email.value.includes('@') &&
    password.value.length >= 6 &&
    password.value === confirmPassword.value &&
    acceptTerms.value
  )
})

const handleRegister = async () => {
  if (!isFormValid.value) {
    error.value = 'Lütfen tüm alanları doğru şekilde doldurun.'
    return
  }

  try {
    loading.value = true
    error.value = ''
    
    await register(username.value, email.value, password.value)
    
    // Başarılı kayıt sonrası giriş sayfasına yönlendir
    router.push('/login')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Kayıt sırasında bir hata oluştu.'
  } finally {
    loading.value = false
  }
}
</script> 