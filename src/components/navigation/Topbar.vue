<template>
  <nav
    class="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur"
  >
    <div
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <div class="flex items-center gap-8">
        <router-link to="/" class="flex items-center gap-2">
          <img src="@/assets/logo.svg" alt="WatchGen" class="h-8 w-8" />
          <span class="text-xl font-bold text-foreground">WatchGen</span>
        </router-link>

        <div class="hidden md:flex md:items-center md:gap-6">
          <router-link to="/" class="nav-link" active-class="active"
            >Ana Sayfa</router-link
          >
          <router-link to="/browse" class="nav-link" active-class="active"
            >Keşfet</router-link
          >
          <router-link to="/popular" class="nav-link" active-class="active"
            >Popüler</router-link
          >
          <router-link to="/seasonal" class="nav-link" active-class="active"
            >Sezonluk</router-link
          >
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="relative hidden md:block">
          <input type="search" placeholder="Anime ara..." class="input w-64" />
        </div>

        <div class="flex items-center gap-4">
          <router-link to="/login" class="nav-link" v-if="!isLoggedIn">
            Giriş Yap
          </router-link>
          <router-link
            to="/register"
            class="btn btn-primary"
            v-if="!isLoggedIn"
          >
            Üye Ol
          </router-link>

          <div class="relative" v-else>
            <button
              class="flex items-center gap-2 rounded-full bg-card p-2 hover:bg-card-hover"
              @click="isProfileMenuOpen = !isProfileMenuOpen"
            >
              <img
                :src="user?.avatar || '/default-avatar.png'"
                alt="Profil"
                class="h-8 w-8 rounded-full object-cover"
              />
              <span class="hidden text-sm font-medium text-foreground md:block">
                {{ user?.username }}
              </span>
            </button>

            <div
              v-if="isProfileMenuOpen"
              class="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card py-1 shadow-lg"
            >
              <router-link
                to="/profile"
                class="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profilim
              </router-link>
              <router-link
                v-if="user?.role === 'admin'"
                to="/admin"
                class="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Admin Panel
              </router-link>
              <router-link
                to="/favorites"
                class="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-4 w-4"
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
                Favorilerim
              </router-link>
              <router-link
                to="/watchlist"
                class="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-4 w-4"
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
                İzleme Listem
              </router-link>
              <div class="my-1 border-t border-border"></div>
              <button
                @click="handleLogout"
                class="flex w-full items-center px-4 py-2 text-sm text-destructive hover:bg-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>

        <button class="btn btn-outline p-2 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";

const isLoggedIn = ref(false);
const isProfileMenuOpen = ref(false);
const user = ref(null);

const handleLogout = () => {
  isLoggedIn.value = false;
  isProfileMenuOpen.value = false;
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
