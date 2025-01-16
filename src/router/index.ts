import { createRouter, createWebHistory } from 'vue-router'
import MaintenanceView from '../views/MaintenanceView.vue'
import SettingsView from '../views/admin/SettingsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/browse',
    name: 'browse',
    component: () => import('../views/BrowseView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/watch/:id',
    name: 'watch',
    component: () => import('../views/WatchView.vue')
  }
]

const adminRoutes = [
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('../views/admin/DashboardView.vue')
      },
      {
        path: 'anime',
        name: 'admin-anime',
        component: () => import('../views/admin/AnimeManagement.vue')
      },
      {
        path: 'anime/add',
        name: 'admin-anime-add',
        component: () => import('../views/admin/AnimeAdd.vue')
      },
      {
        path: 'anime/:id/edit',
        name: 'admin-anime-edit',
        component: () => import('../views/admin/AnimeEdit.vue')
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('../views/admin/UserManagement.vue')
      },
      {
        path: 'subtitles',
        name: 'admin-subtitles',
        component: () => import('../views/admin/SubtitleManagement.vue')
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: () => import('../views/admin/SettingsView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    ...adminRoutes,
    {
      path: '/maintenance',
      name: 'maintenance',
      component: MaintenanceView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const isAdmin = user?.role === 'admin'

  const settings = localStorage.getItem('siteSettings')
  const maintenanceMode = settings ? JSON.parse(settings).maintenanceMode : false

  if (maintenanceMode) {
    if (to.path === '/maintenance' || to.path === '/login') {
      return next()
    }
    
    if (!isAdmin) {
      return next('/maintenance')
    }
    
    if (isAdmin && to.path.startsWith('/admin')) {
      return next()
    }
    
    return next('/maintenance')
  }

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!isLoggedIn) {
      return next('/login')
    }
    
    if (!isAdmin) {
      return next('/')
    }
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    return next('/login')
  }

  next()
})

export default router 