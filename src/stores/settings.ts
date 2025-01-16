import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

// API URL'i doğrudan /api ile başlat (Vite proxy kullanacak)
const API_URL = '/api'

interface Settings {
  siteTitle: string
  siteDescription: string
  siteKeywords: string
  maintenanceMode: boolean
  maintenanceMessage: string
  contactEmail: string
  socialLinks: {
    discord: string
    twitter: string
    github: string
  }
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: {
      siteTitle: '',
      siteDescription: '',
      siteKeywords: '',
      maintenanceMode: false,
      maintenanceMessage: '',
      contactEmail: '',
      socialLinks: {
        discord: '',
        twitter: '',
        github: ''
      }
    } as Settings,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchSettings() {
      try {
        this.loading = true
        const response = await axios.get(`${API_URL}/settings`)
        
        // Varsayılan değerlerle birleştir
        this.settings = {
          ...this.settings,
          ...response.data
        }
        
        // LocalStorage'a kaydet
        localStorage.setItem('siteSettings', JSON.stringify(this.settings))
        
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Ayarlar yüklenirken bir hata oluştu'
        console.error('Ayarlar yüklenirken hata:', error)
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    async updateSettings(newSettings: Partial<Settings>) {
      const authStore = useAuthStore()
      
      if (!authStore.isAuthenticated || !authStore.isAdmin) {
        throw new Error('Bu işlem için yönetici yetkisi gerekiyor')
      }

      try {
        this.loading = true
        const response = await axios.put(`${API_URL}/settings`, newSettings)
        
        // Başarılı yanıt kontrolü
        if (response.status === 200) {
          // State'i güncelle
          this.settings = {
            ...this.settings,
            ...newSettings
          }
          
          // LocalStorage'ı güncelle
          localStorage.setItem('siteSettings', JSON.stringify(this.settings))
          
          return true
        }
        
        return false
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Ayarlar güncellenirken bir hata oluştu'
        console.error('Ayarlar güncellenirken hata:', error)
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    }
  }
}) 