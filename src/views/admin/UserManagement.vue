<!-- Coded By PersoDev in 2025 for WatchGen -->
<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Kullanıcı Yönetimi</h2>
        <p class="text-sm text-muted-foreground">Kullanıcıları yönetin ve rolleri düzenleyin.</p>
      </div>
      <div class="flex gap-3">
        <button class="btn btn-primary" @click="showAddModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Yeni Kullanıcı
        </button>
      </div>
    </div>

    <!-- Filtreler -->
    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div>
        <input
          v-model="filters.search"
          type="text"
          class="input w-full"
          placeholder="Kullanıcı ara..."
          @input="handleSearch"
        />
      </div>
      <div>
        <select v-model="filters.role" class="input w-full" @change="handleSearch">
          <option value="">Tüm Roller</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderatör</option>
          <option value="user">Kullanıcı</option>
        </select>
      </div>
      <div>
        <select v-model="filters.status" class="input w-full" @change="handleSearch">
          <option value="">Tüm Durumlar</option>
          <option value="active">Aktif</option>
          <option value="banned">Yasaklı</option>
          <option value="pending">Onay Bekliyor</option>
        </select>
      </div>
    </div>

    <!-- Kullanıcı Listesi -->
    <div class="rounded-lg border border-border">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-border bg-muted/50">
              <th class="px-4 py-3 text-left text-sm font-medium">Kullanıcı</th>
              <th class="px-4 py-3 text-left text-sm font-medium">E-posta</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Rol</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Durum</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Kayıt Tarihi</th>
              <th class="px-4 py-3 text-right text-sm font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userList" :key="user.id" class="border-b border-border last:border-0">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <img :src="user.avatar" :alt="user.username" class="h-8 w-8 rounded-full" />
                  <div>
                    <div class="font-medium">{{ user.username }}</div>
                    <div class="text-sm text-muted-foreground">ID: {{ user.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">{{ user.email }}</td>
              <td class="px-4 py-3">
                <span class="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{{ getRoleText(user.role) }}</span>
              </td>
              <td class="px-4 py-3">
                <span
                  class="rounded-full px-2 py-1 text-xs"
                  :class="{
                    'bg-green-500/10 text-green-500': user.status === 'active',
                    'bg-red-500/10 text-red-500': user.status === 'banned',
                    'bg-yellow-500/10 text-yellow-500': user.status === 'pending'
                  }"
                >
                  {{ getStatusText(user.status) }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm text-muted-foreground">{{ formatDate(user.createdAt) }}</td>
              <td class="px-4 py-3">
                <div class="flex justify-end gap-2">
                  <button class="btn btn-icon btn-ghost" @click="editUser(user)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button class="btn btn-icon btn-ghost text-red-500 hover:text-red-600" @click="confirmDelete(user)">
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
          Toplam {{ totalUsers }} kullanıcı
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

    <!-- Kullanıcı Ekleme/Düzenleme Modalı -->
    <div v-if="showAddModal || selectedUser" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-md rounded-lg bg-background p-6">
        <h3 class="mb-4 text-lg font-semibold">{{ selectedUser ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı Ekle' }}</h3>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-medium">Kullanıcı Adı</label>
            <input v-model="form.username" type="text" class="input w-full" required />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">E-posta</label>
            <input v-model="form.email" type="email" class="input w-full" required />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">Şifre</label>
            <input v-model="form.password" type="password" class="input w-full" :required="!selectedUser" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">Rol</label>
            <select v-model="form.role" class="input w-full" required>
              <option value="admin">Admin</option>
              <option value="moderator">Moderatör</option>
              <option value="user">Kullanıcı</option>
            </select>
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium">Durum</label>
            <select v-model="form.status" class="input w-full" required>
              <option value="active">Aktif</option>
              <option value="banned">Yasaklı</option>
              <option value="pending">Onay Bekliyor</option>
            </select>
          </div>
          <div class="flex justify-end gap-3">
            <button type="button" class="btn btn-outline" @click="closeModal">İptal</button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-if="loading">Kaydediliyor...</span>
              <span v-else>{{ selectedUser ? 'Güncelle' : 'Ekle' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Silme Onay Modalı -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-md rounded-lg bg-background p-6">
        <h3 class="mb-4 text-lg font-semibold">Kullanıcıyı Sil</h3>
        <p class="mb-6 text-muted-foreground">
          <strong>{{ selectedUser?.username }}</strong> adlı kullanıcıyı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
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
const showDeleteModal = ref(false)
const selectedUser = ref(null)

const filters = ref({
  search: '',
  role: '',
  status: ''
})

const form = ref({
  username: '',
  email: '',
  password: '',
  role: 'user',
  status: 'active'
})

const userList = ref([
  {
    id: 1,
    username: 'admin',
    email: 'admin@watchgen.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff',
    createdAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    username: 'moderator',
    email: 'moderator@watchgen.com',
    role: 'moderator',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Moderator&background=6366f1&color=fff',
    createdAt: '2023-02-15T00:00:00.000Z'
  }
])

const currentPage = ref(1)
const totalUsers = ref(100)
const totalPages = ref(5)

const getRoleText = (role: string) => {
  switch (role) {
    case 'admin':
      return 'Admin'
    case 'moderator':
      return 'Moderatör'
    case 'user':
      return 'Kullanıcı'
    default:
      return role
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'Aktif'
    case 'banned':
      return 'Yasaklı'
    case 'pending':
      return 'Onay Bekliyor'
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

const editUser = (user: any) => {
  selectedUser.value = user
  form.value = {
    username: user.username,
    email: user.email,
    password: '',
    role: user.role,
    status: user.status
  }
  showAddModal.value = true
}

const confirmDelete = (user: any) => {
  selectedUser.value = user
  showDeleteModal.value = true
}

const closeModal = () => {
  showAddModal.value = false
  selectedUser.value = null
  form.value = {
    username: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active'
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

const handleDelete = async () => {
  try {
    loading.value = true
    // API çağrısı yapılacak
    console.log('Silinen kullanıcı:', selectedUser.value)
    showDeleteModal.value = false
  } catch (error) {
    console.error('Hata:', error)
  } finally {
    loading.value = false
  }
}
</script> 