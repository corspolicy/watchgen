import { Request, Response } from 'express'
import pool from '../config/database'

interface AuthRequest extends Request {
  user?: {
    id: number
    email: string
    role: string
  }
}

export const getAnimes = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const offset = (page - 1) * limit

    const [animes] = await pool.execute(
      'SELECT * FROM animes ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    )

    const [total] = await pool.execute('SELECT COUNT(*) as count FROM animes')
    const totalCount = (total as any[])[0].count

    res.json({
      success: true,
      data: animes,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error('Get animes error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const searchAnimes = async (req: Request, res: Response) => {
  try {
    const { query, genre } = req.query
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const offset = (page - 1) * limit

    let sql = 'SELECT * FROM animes WHERE 1=1'
    const params: any[] = []

    if (query) {
      sql += ' AND (title LIKE ? OR synopsis LIKE ?)'
      params.push(`%${query}%`, `%${query}%`)
    }

    if (genre) {
      sql += ' AND genre = ?'
      params.push(genre)
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const [animes] = await pool.execute(sql, params)

    res.json({
      success: true,
      data: animes
    })
  } catch (error) {
    console.error('Search animes error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const getAnimeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const [animes] = await pool.execute(
      'SELECT * FROM animes WHERE id = ?',
      [id]
    )

    if ((animes as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Anime bulunamadı'
      })
    }

    res.json({
      success: true,
      data: (animes as any[])[0]
    })
  } catch (error) {
    console.error('Get anime error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const getAnimeEpisodes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const [episodes] = await pool.execute(
      'SELECT * FROM episodes WHERE anime_id = ? ORDER BY episode_number',
      [id]
    )

    res.json({
      success: true,
      data: episodes
    })
  } catch (error) {
    console.error('Get episodes error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const getEpisodeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const [episodes] = await pool.execute(
      'SELECT * FROM episodes WHERE id = ?',
      [id]
    )

    if ((episodes as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bölüm bulunamadı'
      })
    }

    res.json({
      success: true,
      data: (episodes as any[])[0]
    })
  } catch (error) {
    console.error('Get episode error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const addAnime = async (req: AuthRequest, res: Response) => {
  try {
    const { title, synopsis, genre, year, status } = req.body

    const [result] = await pool.execute(
      'INSERT INTO animes (title, synopsis, genre, year, status) VALUES (?, ?, ?, ?, ?)',
      [title, synopsis, genre, year, status]
    )

    res.status(201).json({
      success: true,
      data: {
        id: (result as any).insertId,
        title,
        synopsis,
        genre,
        year,
        status
      }
    })
  } catch (error) {
    console.error('Add anime error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const updateAnime = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { title, synopsis, genre, year, status } = req.body

    await pool.execute(
      'UPDATE animes SET title = ?, synopsis = ?, genre = ?, year = ?, status = ? WHERE id = ?',
      [title, synopsis, genre, year, status, id]
    )

    res.json({
      success: true,
      message: 'Anime başarıyla güncellendi'
    })
  } catch (error) {
    console.error('Update anime error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const deleteAnime = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params

    await pool.execute('DELETE FROM animes WHERE id = ?', [id])

    res.json({
      success: true,
      message: 'Anime başarıyla silindi'
    })
  } catch (error) {
    console.error('Delete anime error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const addComment = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { content } = req.body
    const userId = req.user?.id

    const [result] = await pool.execute(
      'INSERT INTO comments (anime_id, user_id, content) VALUES (?, ?, ?)',
      [id, userId, content]
    )

    res.status(201).json({
      success: true,
      data: {
        id: (result as any).insertId,
        anime_id: id,
        user_id: userId,
        content,
        created_at: new Date()
      }
    })
  } catch (error) {
    console.error('Add comment error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const getComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const offset = (page - 1) * limit

    const [comments] = await pool.execute(
      `SELECT c.*, u.username 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.anime_id = ? 
       ORDER BY c.created_at DESC 
       LIMIT ? OFFSET ?`,
      [id, limit, offset]
    )

    const [total] = await pool.execute(
      'SELECT COUNT(*) as count FROM comments WHERE anime_id = ?',
      [id]
    )
    const totalCount = (total as any[])[0].count

    res.json({
      success: true,
      data: comments,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error('Get comments error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
} 