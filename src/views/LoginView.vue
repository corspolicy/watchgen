<template>
  <div class="container mx-auto max-w-md py-16">
    <div class="rounded-lg border border-border bg-card p-8">
      <h1 class="mb-6 text-2xl font-bold">Giriş Yap</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email -->
        <div>
          <label for="email" class="mb-2 block text-sm font-medium"
            >Email</label
          >
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
          <label for="password" class="mb-2 block text-sm font-medium"
            >Şifre</label
          >
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="input w-full"
            placeholder="••••••••"
          />
        </div>

        <!-- Beni Hatırla -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember"
              v-model="rememberMe"
              type="checkbox"
              class="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
            />
            <label for="remember" class="ml-2 block text-sm"
              >Beni Hatırla</label
            >
          </div>
          <router-link
            to="/forgot-password"
            class="text-sm text-primary hover:underline"
          >
            Şifremi Unuttum
          </router-link>
        </div>

        <!-- Hata Mesajı -->
        <div
          v-if="error"
          class="rounded-md bg-destructive/10 p-4 text-sm text-destructive"
        >
          {{ error }}
        </div>

        <!-- Giriş Butonu -->
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="loading"
        >
          <span v-if="loading">Giriş yapılıyor...</span>
          <span v-else>Giriş Yap</span>
        </button>
      </form>

      <!-- Kayıt Ol Linki -->
      <p class="mt-4 text-center text-sm">
        Hesabın yok mu?
        <router-link to="/register" class="text-primary hover:underline">
          Hemen kayıt ol
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/auth";
import defaultApiInterface from "@/api/default";
import { AxiosError } from "axios";
import { User } from "@prisma/client";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const loading = ref(false);
const error = ref("");

const auth = useAuthStore();

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = "";

    // const response = await login(email.value, password.value)

    const response = await defaultApiInterface<User>({
      url: "/auth/login",
      data: {
        email: email.value,
        password: password.value,
      },
    }).catch((err: AxiosError) => {
      // burada hatayı handlelayabilirsin
      // şimdilik duz return atıcam
      return;
    });

    if (!response) return;

    auth.$state.user = response.data;

    auth.save();

    router.push("/");
  } catch (err: any) {
    error.value =
      err.response?.data?.message || "Giriş yapılırken bir hata oluştu.";
  } finally {
    loading.value = false;
  }
};
</script>
