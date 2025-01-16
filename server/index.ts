import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import authRoutes from './routes/auth.js'
import settingsRoutes from './routes/settings.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

const app = express()

// CORS ayarları
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}))

app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/settings', settingsRoutes)

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Sunucu hatası!' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`✨ Server running on port ${PORT}`)
}) 