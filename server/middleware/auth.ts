import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
  user?: {
    id: number
    email: string
    role: string
  }
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Yetkilendirme başarısız: Token bulunamadı'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    req.user = decoded as { id: number; email: string; role: string }
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Yetkilendirme başarısız: Geçersiz token'
    })
  }
}

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Bu işlem için yönetici yetkisi gerekiyor'
    })
  }
  next()
} 