<template>
  <div class="group relative overflow-hidden rounded-lg">
    <router-link :to="'/watch/'">
      <div class="aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
        <img
          :src="image"
          :alt="title"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent p-6 flex flex-col justify-end transition-opacity"
      >
        <h3 class="text-lg font-semibold text-foreground">{{ title }}</h3>
        <div class="mt-2 flex items-center gap-2">
          <span class="text-sm text-muted-foreground"
            >{{ episodes }} Bölüm</span
          >
          <span class="text-xs text-muted-foreground">•</span>
          <span class="text-sm text-muted-foreground">{{ rating }}/10</span>
        </div>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="tag in tags"
            :key="tag"
            class="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </router-link>
  </div>
  <!-- <div class="snap-start flex-none w-[200px] group relative">
    <router-link to="">
      <div class="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
        <img
          :src="image"
          :alt="title"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        ></div>
        <div class="absolute bottom-0 left-0 right-0 p-3">
          <h3 class="text-white text-sm font-semibold truncate">
            {{ title }}
          </h3>
          <p class="text-white/80 text-xs">{{ episodes }} Bölüm</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-1">
        <span
          v-for="tag in tags"
          :key="tag"
          class="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary"
        >
          {{ tag }}
        </span>
      </div>
    </router-link>
  </div> -->
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  episodes: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array<string>,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
});
</script>
