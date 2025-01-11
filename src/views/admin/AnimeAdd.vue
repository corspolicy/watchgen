<!-- Coded By PersoDev in 2025 for WatchGen -->
<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold">Yeni Anime Ekle</h2>
      <p class="text-sm text-muted-foreground">Yeni bir anime eklemek için aşağıdaki formu doldurun.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div class="space-y-6">
          <div class="rounded-lg border border-border p-6">
            <h3 class="mb-4 text-lg font-semibold">Temel Bilgiler</h3>
            <div class="space-y-4">
              <div>
                <label class="mb-2 block text-sm font-medium">Başlık</label>
                <input v-model="form.title" type="text" class="input w-full" required />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium">Alternatif Başlık (Japonca)</label>
                <input v-model="form.alternativeTitle" type="text" class="input w-full" />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium">Açıklama</label>
                <textarea v-model="form.description" class="input min-h-[100px] w-full" required></textarea>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="mb-2 block text-sm font-medium">Yıl</label>
                  <input v-model="form.year" type="number" class="input w-full" required />
                </div>
                <div>
                  <label class="mb-2 block text-sm font-medium">Sezon</label>
                  <select v-model="form.season" class="input w-full" required>
                    <option value="winter">Kış</option>
                    <option value="spring">İlkbahar</option>
                    <option value="summer">Yaz</option>
                    <option value="fall">Sonbahar</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Detaylar -->
          <div class="rounded-lg border border-border p-6">
            <h3 class="mb-4 text-lg font-semibold">Detaylar</h3>
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="mb-2 block text-sm font-medium">Durum</label>
                  <select v-model="form.status" class="input w-full" required>
                    <option value="ongoing">Devam Ediyor</option>
                    <option value="completed">Tamamlandı</option>
                    <option value="upcoming">Yakında</option>
                  </select>
                </div>
                <div>
                  <label class="mb-2 block text-sm font-medium">Tür</label>
                  <select v-model="form.type" class="input w-full" required>
                    <option value="tv">TV</option>
                    <option value="movie">Film</option>
                    <option value="ova">OVA</option>
                    <option value="ona">ONA</option>
                    <option value="special">Özel</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="mb-2 block text-sm font-medium">Bölüm Sayısı</label>
                  <input v-model="form.episodes" type="number" class="input w-full" required />
                </div>
                <div>
                  <label class="mb-2 block text-sm font-medium">Bölüm Süresi (dk)</label>
                  <input v-model="form.duration" type="number" class="input w-full" required />
                </div>
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium">Stüdyo</label>
                <input v-model="form.studio" type="text" class="input w-full" required />
              </div>
            </div>
          </div>
        </div>

        <!-- Sağ Kolon -->
        <div class="space-y-6">
          <!-- Görsel ve Video -->
          <div class="rounded-lg border border-border p-6">
            <h3 class="mb-4 text-lg font-semibold">Görsel ve Video</h3>
            <div class="space-y-4">
              <div>
                <label class="mb-2 block text-sm font-medium">Kapak Görseli</label>
                <div class="relative aspect-[2/3] w-full overflow-hidden rounded-lg border-2 border-dashed border-border">
                  <img v-if="form.coverImage" :src="form.coverImage" class="absolute inset-0 h-full w-full object-cover" />
                  <div v-else class="absolute inset-0 flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mb-2 h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-sm text-muted-foreground">Görsel yüklemek için tıklayın</p>
                  </div>
                  <input type="file" class="absolute inset-0 cursor-pointer opacity-0" @change="handleImageUpload" accept="image/*" />
                </div>
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium">Fragman URL</label>
                <input v-model="form.trailerUrl" type="url" class="input w-full" placeholder="YouTube video URL" />
              </div>
            </div>
          </div>

          <!-- Kategoriler ve Etiketler -->
          <div class="rounded-lg border border-border p-6">
            <h3 class="mb-4 text-lg font-semibold">Kategoriler ve Etiketler</h3>
            <div class="space-y-4">
              <div>
                <label class="mb-2 block text-sm font-medium">Kategoriler</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="category in categories"
                    :key="category.id"
                    type="button"
                    class="rounded-full px-3 py-1 text-sm transition-colors"
                    :class="form.categories.includes(category.id) ? 'bg-primary text-white' : 'bg-muted hover:bg-muted-foreground/10'"
                    @click="toggleCategory(category.id)"
                  >
                    {{ category.name }}
                  </button>
                </div>
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium">Etiketler</label>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in form.tags" :key="tag" class="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    {{ tag }}
                    <button type="button" @click="removeTag(tag)" class="text-primary hover:text-primary/80">×</button>
                  </span>
                  <input
                    v-model="newTag"
                    @keydown.enter.prevent="addTag"
                    type="text"
                    class="input h-8 w-32"
                    placeholder="Yeni etiket..."
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Yaş Sınırı ve Uyarılar -->
          <div class="rounded-lg border border-border p-6">
            <h3 class="mb-4 text-lg font-semibold">Yaş Sınırı ve Uyarılar</h3>
            <div class="space-y-4">
              <div>
                <label class="mb-2 block text-sm font-medium">Yaş Sınırı</label>
                <select v-model="form.ageRating" class="input w-full" required>
                  <option value="G">G (Genel İzleyici)</option>
                  <option value="PG">PG (Aile Gözetimi)</option>
                  <option value="PG-13">PG-13 (13+ Uygun)</option>
                  <option value="R">R (17+ Uygun)</option>
                  <option value="R+">R+ (Hafif Müstehcen)</option>
                </select>
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium">İçerik Uyarıları</label>
                <div class="flex flex-wrap gap-2">
                  <label v-for="warning in contentWarnings" :key="warning.id" class="flex items-center gap-2">
                    <input
                      type="checkbox"
                      :value="warning.id"
                      v-model="form.contentWarnings"
                      class="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
                    />
                    <span class="text-sm">{{ warning.name }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kaydet Butonu -->
      <div class="flex justify-end gap-3">
        <router-link to="/admin/anime" class="btn btn-outline">İptal</router-link>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          <span v-if="loading">Kaydediliyor...</span>
          <span v-else>Kaydet</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const newTag = ref('')

const categories = ref([
  { id: 'action', name: 'Aksiyon' },
  { id: 'adventure', name: 'Macera' },
  { id: 'comedy', name: 'Komedi' },
  { id: 'drama', name: 'Drama' },
  { id: 'fantasy', name: 'Fantezi' },
  { id: 'romance', name: 'Romantik' }
])

const contentWarnings = ref([
  { id: 'violence', name: 'Şiddet' },
  { id: 'gore', name: 'Kan/Gore' },
  { id: 'nudity', name: 'Çıplaklık' },
  { id: 'profanity', name: 'Küfür' },
  { id: 'sexual', name: 'Cinsel İçerik' }
])

const form = ref({
  title: '',
  alternativeTitle: '',
  description: '',
  year: new Date().getFullYear(),
  season: 'winter',
  status: 'upcoming',
  type: 'tv',
  episodes: 12,
  duration: 24,
  studio: '',
  coverImage: '',
  trailerUrl: '',
  categories: [],
  tags: [],
  ageRating: 'PG-13',
  contentWarnings: []
})

const toggleCategory = (categoryId: string) => {
  const index = form.value.categories.indexOf(categoryId)
  if (index === -1) {
    form.value.categories.push(categoryId)
  } else {
    form.value.categories.splice(index, 1)
  }
}

const addTag = () => {
  if (newTag.value && !form.value.tags.includes(newTag.value)) {
    form.value.tags.push(newTag.value)
  }
  newTag.value = ''
}

const removeTag = (tag: string) => {
  const index = form.value.tags.indexOf(tag)
  if (index !== -1) {
    form.value.tags.splice(index, 1)
  }
}

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.coverImage = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    // API KNK 
    console.log('Form gönderildi:', form.value)
    router.push('/admin/anime')
  } catch (error) {
    console.error('Hata:', error)
  } finally {
    loading.value = false
  }
}
</script> 