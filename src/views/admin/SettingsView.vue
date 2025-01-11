<!-- Coded By PersoDev in 2025 for WatchGen -->
<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold">Site Ayarları</h2>
      <p class="text-sm text-muted-foreground">Genel site ayarlarını buradan yönetebilirsiniz.</p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Genel Ayarlar -->
      <div class="space-y-6">
        <div class="rounded-lg border border-border p-6">
          <h3 class="mb-4 text-lg font-semibold">Genel Ayarlar</h3>
          <form @submit.prevent="handleGeneralSubmit" class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium">Site Başlığı</label>
              <input v-model="generalSettings.siteTitle" type="text" class="input w-full" required />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Site Açıklaması</label>
              <textarea v-model="generalSettings.siteDescription" class="input min-h-[100px] w-full" required></textarea>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Site Logosu</label>
              <div class="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed border-border">
                <img v-if="generalSettings.siteLogo" :src="generalSettings.siteLogo" class="absolute inset-0 h-full w-full object-contain" />
                <div v-else class="absolute inset-0 flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mb-2 h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-sm text-muted-foreground">Logo yüklemek için tıklayın</p>
                </div>
                <input type="file" class="absolute inset-0 cursor-pointer opacity-0" @change="handleLogoUpload" accept="image/*" />
              </div>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Site Favicon</label>
              <div class="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-dashed border-border">
                <img v-if="generalSettings.siteFavicon" :src="generalSettings.siteFavicon" class="absolute inset-0 h-full w-full object-contain" />
                <div v-else class="absolute inset-0 flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <input type="file" class="absolute inset-0 cursor-pointer opacity-0" @change="handleFaviconUpload" accept="image/*" />
              </div>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading">Kaydediliyor...</span>
                <span v-else>Kaydet</span>
              </button>
            </div>
          </form>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="mb-4 text-lg font-semibold">SEO Ayarları</h3>
          <form @submit.prevent="handleSeoSubmit" class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium">Meta Başlık</label>
              <input v-model="seoSettings.metaTitle" type="text" class="input w-full" required />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Meta Açıklama</label>
              <textarea v-model="seoSettings.metaDescription" class="input min-h-[100px] w-full" required></textarea>
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Meta Anahtar Kelimeler</label>
              <div class="flex flex-wrap gap-2">
                <span v-for="keyword in seoSettings.metaKeywords" :key="keyword" class="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  {{ keyword }}
                  <button type="button" @click="removeKeyword(keyword)" class="text-primary hover:text-primary/80">×</button>
                </span>
                <input
                  v-model="newKeyword"
                  @keydown.enter.prevent="addKeyword"
                  type="text"
                  class="input h-8 w-32"
                  placeholder="Yeni kelime..."
                />
              </div>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading">Kaydediliyor...</span>
                <span v-else>Kaydet</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Diğer Ayarlar -->
      <div class="space-y-6">
        <!-- Bakım Modu -->
        <div class="rounded-lg border border-border p-6">
          <h3 class="mb-4 text-lg font-semibold">Bakım Modu</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Bakım Modu</p>
                <p class="text-sm text-muted-foreground">
                  Site bakım modundayken sadece adminler giriş yapabilir
                </p>
              </div>
              <label class="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  v-model="maintenanceMode"
                  class="peer sr-only"
                  @change="toggleMaintenanceMode"
                />
                <div class="h-6 w-11 rounded-full bg-muted peer-checked:bg-primary"></div>
              </label>
            </div>
            <div v-if="maintenanceMode">
              <label class="mb-2 block text-sm font-medium">Bakım Mesajı</label>
              <textarea
                v-model="maintenanceMessage"
                class="input min-h-[100px] w-full"
                placeholder="Bakım modu mesajını girin..."
                @change="saveMaintenanceMessage"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="mb-4 text-lg font-semibold">Sosyal Medya</h3>
          <form @submit.prevent="handleSocialSubmit" class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium">Facebook</label>
              <input v-model="socialSettings.facebook" type="url" class="input w-full" placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Twitter</label>
              <input v-model="socialSettings.twitter" type="url" class="input w-full" placeholder="https://twitter.com/..." />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Instagram</label>
              <input v-model="socialSettings.instagram" type="url" class="input w-full" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Discord</label>
              <input v-model="socialSettings.discord" type="url" class="input w-full" placeholder="https://discord.gg/..." />
            </div>
            <div class="flex justify-end">
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading">Kaydediliyor...</span>
                <span v-else>Kaydet</span>
              </button>
            </div>
          </form>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="mb-4 text-lg font-semibold">İletişim Bilgileri</h3>
          <form @submit.prevent="handleContactSubmit" class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium">E-posta Adresi</label>
              <input v-model="contactSettings.email" type="email" class="input w-full" required />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Telefon</label>
              <input v-model="contactSettings.phone" type="tel" class="input w-full" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Adres</label>
              <textarea v-model="contactSettings.address" class="input min-h-[100px] w-full"></textarea>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading">Kaydediliyor...</span>
                <span v-else>Kaydet</span>
              </button>
            </div>
          </form>
        </div>

        <div class="rounded-lg border border-border p-6">
          <h3 class="mb-4 text-lg font-semibold">Özelleştirme</h3>
          <form @submit.prevent="handleCustomizationSubmit" class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium">Ana Renk</label>
              <input v-model="customizationSettings.primaryColor" type="color" class="h-10 w-full rounded-lg border border-border" />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium">Yazı Tipi</label>
              <select v-model="customizationSettings.fontFamily" class="input w-full">
                <option value="inter">Inter</option>
                <option value="roboto">Roboto</option>
                <option value="poppins">Poppins</option>
              </select>
            </div>
            <div>
              <label class="mb-2 flex items-center gap-2 text-sm font-medium">
                <input v-model="customizationSettings.darkMode" type="checkbox" class="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary" />
                Karanlık Mod
              </label>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading">Kaydediliyor...</span>
                <span v-else>Kaydet</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Bildirim -->
    <div
      v-if="notification"
      class="fixed bottom-4 right-4 rounded-lg bg-primary p-4 text-white shadow-lg"
    >
      {{ notification }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const notification = ref('')
const newKeyword = ref('')

// Bakım modu ayarları
const maintenanceMode = ref(false)
const maintenanceMessage = ref('Sitemiz bakımdadır. Lütfen daha sonra tekrar deneyin.')

// Genel ayarlar
const generalSettings = ref({
  siteTitle: 'WatchGen',
  siteDescription: 'Anime izleme platformu',
  siteLogo: '',
  siteFavicon: ''
})

// SEO ayarları
const seoSettings = ref({
  metaTitle: 'WatchGen - Anime İzleme Platformu',
  metaDescription: 'En yeni ve popüler animeleri Türkçe altyazılı olarak izleyebileceğiniz platform.',
  metaKeywords: ['anime', 'manga', 'izle', 'türkçe altyazı']
})

// Sosyal medya ayarları
const socialSettings = ref({
  facebook: '',
  twitter: '',
  instagram: '',
  discord: ''
})

// İletişim ayarları
const contactSettings = ref({
  email: 'info@watchgen.com',
  phone: '',
  address: ''
})

// Özelleştirme ayarları
const customizationSettings = ref({
  primaryColor: '#6366f1',
  fontFamily: 'inter',
  darkMode: true
})

// Sayfa yüklendiğinde ayarları yükle
const loadSettings = () => {
  const savedSettings = localStorage.getItem('siteSettings')
  if (savedSettings) {
    const settings = JSON.parse(savedSettings)
    generalSettings.value = { ...generalSettings.value, ...settings.general }
    seoSettings.value = { ...seoSettings.value, ...settings.seo }
    socialSettings.value = { ...socialSettings.value, ...settings.social }
    contactSettings.value = { ...contactSettings.value, ...settings.contact }
    customizationSettings.value = { ...customizationSettings.value, ...settings.customization }
    maintenanceMode.value = settings.maintenanceMode || false
    maintenanceMessage.value = settings.maintenanceMessage || 'Sitemiz bakımdadır. Lütfen daha sonra tekrar deneyin.'
  }
}

// Ayarları kaydet
const saveSettings = () => {
  const settings = {
    general: generalSettings.value,
    seo: seoSettings.value,
    social: socialSettings.value,
    contact: contactSettings.value,
    customization: customizationSettings.value,
    maintenanceMode: maintenanceMode.value,
    maintenanceMessage: maintenanceMessage.value
  }
  localStorage.setItem('siteSettings', JSON.stringify(settings))
  showNotification('Ayarlar kaydedildi')
}

// Logo yükleme
const handleLogoUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      generalSettings.value.siteLogo = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// Favicon yükleme
const handleFaviconUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      generalSettings.value.siteFavicon = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// Anahtar kelime ekleme/çıkarma
const addKeyword = () => {
  if (newKeyword.value && !seoSettings.value.metaKeywords.includes(newKeyword.value)) {
    seoSettings.value.metaKeywords.push(newKeyword.value)
  }
  newKeyword.value = ''
}

const removeKeyword = (keyword: string) => {
  const index = seoSettings.value.metaKeywords.indexOf(keyword)
  if (index !== -1) {
    seoSettings.value.metaKeywords.splice(index, 1)
  }
}

// Form gönderme işlemleri
const handleGeneralSubmit = async () => {
  try {
    loading.value = true
    saveSettings()
  } catch (error) {
    console.error('Hata:', error)
    showNotification('Bir hata oluştu')
  } finally {
    loading.value = false
  }
}

const handleSeoSubmit = async () => {
  try {
    loading.value = true
    saveSettings()
  } catch (error) {
    console.error('Hata:', error)
    showNotification('Bir hata oluştu')
  } finally {
    loading.value = false
  }
}

const handleSocialSubmit = async () => {
  try {
    loading.value = true
    saveSettings()
  } catch (error) {
    console.error('Hata:', error)
    showNotification('Bir hata oluştu')
  } finally {
    loading.value = false
  }
}

const handleContactSubmit = async () => {
  try {
    loading.value = true
    saveSettings()
  } catch (error) {
    console.error('Hata:', error)
    showNotification('Bir hata oluştu')
  } finally {
    loading.value = false
  }
}

const handleCustomizationSubmit = async () => {
  try {
    loading.value = true
    saveSettings()
  } catch (error) {
    console.error('Hata:', error)
    showNotification('Bir hata oluştu')
  } finally {
    loading.value = false
  }
}

// Bakım modu işlemleri
const toggleMaintenanceMode = () => {
  saveSettings()
  showNotification(maintenanceMode.value ? 'Bakım modu aktif' : 'Bakım modu devre dışı')
}

const saveMaintenanceMessage = () => {
  saveSettings()
  showNotification('Bakım mesajı güncellendi')
}

// Bildirim göster
const showNotification = (message: string) => {
  notification.value = message
  setTimeout(() => {
    notification.value = ''
  }, 3000)
}

// Sayfa yüklendiğinde ayarları yükle
loadSettings()
</script> 