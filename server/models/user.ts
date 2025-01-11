import pool from '../config/database'
import bcrypt from 'bcryptjs'

export interface User {
  id?: number
  username: string
  email: string
  password: string
  avatar?: string
  created_at?: Date
}

export const createUser = async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10)
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)',
    [user.username, user.email, hashedPassword, user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`]
  )
  return result
}

export const findUserByEmail = async (email: string) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
  return (rows as User[])[0]
}

export const validatePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const findUserById = async (id: number) => {
  const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])
  return (rows as User[])[0]
} 