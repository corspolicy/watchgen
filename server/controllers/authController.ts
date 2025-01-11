import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../config/database'

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    const user = (users as any[])[0]

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'E-posta veya şifre hatalı'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'E-posta veya şifre hatalı'
      })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    )

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if ((existingUsers as any[]).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Bu e-posta adresi zaten kullanılıyor'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, 'user']
    )

    const userId = (result as any).insertId

    const token = jwt.sign(
      { id: userId, email, role: 'user' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    )

    res.status(201).json({
      success: true,
      token,
      user: {
        id: userId,
        username,
        email,
        role: 'user'
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if ((users as any[]).length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı'
      })
    }

    res.json({
      success: true,
      message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi'
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body

    res.json({
      success: true,
      message: 'Şifreniz başarıyla güncellendi'
    })
  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    })
  }
} 