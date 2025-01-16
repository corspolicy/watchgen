import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useAuthStore } from './stores/auth'

const initApp = async () => {
  const app = createApp(App)
  const pinia = createPinia()

  app.use(pinia)
  app.use(router)

  // Auth store'u başlat ve token kontrolü yap
  const authStore = useAuthStore()
  await authStore.initializeAuth()

  app.mount('#app')
}

initApp().catch(console.error) 