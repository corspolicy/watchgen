<!-- Coded By PersoDev in 2025 for WatchGen -->
<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold">Yönetim Paneli</h2>
      <p class="text-sm text-muted-foreground">WatchGen yönetim paneline hoş geldiniz.</p>
    </div>

    <!-- İstatistikler -->
    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-lg border border-border p-4">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-primary/10 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-muted-foreground">Toplam Anime</p>
            <p class="text-2xl font-bold">150</p>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-border p-4">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-primary/10 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-muted-foreground">Toplam Kullanıcı</p>
            <p class="text-2xl font-bold">1000</p>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-border p-4">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-primary/10 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-muted-foreground">Toplam İzlenme</p>
            <p class="text-2xl font-bold">50000</p>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-border p-4">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-primary/10 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-muted-foreground">Toplam Bölüm</p>
            <p class="text-2xl font-bold">3000</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Ana Menü -->
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <!-- Son Eklenen Animeler -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Son Eklenen Animeler</h3>
          <router-link to="/admin/anime" class="text-sm text-primary hover:underline">Tümünü Gör</router-link>
        </div>
        <div class="space-y-4">
          <div v-for="anime in recentAnime" :key="anime.id" class="flex items-center justify-between rounded-lg border border-border p-4">
            <div class="flex items-center gap-4">
              <img :src="anime.image" :alt="anime.title" class="h-12 w-12 rounded-lg object-cover" />
              <div>
                <p class="font-medium">{{ anime.title }}</p>
                <p class="text-sm text-muted-foreground">{{ anime.date }}</p>
              </div>
            </div>
            <router-link :to="'/admin/anime/' + anime.id + '/edit'" class="text-sm text-primary hover:underline">
              Düzenle
            </router-link>
          </div>
        </div>
      </div>

      <!-- Son Aktiviteler -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Son Aktiviteler</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-4 rounded-lg border border-border p-4">
            <div class="rounded-full bg-primary/10 p-2">
              <component :is="activity.icon" class="h-5 w-5 text-primary" />
            </div>
            <div>
              <p class="font-medium">
                <span class="text-primary">{{ activity.user }}</span>
                {{ activity.action }}
              </p>
              <p class="text-sm text-muted-foreground">{{ activity.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hızlı Erişim -->
    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <router-link to="/admin/anime/add" class="group rounded-lg border border-border p-4 transition-colors hover:border-primary">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary transition-colors group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <p class="font-medium">Anime Ekle</p>
            <p class="text-sm text-muted-foreground">Yeni anime ekle</p>
          </div>
        </div>
      </router-link>

      <router-link to="/admin/users" class="group rounded-lg border border-border p-4 transition-colors hover:border-primary">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary transition-colors group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <p class="font-medium">Kullanıcılar</p>
            <p class="text-sm text-muted-foreground">Kullanıcıları yönet</p>
          </div>
        </div>
      </router-link>

      <router-link to="/admin/subtitles" class="group rounded-lg border border-border p-4 transition-colors hover:border-primary">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary transition-colors group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <div>
            <p class="font-medium">Altyazılar</p>
            <p class="text-sm text-muted-foreground">Altyazıları yönet</p>
          </div>
        </div>
      </router-link>

      <router-link to="/admin/settings" class="group rounded-lg border border-border p-4 transition-colors hover:border-primary">
        <div class="flex items-center gap-4">
          <div class="rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary transition-colors group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p class="font-medium">Ayarlar</p>
            <p class="text-sm text-muted-foreground">Site ayarlarını yönet</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Son eklenen animeler
const recentAnime = ref([
  {
    id: 1,
    title: 'Demon Slayer',
    image: '/images/demon-slayer.jpg',
    date: '25 Aralık 2023 15:00'
  },
  {
    id: 2,
    title: 'Attack on Titan',
    image: '/images/attack-on-titan.jpg',
    date: '24 Aralık 2023 18:30'
  }
])

// Son aktiviteler
const recentActivities = ref([
  {
    id: 1,
    user: 'Admin',
    action: 'yeni bir anime ekledi: Demon Slayer',
    date: '25 Aralık 2023 15:00',
    icon: 'PlusIcon'
  },
  {
    id: 2,
    user: 'Moderatör',
    action: 'Attack on Titan animesini düzenledi',
    date: '24 Aralık 2023 18:30',
    icon: 'PencilIcon'
  }
])
</script> 