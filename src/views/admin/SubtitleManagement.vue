<!-- Coded By PersoDev in 2025 for WatchGen -->
<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Altyazı Yönetimi</h2>
        <p class="text-sm text-muted-foreground">Altyazıları yönetin ve düzenleyin.</p>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-primary" @click="showAddModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Yeni Altyazı
        </button>
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
          placeholder="Altyazı ara..."
          @input="handleSearch"
        />
      </div>
      <div>
        <select v-model="filters.language" class="input w-full" @change="handleSearch">
          <option value="">Tüm Diller</option>
          <option value="tr">Türkçe</option>
          <option value="en">İngilizce</option>
          <option value="ja">Japonca</option>
        </select>
      </div>
      <div>
        <select v-model="filters.status" class="input w-full" @change="handleSearch">
          <option value="">Tüm Durumlar</option>
          <option value="active">Aktif</option>
          <option value="pending">Onay Bekliyor</option>
          <option value="rejected">Reddedildi</option>
        </select>
      </div>
      <div>
        <select v-model="filters.type" class="input w-full" @change="handleSearch">
          <option value="">Tüm Türler</option>
          <option value="fansub">Fansub</option>
          <option value="official">Resmi</option>
        </select>
      </div>
    </div>

    <!-- Altyazı Listesi -->
    <div class="rounded-lg border border-border">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-border bg-muted/50">
              <th class="px-4 py-3 text-left text-sm font-medium">Anime</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Bölüm</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Dil</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Tür</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Durum</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Ekleyen</th>
              <th class="px-4 py-3 text-right text-sm font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subtitle in subtitleList" :key="subtitle.id" class="border-b border-border last:border-0">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <img :src="subtitle.anime.coverImage" :alt="subtitle.anime.title" class="h-12 w-8 rounded object-cover" />
                  <div>
                    <div class="font-medium">{{ subtitle.anime.title }}</div>
                    <div class="text-sm text-muted-foreground">{{ subtitle.anime.alternativeTitle }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">{{ subtitle.episode }}. Bölüm</td>
              <td class="px-4 py-3">
                <span class="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{{ getLanguageText(subtitle.language) }}</span>
              </td>
              <td class="px-4 py-3">
                <span class="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{{ getTypeText(subtitle.type) }}</span>
              </td>
              <td class="px-4 py-3">
                <span
                  class="rounded-full px-2 py-1 text-xs"
                  :class="{
                    'bg-green-500/10 text-green-500': subtitle.status === 'active',
                    'bg-yellow-500/10 text-yellow-500': subtitle.status === 'pending',
                    'bg-red-500/10 text-red-500': subtitle.status === 'rejected'
                  }"
                >
                  {{ getStatusText(subtitle.status) }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <img :src="subtitle.user.avatar" :alt="subtitle.user.username" class="h-6 w-6 rounded-full" />
                  <span class="text-sm">{{ subtitle.user.username }}</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <div class="flex justify-end gap-2">
                  <button class="btn btn-icon btn-ghost" @click="editSubtitle(subtitle)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button class="btn btn-icon btn-ghost text-red-500 hover:text-red-600" @click="confirmDelete(subtitle)">
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
          Toplam {{ totalSubtitles }} altyazı
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

    <!-- Altyazı Ekleme/Düzenleme Modalı -->
    <div v-if="showAddModal || selectedSubtitle" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-md rounded-lg bg-background p-6">
        <h3 class="mb-4 text-lg font-semibold">{{ selectedSubtitle ? 'Altyazıyı Düzenle' : 'Yeni Altyazı Ekle' }}</h3>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-medium">Anime</label>
            <select v-model="form.animeId" class="input w-full" required>
              <option v-for="anime in animeList" :key="anime.id" :value="anime.id">
                {{ anime.title }}
              </option>
            </select>
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">Bölüm</label>
            <input v-model="form.episode" type="number" class="input w-full" required />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">Dil</label>
            <select v-model="form.language" class="input w-full" required>
              <option value="tr">Türkçe</option>
              <option value="en">İngilizce</option>
              <option value="ja">Japonca</option>
            </select>
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">Tür</label>
            <select v-model="form.type" class="input w-full" required>
              <option value="fansub">Fansub</option>
              <option value="official">Resmi</option>
            </select>
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">Durum</label>
            <select v-model="form.status" class="input w-full" required>
              <option value="active">Aktif</option>
              <option value="pending">Onay Bekliyor</option>
              <option value="rejected">Reddedildi</option>
            </select>
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">Altyazı Dosyası</label>
            <input type="file" accept=".srt,.ass,.vtt" class="input w-full" :required="!selectedSubtitle" />
          </div>
          <div class="flex justify-end gap-3">
            <button type="button" class="btn btn-outline" @click="closeModal">İptal</button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading">Kaydediliyor...</span>
              <span v-else>{{ selectedSubtitle ? 'Güncelle' : 'Ekle' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- İçe Aktarma Modalı -->
    <div v-if="showImportModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-md rounded-lg bg-background p-6">
        <h3 class="mb-4 text-lg font-semibold">Toplu İçe Aktarma</h3>
        <p class="mb-4 text-sm text-muted-foreground">
          Klasör yükleyerek birden fazla altyazıyı tek seferde ekleyebilirsiniz. Lütfen dosyaların doğru formatta olduğundan emin olun.
        </p>
        <div class="mb-4">
          <input
            type="file"
            webkitdirectory
            class="input w-full"
            @change="handleFolderSelect"
          />
        </div>
        <div class="flex justify-end gap-3">
          <button class="btn btn-outline" @click="showImportModal = false">İptal</button>
          <button class="btn btn-primary" :disabled="!selectedFiles.length || loading" @click="handleImport">
            <span v-if="loading">İçe Aktarılıyor...</span>
            <span v-else>İçe Aktar</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Silme Onay Modalı -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-md rounded-lg bg-background p-6">
        <h3 class="mb-4 text-lg font-semibold">Altyazıyı Sil</h3>
        <p class="mb-6 text-muted-foreground">
          <strong>{{ selectedSubtitle?.anime.title }}</strong> animesinin {{ selectedSubtitle?.episode }}. bölümüne ait altyazıyı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const showAddModal = ref(false)
const showImportModal = ref(false)
const showDeleteModal = ref(false)
const selectedSubtitle = ref(null)
const selectedFiles = ref([])

const filters = ref({
  search: '',
  language: '',
  status: '',
  type: ''
})

const form = ref({
  animeId: '',
  episode: 1,
  language: 'tr',
  type: 'fansub',
  status: 'pending'
})

const animeList = ref([
  {
    id: 1,
    title: 'Demon Slayer',
    alternativeTitle: '鬼滅の刃'
  },
  {
    id: 2,
    title: 'Attack on Titan',
    alternativeTitle: '進撃の巨人'
  }
])

const subtitleList = ref([
  {
    id: 1,
    anime: {
      title: 'Demon Slayer',
      alternativeTitle: '鬼滅の刃',
      coverImage: 'https://example.com/demon-slayer.jpg'
    },
    episode: 1,
    language: 'tr',
    type: 'fansub',
    status: 'active',
    user: {
      username: 'admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff'
    }
  },
  {
    id: 2,
    anime: {
      title: 'Attack on Titan',
      alternativeTitle: '進撃の巨人',
      coverImage: 'https://example.com/attack-on-titan.jpg'
    },
    episode: 1,
    language: 'en',
    type: 'official',
    status: 'pending',
    user: {
      username: 'moderator',
      avatar: 'https://ui-avatars.com/api/?name=Moderator&background=6366f1&color=fff'
    }
  }
])

const currentPage = ref(1)
const totalSubtitles = ref(100)
const totalPages = ref(5)

const getLanguageText = (language: string) => {
  switch (language) {
    case 'tr':
      return 'Türkçe'
    case 'en':
      return 'İngilizce'
    case 'ja':
      return 'Japonca'
    default:
      return language
  }
}

const getTypeText = (type: string) => {
  switch (type) {
    case 'fansub':
      return 'Fansub'
    case 'official':
      return 'Resmi'
    default:
      return type
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'Aktif'
    case 'pending':
      return 'Onay Bekliyor'
    case 'rejected':
      return 'Reddedildi'
    default:
      return status
  }
}

const handleSearch = () => {
  // API çağrısı yapılacak
  console.log('Filtreler:', filters.value)
}

const changePage = (page: number) => {
  currentPage.value = page
  // API çağrısı yapılacak
}

const editSubtitle = (subtitle: any) => {
  selectedSubtitle.value = subtitle
  form.value = {
    animeId: subtitle.anime.id,
    episode: subtitle.episode,
    language: subtitle.language,
    type: subtitle.type,
    status: subtitle.status
  }
  showAddModal.value = true
}

const confirmDelete = (subtitle: any) => {
  selectedSubtitle.value = subtitle
  showDeleteModal.value = true
}

const closeModal = () => {
  showAddModal.value = false
  selectedSubtitle.value = null
  form.value = {
    animeId: '',
    episode: 1,
    language: 'tr',
    type: 'fansub',
    status: 'pending'
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    // API çağrısı yapılacak
    console.log('Form gönderildi:', form.value)
    closeModal()
  } catch (error) {
    console.error('Hata:', error)
  } finally {
    loading.value = false
  }
}

const handleFolderSelect = (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files) {
    selectedFiles.value = Array.from(files).filter(file => 
      file.name.endsWith('.srt') || file.name.endsWith('.ass') || file.name.endsWith('.vtt')
    )
  }
}

const handleImport = async () => {
  try {
    loading.value = true
    // API çağrısı yapılacak
    console.log('İçe aktarılan dosyalar:', selectedFiles.value)
    showImportModal.value = false
  } catch (error) {
    console.error('Hata:', error)
  } finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  try {
    loading.value = true
    // API çağrısı yapılacak
    console.log('Silinen altyazı:', selectedSubtitle.value)
    showDeleteModal.value = false
  } catch (error) {
    console.error('Hata:', error)
  } finally {
    loading.value = false
  }
}
</script> 