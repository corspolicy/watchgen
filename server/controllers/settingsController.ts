import { Request, Response } from 'express'
import pool from '../config/database'

// Tüm ayarları getir
export const getAllSettings = async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT key_name, value FROM settings')
    
    // Ayarları object formatına çevir
    const settings = {}
    for (const row of rows as any[]) {
      settings[row.key_name] = row.value
    }
    
    res.json(settings)
  } catch (error) {
    console.error('Ayarlar getirilirken hata:', error)
    res.status(500).json({ message: 'Ayarlar getirilirken bir hata oluştu' })
  }
}

// Ayarları güncelle
export const updateSettings = async (req: Request, res: Response) => {
  try {
    const settings = req.body

    // Her bir ayarı güncelle veya ekle
    for (const [key, value] of Object.entries(settings)) {
      await pool.query(
        'INSERT INTO settings (key_name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?',
        [key, value, value]
      )
    }

    res.json({ message: 'Ayarlar başarıyla güncellendi' })
  } catch (error) {
    console.error('Ayarlar güncellenirken hata:', error)
    res.status(500).json({ message: 'Ayarlar güncellenirken bir hata oluştu' })
  }
} 