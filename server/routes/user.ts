import express from 'express'
import {
  getProfile,
  updateProfile,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  getWatchList,
  addToWatchList,
  removeFromWatchList,
  getWatchHistory,
  updateWatchProgress
} from '../controllers/userController'
import { authMiddleware } from '../middleware/auth'

const router = express.Router()

router.get('/profile', authMiddleware, getProfile)
router.put('/profile', authMiddleware, updateProfile)

router.get('/favorites', authMiddleware, getFavorites)
router.post('/favorites/:animeId', authMiddleware, addToFavorites)
router.delete('/favorites/:animeId', authMiddleware, removeFromFavorites)

router.get('/watchlist', authMiddleware, getWatchList)
router.post('/watchlist/:animeId', authMiddleware, addToWatchList)
router.delete('/watchlist/:animeId', authMiddleware, removeFromWatchList)

router.get('/history', authMiddleware, getWatchHistory)
router.post('/history/:episodeId', authMiddleware, updateWatchProgress)

export default router 