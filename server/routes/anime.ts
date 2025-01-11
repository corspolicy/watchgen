import express from 'express'
import {
  getAnimes,
  getAnimeById,
  getAnimeEpisodes,
  getEpisodeById,
  searchAnimes,
  addAnime,
  updateAnime,
  deleteAnime,
  addComment,
  getComments
} from '../controllers/animeController'
import { authMiddleware, adminMiddleware } from '../middleware/auth'

const router = express.Router()

// Public routes
router.get('/', getAnimes)
router.get('/search', searchAnimes)
router.get('/:id', getAnimeById)
router.get('/:id/episodes', getAnimeEpisodes)
router.get('/episode/:id', getEpisodeById)
router.get('/:id/comments', getComments)

// Protected routes
router.post('/:id/comments', authMiddleware, addComment)

// Admin routes
router.post('/', authMiddleware, adminMiddleware, addAnime)
router.put('/:id', authMiddleware, adminMiddleware, updateAnime)
router.delete('/:id', authMiddleware, adminMiddleware, deleteAnime)

export default router 