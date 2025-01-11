<template>
  <div class="min-h-screen py-16">
    <div class="container">
      <!-- Başlık ve Filtreler -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 class="text-3xl font-bold tracking-tight">Keşfet</h1>
        <div class="flex flex-wrap items-center gap-4">
          <!-- Arama -->
          <div class="relative flex-1 sm:flex-initial">
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Anime ara..."
              class="input w-full sm:w-64"
            />
          </div>

          <!-- Tür Filtresi -->
          <select v-model="selectedGenre" class="input w-full sm:w-auto">
            <option value="">Tüm Türler</option>
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
              {{ genre.name }}
            </option>
          </select>

          <!-- Sıralama -->
          <select v-model="sortBy" class="input w-full sm:w-auto">
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="rating">En Yüksek Puan</option>
            <option value="popularity">En Popüler</option>
          </select>
        </div>
      </div>

      <!-- Anime Grid -->
      <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div v-for="anime in filteredAnime" :key="anime.id" class="group relative overflow-hidden rounded-lg">
          <router-link :to="'/watch/' + anime.id">
            <div class="aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
              <img
                :src="anime.image"
                :alt="anime.title"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent p-6 flex flex-col justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 class="text-lg font-semibold text-foreground">{{ anime.title }}</h3>
              <div class="mt-2 flex items-center gap-2">
                <span class="text-sm text-muted-foreground">{{ anime.episodes }} Bölüm</span>
                <span class="text-xs text-muted-foreground">•</span>
                <span class="text-sm text-muted-foreground">{{ anime.rating }}/10</span>
              </div>
              <div class="mt-2 flex flex-wrap gap-2">
                <span v-for="tag in anime.tags" :key="tag" class="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {{ tag }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Sayfalama -->
      <div class="mt-8 flex items-center justify-between border-t border-border pt-8">
        <button
          :disabled="currentPage === 1"
          @click="currentPage--"
          class="btn btn-outline"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        >
          Önceki
        </button>
        <span class="text-sm text-muted-foreground">
          Sayfa {{ currentPage }} / {{ totalPages }}
        </span>
        <button
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          class="btn btn-outline"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
        >
          Sonraki
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedGenre = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = 20

const genres = ref([
  { id: 'action', name: 'Aksiyon' },
  { id: 'adventure', name: 'Macera' },
  { id: 'comedy', name: 'Komedi' },
  { id: 'drama', name: 'Drama' },
  { id: 'fantasy', name: 'Fantezi' },
  { id: 'romance', name: 'Romantik' },
  { id: 'sci-fi', name: 'Bilim Kurgu' },
  { id: 'slice-of-life', name: 'Günlük Yaşam' },
  { id: 'sports', name: 'Spor' },
  { id: 'supernatural', name: 'Doğaüstü' }
])

const animeList = ref([
  {
    id: 1,
    title: 'One Piece',
    episodes: 1000,
    rating: 8.7,
    image: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
    tags: ['Aksiyon', 'Macera', 'Komedi'],
    genre: 'action'
  },
  {
    id: 2,
    title: 'Attack on Titan',
    episodes: 75,
    rating: 9.0,
    image: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    tags: ['Aksiyon', 'Drama', 'Fantezi'],
    genre: 'action'
  },
  {
    id: 3,
    title: 'Demon Slayer',
    episodes: 26,
    rating: 8.9,
    image: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    tags: ['Aksiyon', 'Doğaüstü'],
    genre: 'action'
  },
  {
    id: 4,
    title: 'Jujutsu Kaisen',
    episodes: 24,
    rating: 8.8,
    image: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    tags: ['Aksiyon', 'Doğaüstü'],
    genre: 'action'
  },
  {
    id: 5,
    title: 'Chainsaw Man',
    episodes: 12,
    rating: 8.6,
    image: 'https://cdn.myanimelist.net/images/anime/1632/110707.jpg',
    tags: ['Aksiyon', 'Doğaüstü'],
    genre: 'action'
  },
  {
    id: 6,
    title: 'Spy x Family',
    episodes: 25,
    rating: 8.7,
    image: 'https://cdn.myanimelist.net/images/anime/1441/122795.jpg',
    tags: ['Komedi', 'Aksiyon'],
    genre: 'comedy'
  },
  {
    id: 7,
    title: 'Blue Lock',
    episodes: 24,
    rating: 8.3,
    image: 'https://cdn.myanimelist.net/images/anime/1258/126929.jpg',
    tags: ['Spor', 'Drama'],
    genre: 'sports'
  },
  {
    id: 8,
    title: 'Bocchi the Rock!',
    episodes: 12,
    rating: 8.5,
    image: 'https://cdn.myanimelist.net/images/anime/1448/127956.jpg',
    tags: ['Komedi', 'Müzik'],
    genre: 'comedy'
  }
])

const filteredAnime = computed(() => {
  let filtered = animeList.value

  // Arama filtresi
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(anime => 
      anime.title.toLowerCase().includes(query) ||
      anime.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Tür filtresi
  if (selectedGenre.value) {
    filtered = filtered.filter(anime => anime.genre === selectedGenre.value)
  }

  // Sıralama
  switch (sortBy.value) {
    case 'newest':
      filtered = [...filtered].reverse()
      break
    case 'oldest':
      filtered = [...filtered]
      break
    case 'rating':
      filtered = [...filtered].sort((a, b) => b.rating - a.rating)
      break
    case 'popularity':
      filtered = [...filtered].sort((a, b) => b.episodes - a.episodes)
      break
  }

  return filtered
})

const totalPages = computed(() => 
  Math.ceil(filteredAnime.value.length / itemsPerPage)
)
</script> 