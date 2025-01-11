import { Request, Response, NextFunction } from 'express'

interface AppError extends Error {
  statusCode?: number
  errors?: any[]
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Sunucu hatası'

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
} 