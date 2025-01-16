import express from 'express'
import { getAllSettings, updateSettings } from '../controllers/settingsController.js'
import { adminMiddleware, authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Tüm ayarları getir
router.get('/', getAllSettings)

// Ayarları güncelle (sadece admin)
router.put('/', authMiddleware, adminMiddleware, updateSettings)

export default router 