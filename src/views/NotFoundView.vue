<template>
  <div class="container relative min-h-screen">
    <div class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    <div class="flex min-h-screen flex-col items-center justify-center text-center">
      <div class="space-y-4">
        <div class="space-y-2">
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">404</h1>
          <h2 class="text-xl font-semibold tracking-tight sm:text-2xl">
            Sayfa Bulunamadı
          </h2>
          <p class="text-muted-foreground">
            Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.
          </p>
        </div>
        <div class="flex justify-center gap-4">
          <router-link to="/" class="btn btn-primary">
            Ana Sayfaya Dön
          </router-link>
          <button class="btn btn-outline" @click="goBack">
            Geri Git
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script> 