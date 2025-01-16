import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import pool from '../config/database.js'

interface AuthRequest extends Request {
  user?: {
    id: number
    email: string
    role: string
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Kullanıcıyı bul
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    const user = (users as any[])[0]

    if (!user) {
      return res.status(401).json({ message: 'Email veya şifre hatalı' })
    }

    // Şifreyi kontrol et
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Email veya şifre hatalı' })
    }

    // Token oluştur
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    // Kullanıcı bilgilerini gönder (şifre hariç)
    const { password: _, ...userWithoutPassword } = user

    res.json({
      message: 'Giriş başarılı!',
      token,
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Giriş hatası:', error)
    res.status(500).json({ message: 'Giriş sırasında bir hata oluştu' })
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    // Email kontrolü
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    if ((existingUsers as any[]).length > 0) {
      return res.status(400).json({ message: 'Bu email adresi zaten kullanılıyor' })
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10)

    // Kullanıcıyı kaydet
    await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, 'user']
    )

    res.status(201).json({ message: 'Kayıt başarılı! Giriş yapabilirsiniz.' })
  } catch (error) {
    console.error('Kayıt hatası:', error)
    res.status(500).json({ message: 'Kayıt sırasında bir hata oluştu' })
  }
}

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı' })
    }

    // Kullanıcı bilgilerini getir
    const [users] = await pool.query('SELECT id, username, email, role FROM users WHERE id = ?', [req.user.id])
    const user = (users as any[])[0]

    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı' })
    }

    res.json(user)
  } catch (error) {
    console.error('Kullanıcı bilgileri getirme hatası:', error)
    res.status(500).json({ message: 'Kullanıcı bilgileri alınırken bir hata oluştu' })
  }
} 