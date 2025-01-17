<!-- Coded By PersoDev in 2025 for WatchGen -->
<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-background py-24">
      <!-- Video Arkaplan -->
      <div class="absolute inset-0 -z-20">
        <video
          class="h-full w-full object-cover opacity-40"
          autoplay
          loop
          muted
          playsinline
        >
          <source
            src="https://assets.codepen.io/3364143/7btrrd.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <!-- Animasyonlu Gradient Overlay -->
      <div class="absolute inset-0 -z-10">
        <div
          class="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"
        ></div>
        <div
          class="absolute inset-0 animate-gradient bg-[length:200%_200%] bg-[linear-gradient(45deg,var(--primary-50),var(--secondary-50),var(--primary-50))] opacity-5"
        ></div>
        <div
          class="absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-primary/10 blur-3xl"
        ></div>
        <div
          class="absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-secondary/10 blur-3xl"
        ></div>
      </div>

      <div class="container relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Sol Taraf - Metin -->
          <div class="text-left">
            <h1
              class="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl animate-fade-in"
            >
              Modern Anime İzleme Deneyimi
            </h1>
            <p
              class="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in animation-delay-200"
            >
              WatchGen ile en sevdiğiniz animeleri HD kalitede izleyin,
              arkadaşlarınızla tartışın ve yeni seriler keşfedin.
            </p>
            <div
              class="mt-8 flex items-center gap-x-4 animate-fade-in animation-delay-400"
            >
              <router-link to="/browse" class="btn btn-primary">
                Keşfet
              </router-link>
              <router-link
                to="/register"
                class="btn btn-outline"
                v-if="!isLoggedIn"
              >
                Üye Ol
              </router-link>
            </div>
            <!-- İstatistikler -->
            <div
              class="mt-10 grid grid-cols-3 gap-8 border-t border-border pt-8"
            >
              <div>
                <div class="text-3xl font-bold text-primary">1000+</div>
                <div class="text-sm text-muted-foreground mt-1">Anime</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-primary">50K+</div>
                <div class="text-sm text-muted-foreground mt-1">Kullanıcı</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-primary">HD</div>
                <div class="text-sm text-muted-foreground mt-1">Kalite</div>
              </div>
            </div>
          </div>

          <!-- Sağ Taraf - Öne Çıkan Anime -->
          <div class="relative hidden lg:block">
            <div class="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              <img
                :src="featuredAnime[0].image"
                :alt="featuredAnime[0].title"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
              >
                <div class="absolute bottom-0 left-0 right-0 p-8">
                  <div class="flex items-center gap-2 mb-2">
                    <span
                      class="bg-primary/90 text-white text-xs px-2 py-1 rounded-full"
                      >{{ featuredAnime[0].rating }} Puan</span
                    >
                    <span
                      class="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
                      >{{ featuredAnime[0].year }}</span
                    >
                  </div>
                  <h3 class="text-2xl font-bold text-white mb-2">
                    {{ featuredAnime[0].title }}
                  </h3>
                  <p class="text-white/80 mb-4 line-clamp-2 text-sm">
                    {{ featuredAnime[0].description }}
                  </p>
                  <div class="flex items-center gap-3">
                    <router-link
                      :to="'/watch/' + featuredAnime[0].id"
                      class="btn btn-primary"
                    >
                      <Icon
                        icon="solar:play-circle-linear"
                        class="size-5 mr-2"
                      />
                      Hemen İzle
                    </router-link>
                    <button
                      class="btn btn-outline text-white border-white/20 hover:bg-white/10"
                    >
                      <Icon icon="solar:heart-bold" class="size-5 mr-2" />
                      Listeme Ekle
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Dekoratif Elementler -->
            <div
              class="absolute -top-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
            ></div>
            <div
              class="absolute -bottom-4 -left-4 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Öne Çıkan Animeler -->
    <section class="py-12">
      <div class="container">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold tracking-tight">Öne Çıkan Animeler</h2>
          <router-link to="/browse" class="btn btn-outline btn-sm">
            Tümünü Gör
          </router-link>
        </div>

        <!-- Yatay Kaydırılabilir Liste -->
        <div class="relative">
          <div
            class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            <AnimeCard
              v-for="anime in featuredAnime"
              :title="anime.title"
              :episodes="anime.episodes"
              :image="anime.image"
              :tags="anime.tags.slice(0, 2)"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Kategoriler -->
    <section class="py-16 bg-muted/5">
      <div class="container">
        <h2 class="text-2xl font-bold tracking-tight mb-8">Kategoriler</h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <router-link
            v-for="category in categories"
            :key="category.id"
            :to="'/category/' + category.id"
            class="group relative rounded-lg overflow-hidden aspect-video"
          >
            <img
              :src="category.image"
              :alt="category.name"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-colors duration-300"
            >
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h3 class="text-white font-medium text-sm">
                  {{ category.name }}
                </h3>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Son Eklenenler -->
    <section class="py-12">
      <div class="container">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold tracking-tight">Son Eklenenler</h2>
          <router-link to="/browse?sort=newest" class="btn btn-outline btn-sm">
            Tümünü Gör
          </router-link>
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
        >
          <AnimeCard
            v-for="anime in recentlyAdded"
            :title="anime.title"
            :episodes="anime.episodes"
            :image="anime.image"
            :tags="anime.tags.slice(0, 2)"
          />
        </div>
      </div>
    </section>

    <!-- Özellikler -->
    <Why />
  </div>
</template>

<script setup lang="ts">
/* Coded By PersoDev in 2025 for WatchGen */
import AnimeCard from "@/components/card/AnimeCard.vue";
import Why from "@/components/template/Why.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const isLoggedIn = ref(true);

const featuredAnime = ref([
  {
    id: 1,
    title: "Demon Slayer: Kimetsu no Yaiba",
    episodes: 26,
    image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    tags: ["Aksiyon", "Doğaüstü"],
    videoUrl: "https://example.com/videos/demon-slayer-ep1.mp4",
    rating: 8.9,
    year: 2019,
    description:
      "Tanjiro Kamado, ailesi katledildikten ve kız kardeşi bir demona dönüştürüldükten sonra, kız kardeşini kurtarmak ve ailesini öldüren demonu bulmak için bir demon slayer olmaya karar verir.",
  },
  {
    id: 2,
    title: "Attack on Titan",
    episodes: 75,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    tags: ["Aksiyon", "Drama", "Fantezi"],
    videoUrl: "https://example.com/videos/attack-on-titan-ep1.mp4",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    episodes: 24,
    image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    tags: ["Aksiyon", "Doğaüstü"],
    videoUrl: "https://example.com/videos/jujutsu-kaisen-ep1.mp4",
  },
  {
    id: 4,
    title: "One Piece",
    episodes: 1000,
    image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    tags: ["Aksiyon", "Macera", "Komedi", "Fantezi"],
    videoUrl: "https://example.com/videos/one-piece-ep1.mp4",
  },
]);

const categories = ref([
  {
    id: "action",
    name: "Aksiyon",
    image: "https://cdn.myanimelist.net/images/anime/1000/110531.jpg",
  },
  {
    id: "adventure",
    name: "Macera",
    image: "https://cdn.myanimelist.net/images/anime/1337/99013.jpg",
  },
  {
    id: "comedy",
    name: "Komedi",
    image: "https://cdn.myanimelist.net/images/anime/1618/109931.jpg",
  },
  {
    id: "drama",
    name: "Drama",
    image: "https://cdn.myanimelist.net/images/anime/1245/116760.jpg",
  },
  {
    id: "fantasy",
    name: "Fantezi",
    image: "https://cdn.myanimelist.net/images/anime/1974/121052.jpg",
  },
  {
    id: "romance",
    name: "Romantik",
    image: "https://cdn.myanimelist.net/images/anime/1089/112109.jpg",
  },
]);

const recentlyAdded = ref([
  {
    id: 5,
    title: "Chainsaw Man",
    episodes: 12,
    image: "https://cdn.myanimelist.net/images/anime/1632/110707.jpg",
    tags: ["Aksiyon", "Doğaüstü", "Gore"],
    videoUrl: "https://example.com/videos/chainsaw-man-ep1.mp4",
  },
  {
    id: 6,
    title: "Spy x Family",
    episodes: 25,
    image: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
    tags: ["Komedi", "Aksiyon", "Aile"],
    videoUrl: "https://example.com/videos/spy-x-family-ep1.mp4",
  },
  {
    id: 7,
    title: "Blue Lock",
    episodes: 24,
    image: "https://cdn.myanimelist.net/images/anime/1258/126929.jpg",
    tags: ["Spor", "Drama"],
    videoUrl: "https://example.com/videos/blue-lock-ep1.mp4",
  },
  {
    id: 8,
    title: "Bocchi the Rock!",
    episodes: 12,
    image: "https://cdn.myanimelist.net/images/anime/1448/127956.jpg",
    tags: ["Komedi", "Müzik", "Slice of Life"],
    videoUrl: "https://example.com/videos/bocchi-the-rock-ep1.mp4",
  },
  {
    id: 9,
    title: "Oshi no Ko",
    episodes: 11,
    image: "https://cdn.myanimelist.net/images/anime/1812/134736.jpg",
    tags: ["Drama", "Supernatural"],
    videoUrl: "https://example.com/videos/oshi-no-ko-ep1.mp4",
  },
]);
</script>

<style>
/* Coded By PersoDev in 2025 for WatchGen */
.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  animation: gradient 15s ease infinite;
}
</style>
