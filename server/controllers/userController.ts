import { Request, Response } from 'express'
import pool from '../config/database'
import bcrypt from 'bcryptjs'

interface AuthRequest extends Request {
  user?: {
    id: number
    email: string
    role: string
  }
}

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id

    const [users] = await pool.execute(
      'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
      [userId]
    )

    if ((users as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      })
    }

    res.json({
      success: true,
      data: (users as any[])[0]
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { username, email, currentPassword, newPassword } = req.body

    // Mevcut şifreyi kontrol et
    if (currentPassword) {
      const [users] = await pool.execute(
        'SELECT password FROM users WHERE id = ?',
        [userId]
      )

      const user = (users as any[])[0]
      const isMatch = await bcrypt.compare(currentPassword, user.password)

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Mevcut şifre hatalı'
        })
      }
    }

    // Profili güncelle
    if (newPassword) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPassword, salt)

      await pool.execute(
        'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?',
        [username, email, hashedPassword, userId]
      )
    } else {
      await pool.execute(
        'UPDATE users SET username = ?, email = ? WHERE id = ?',
        [username, email, userId]
      )
    }

    res.json({
      success: true,
      message: 'Profil başarıyla güncellendi'
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const getFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const offset = (page - 1) * limit

    const [favorites] = await pool.execute(
      `SELECT a.* 
       FROM favorites f 
       JOIN animes a ON f.anime_id = a.id 
       WHERE f.user_id = ? 
       ORDER BY f.created_at DESC 
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    )

    const [total] = await pool.execute(
      'SELECT COUNT(*) as count FROM favorites WHERE user_id = ?',
      [userId]
    )
    const totalCount = (total as any[])[0].count

    res.json({
      success: true,
      data: favorites,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error('Get favorites error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const addToFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { animeId } = req.params

    await pool.execute(
      'INSERT INTO favorites (user_id, anime_id) VALUES (?, ?)',
      [userId, animeId]
    )

    res.status(201).json({
      success: true,
      message: 'Anime favorilere eklendi'
    })
  } catch (error) {
    console.error('Add to favorites error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const removeFromFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { animeId } = req.params

    await pool.execute(
      'DELETE FROM favorites WHERE user_id = ? AND anime_id = ?',
      [userId, animeId]
    )

    res.json({
      success: true,
      message: 'Anime favorilerden kaldırıldı'
    })
  } catch (error) {
    console.error('Remove from favorites error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const getWatchList = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const offset = (page - 1) * limit

    const [watchlist] = await pool.execute(
      `SELECT a.* 
       FROM watchlist w 
       JOIN animes a ON w.anime_id = a.id 
       WHERE w.user_id = ? 
       ORDER BY w.created_at DESC 
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    )

    const [total] = await pool.execute(
      'SELECT COUNT(*) as count FROM watchlist WHERE user_id = ?',
      [userId]
    )
    const totalCount = (total as any[])[0].count

    res.json({
      success: true,
      data: watchlist,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error('Get watchlist error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const addToWatchList = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { animeId } = req.params

    await pool.execute(
      'INSERT INTO watchlist (user_id, anime_id) VALUES (?, ?)',
      [userId, animeId]
    )

    res.status(201).json({
      success: true,
      message: 'Anime izleme listesine eklendi'
    })
  } catch (error) {
    console.error('Add to watchlist error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const removeFromWatchList = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { animeId } = req.params

    await pool.execute(
      'DELETE FROM watchlist WHERE user_id = ? AND anime_id = ?',
      [userId, animeId]
    )

    res.json({
      success: true,
      message: 'Anime izleme listesinden kaldırıldı'
    })
  } catch (error) {
    console.error('Remove from watchlist error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const getWatchHistory = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const offset = (page - 1) * limit

    const [history] = await pool.execute(
      `SELECT h.*, a.title as anime_title, e.title as episode_title, e.episode_number 
       FROM watch_history h 
       JOIN episodes e ON h.episode_id = e.id 
       JOIN animes a ON e.anime_id = a.id 
       WHERE h.user_id = ? 
       ORDER BY h.updated_at DESC 
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    )

    const [total] = await pool.execute(
      'SELECT COUNT(*) as count FROM watch_history WHERE user_id = ?',
      [userId]
    )
    const totalCount = (total as any[])[0].count

    res.json({
      success: true,
      data: history,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error('Get watch history error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const updateWatchProgress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id
    const { episodeId } = req.params
    const { progress, completed } = req.body

    const [existing] = await pool.execute(
      'SELECT * FROM watch_history WHERE user_id = ? AND episode_id = ?',
      [userId, episodeId]
    )

    if ((existing as any[]).length > 0) {
      await pool.execute(
        'UPDATE watch_history SET progress = ?, completed = ?, updated_at = NOW() WHERE user_id = ? AND episode_id = ?',
        [progress, completed, userId, episodeId]
      )
    } else {
      await pool.execute(
        'INSERT INTO watch_history (user_id, episode_id, progress, completed) VALUES (?, ?, ?, ?)',
        [userId, episodeId, progress, completed]
      )
    }

    res.json({
      success: true,
      message: 'İzleme ilerlemesi güncellendi'
    })
  } catch (error) {
    console.error('Update watch progress error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
} 