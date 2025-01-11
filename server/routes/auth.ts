import express from 'express'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail, validatePassword } from '../models/user'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'Bu email adresi zaten kullanılıyor.' })
    }

    await createUser({ username, email, password })

    res.status(201).json({ message: 'Kayıt başarılı! Giriş yapabilirsiniz.' })
  } catch (error) {
    console.error('Kayıt hatası:', error)
    res.status(500).json({ message: 'Kayıt sırasında bir hata oluştu.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Email veya şifre hatalı.' })
    }

    const isValidPassword = await validatePassword(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Email veya şifre hatalı.' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    const { password: _, ...userWithoutPassword } = user

    res.json({
      message: 'Giriş başarılı!',
      token,
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Giriş hatası:', error)
    res.status(500).json({ message: 'Giriş sırasında bir hata oluştu.' })
  }
})

export default router 