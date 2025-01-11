<!-- Coded By PersoDev in 2025 for WatchGen -->
<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Anime Yönetimi</h2>
        <p class="text-sm text-muted-foreground">Anime listesini yönetin, düzenleyin ve yeni animeler ekleyin.</p>
      </div>
      <div class="flex gap-3">
        <router-link to="/admin/anime/add" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Yeni Anime
        </router-link>
        <button class="btn btn-outline" @click="showImportModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Toplu İçe Aktar
        </button>
      </div>
    </div>

    <!-- Filtreler -->
    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
      <div>
        <input
          v-model="filters.search"
          type="text"
          class="input w-full"
          placeholder="Anime ara..."
          @input="handleSearch"
        />
      </div>
      <div>
        <select v-model="filters.category" class="input w-full" @change="handleSearch">
          <option value="">Tüm Kategoriler</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div>
        <select v-model="filters.status" class="input w-full" @change="handleSearch">
          <option value="">Tüm Durumlar</option>
          <option value="ongoing">Devam Ediyor</option>
          <option value="completed">Tamamlandı</option>
          <option value="upcoming">Yakında</option>
        </select>
      </div>
      <div>
        <select v-model="filters.type" class="input w-full" @change="handleSearch">
          <option value="">Tüm Türler</option>
          <option value="tv">TV</option>
          <option value="movie">Film</option>
          <option value="ova">OVA</option>
          <option value="ona">ONA</option>
          <option value="special">Özel</option>
        </select>
      </div>
    </div>

    <!-- Anime Listesi -->
    <div class="rounded-lg border border-border">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-border bg-muted/50">
              <th class="px-4 py-3 text-left text-sm font-medium">Başlık</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Tür</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Durum</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Bölümler</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Eklenme Tarihi</th>
              <th class="px-4 py-3 text-right text-sm font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="anime in animeList" :key="anime.id" class="border-b border-border last:border-0">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <img :src="anime.coverImage" :alt="anime.title" class="h-12 w-8 rounded object-cover" />
                  <div>
                    <div class="font-medium">{{ anime.title }}</div>
                    <div class="text-sm text-muted-foreground">{{ anime.alternativeTitle }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">
                <span class="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{{ anime.type.toUpperCase() }}</span>
              </td>
              <td class="px-4 py-3">
                <span
                  class="rounded-full px-2 py-1 text-xs"
                  :class="{
                    'bg-green-500/10 text-green-500': anime.status === 'completed',
                    'bg-blue-500/10 text-blue-500': anime.status === 'ongoing',
                    'bg-yellow-500/10 text-yellow-500': anime.status === 'upcoming'
                  }"
                >
                  {{ getStatusText(anime.status) }}
                </span>
              </td>
              <td class="px-4 py-3">{{ anime.episodes }} Bölüm</td>
              <td class="px-4 py-3 text-sm text-muted-foreground">{{ formatDate(anime.createdAt) }}</td>
              <td class="px-4 py-3">
                <div class="flex justify-end gap-2">
                  <router-link :to="`/admin/anime/${anime.id}/edit`" class="btn btn-icon btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </router-link>
                  <button class="btn btn-icon btn-ghost text-red-500 hover:text-red-600" @click="confirmDelete(anime)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Sayfalama -->
      <div class="flex items-center justify-between border-t border-border px-4 py-3">
        <div class="text-sm text-muted-foreground">
          Toplam {{ totalAnime }} anime
        </div>
        <div class="flex gap-1">
          <button
            class="btn btn-icon btn-ghost"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            class="btn btn-ghost min-w-[2.5rem]"
            :class="{ 'bg-primary text-white hover:bg-primary/90': currentPage === page }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <button
            class="btn btn-icon btn-ghost"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Silme Onay Modalı -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-md rounded-lg bg-background p-6">
        <h3 class="mb-4 text-lg font-semibold">Animeyi Sil</h3>
        <p class="mb-6 text-muted-foreground">
          <strong>{{ selectedAnime?.title }}</strong> adlı animeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
        </p>
        <div class="flex justify-end gap-3">
          <button class="btn btn-outline" @click="showDeleteModal = false">İptal</button>
          <button class="btn btn-danger" :disabled="loading" @click="handleDelete">
            <span v-if="loading">Siliniyor...</span>
            <span v-else>Sil</span>
          </button>
        </div>
      </div>
    </div>

    <!-- İçe Aktarma Modalı -->
    <div v-if="showImportModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-md rounded-lg bg-background p-6">
        <h3 class="mb-4 text-lg font-semibold">Toplu İçe Aktarma</h3>
        <p class="mb-4 text-sm text-muted-foreground">
          CSV dosyası yükleyerek birden fazla animeyi tek seferde ekleyebilirsiniz. Lütfen dosyanın doğru formatta olduğundan emin olun.
        </p>
        <div class="mb-4">
          <input
            type="file"
            accept=".csv"
            class="input w-full"
            @change="handleFileSelect"
          />
        </div>
        <div class="flex justify-end gap-3">
          <button class="btn btn-outline" @click="showImportModal = false">İptal</button>
          <button class="btn btn-primary" :disabled="!selectedFile || loading" @click="handleImport">
            <span v-if="loading">İçe Aktarılıyor...</span>
            <span v-else>İçe Aktar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(false)
const showDeleteModal = ref(false)
const showImportModal = ref(false)
const selectedAnime = ref(null)
const selectedFile = ref(null)

const filters = ref({
  search: '',
  category: '',
  status: '',
  type: ''
})

const categories = ref([
  { id: 'action', name: 'Aksiyon' },
  { id: 'adventure', name: 'Macera' },
  { id: 'comedy', name: 'Komedi' },
  { id: 'drama', name: 'Drama' },
  { id: 'fantasy', name: 'Fantezi' },
  { id: 'romance', name: 'Romantik' }
])

const animeList = ref([
  {
    id: 1,
    title: 'Demon Slayer',
    alternativeTitle: '鬼滅の刃',
    type: 'tv',
    status: 'completed',
    episodes: 26,
    coverImage: 'https://example.com/demon-slayer.jpg',
    createdAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    title: 'Attack on Titan',
    alternativeTitle: '進撃の巨人',
    type: 'tv',
    status: 'ongoing',
    episodes: 87,
    coverImage: 'https://example.com/attack-on-titan.jpg',
    createdAt: '2023-02-15T00:00:00.000Z'
  }
])

const currentPage = ref(1)
const totalAnime = ref(100)
const totalPages = ref(5)

const getStatusText = (status: string) => {
  switch (status) {
    case 'ongoing':
      return 'Devam Ediyor'
    case 'completed':
      return 'Tamamlandı'
    case 'upcoming':
      return 'Yakında'
    default:
      return status
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleSearch = () => {
  // API çağrısı yapılacak
  console.log('Filtreler:', filters.value)
}

const changePage = (page: number) => {
  currentPage.value = page
  // API çağrısı yapılacak
}

const confirmDelete = (anime: any) => {
  selectedAnime.value = anime
  showDeleteModal.value = true
}

const handleDelete = async () => {
  try {
    loading.value = true
    // API çağrısı yapılacak
    console.log('Silinen anime:', selectedAnime.value)
    showDeleteModal.value = false
  } catch (error) {
    console.error('Hata:', error)
  } finally {
    loading.value = false
  }
}

const handleFileSelect = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    selectedFile.value = file
  }
}

const handleImport = async () => {
  try {
    loading.value = true
    // API çağrısı yapılacak
    console.log('İçe aktarılan dosya:', selectedFile.value)
    showImportModal.value = false
  } catch (error) {
    console.error('Hata:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // API çağrısı yapılacak
})
</script> 