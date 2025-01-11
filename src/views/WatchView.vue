<template>
  <div class="container py-8">
    <!-- Video Player ve Bilgi -->
    <div class="grid gap-8 lg:grid-cols-[1fr_300px]">
      <!-- Sol Kolon: Video Player ve Detaylar -->
      <div class="space-y-8">
        <!-- Video Player -->
        <div class="relative aspect-video overflow-hidden rounded-lg bg-card">
          <video
            ref="videoPlayer"
            class="h-full w-full"
            controls
            @play="handlePlay"
            @pause="handlePause"
            @timeupdate="handleTimeUpdate"
            @ended="handleEnded"
          >
            <source :src="currentEpisode.videoUrl" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <!-- Anime Bilgileri -->
        <div class="space-y-4">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-2xl font-bold">{{ anime.title }}</h1>
              <p class="mt-1 text-sm text-muted-foreground">
                Bölüm {{ currentEpisode.number }} - {{ currentEpisode.title }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button
                class="btn btn-outline"
                :class="{ 'text-primary': isFavorite }"
                @click="toggleFavorite"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  :class="{ 'fill-current': isFavorite }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span class="ml-2">Favorilere Ekle</span>
              </button>
              <button
                class="btn btn-outline"
                :class="{ 'text-primary': isWatchLater }"
                @click="toggleWatchLater"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  :class="{ 'fill-current': isWatchLater }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="ml-2">Sonra İzle</span>
              </button>
            </div>
          </div>

          <!-- Bölüm Açıklaması -->
          <p class="text-muted-foreground">
            {{ currentEpisode.description }}
          </p>

          <!-- Etiketler -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in anime.tags"
              :key="tag"
              class="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Yorumlar -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold">Yorumlar</h2>
          
          <!-- Yorum Formu -->
          <form @submit.prevent="handleCommentSubmit" class="space-y-4">
            <textarea
              v-model="newComment"
              rows="3"
              class="input min-h-[100px] w-full"
              placeholder="Yorumunuzu yazın..."
            ></textarea>
            <button type="submit" class="btn btn-primary">
              Yorum Yap
            </button>
          </form>

          <!-- Yorum Listesi -->
          <div class="space-y-4">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="rounded-lg border border-border bg-card p-4"
            >
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-2">
                  <img
                    :src="comment.user.avatar"
                    :alt="comment.user.username"
                    class="h-8 w-8 rounded-full"
                  />
                  <div>
                    <p class="font-medium">{{ comment.user.username }}</p>
                    <p class="text-xs text-muted-foreground">
                      {{ comment.createdAt }}
                    </p>
                  </div>
                </div>
                <button
                  v-if="comment.user.id === currentUser?.id"
                  class="text-sm text-muted-foreground hover:text-destructive"
                  @click="deleteComment(comment.id)"
                >
                  Sil
                </button>
              </div>
              <p class="mt-2 text-sm">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sağ Kolon: Bölüm Listesi -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Bölümler</h2>
        <div class="grid gap-2">
          <button
            v-for="episode in anime.episodes"
            :key="episode.number"
            class="flex items-center gap-4 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-accent"
            :class="{ 'border-primary': episode.number === currentEpisode.number }"
            @click="changeEpisode(episode)"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded bg-muted">
              {{ episode.number }}
            </div>
            <div class="flex-1 space-y-1">
              <p class="font-medium">{{ episode.title }}</p>
              <p class="text-sm text-muted-foreground">{{ episode.duration }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const videoPlayer = ref<HTMLVideoElement | null>(null)
const newComment = ref('')
const isFavorite = ref(false)
const isWatchLater = ref(false)

// Örnek veri
const anime = ref({
  id: 1,
  title: 'One Piece',
  description: 'Monkey D. Luffy ve mürettebatının maceraları.',
  tags: ['Aksiyon', 'Macera', 'Komedi', 'Fantezi'],
  episodes: [
    {
      number: 1,
      title: 'Romance Dawn',
      duration: '23:45',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Luffy\'nin macerasının başlangıcı.'
    },
    {
      number: 2,
      title: 'That Guy, Straw Hat Luffy',
      duration: '23:45',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      description: 'Luffy ilk mürettebat üyesini arıyor.'
    }
  ]
})

const currentEpisode = ref(anime.value.episodes[0])
const currentUser = ref({
  id: 1,
  username: 'user123',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user123'
})

const comments = ref([
  {
    id: 1,
    content: 'Harika bir bölümdü!',
    createdAt: '2 saat önce',
    user: {
      id: 2,
      username: 'anime_lover',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anime_lover'
    }
  },
  {
    id: 2,
    content: 'Bu sahne çok etkileyiciydi.',
    createdAt: '1 saat önce',
    user: {
      id: 1,
      username: 'user123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user123'
    }
  }
])

// Video kontrolleri
const handlePlay = () => {
  console.log('Video başladı')
}

const handlePause = () => {
  console.log('Video duraklatıldı')
}

const handleTimeUpdate = () => {
  if (videoPlayer.value) {
    const currentTime = videoPlayer.value.currentTime
    const duration = videoPlayer.value.duration
    console.log(`İlerleme: ${Math.round((currentTime / duration) * 100)}%`)
  }
}

const handleEnded = () => {
  console.log('Video bitti')
}

// Bölüm değiştirme
const changeEpisode = (episode: typeof anime.value.episodes[0]) => {
  currentEpisode.value = episode
}

// Favori ve Sonra İzle
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const toggleWatchLater = () => {
  isWatchLater.value = !isWatchLater.value
}

// Yorum işlemleri
const handleCommentSubmit = () => {
  if (!newComment.value.trim()) return

  comments.value.unshift({
    id: Date.now(),
    content: newComment.value,
    createdAt: 'Şimdi',
    user: currentUser.value
  })

  newComment.value = ''
}

const deleteComment = (commentId: number) => {
  comments.value = comments.value.filter(comment => comment.id !== commentId)
}

onMounted(() => {
  // Sayfa yüklendiğinde gerekli verileri yükle
  const animeId = route.params.id
  console.log(`Anime ID: ${animeId} yükleniyor...`)
})
</script> 