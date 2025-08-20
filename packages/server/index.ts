import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { sequelize } from './sequelize'
import userAPI from './userAPI'
import { Emoji } from './models/emoji.model'

dotenv.config({ path: '../../.env' })

const app = express()

// Применяем Helmet для автоматической защиты
app.use(
  helmet({
    // Настройки Content Security Policy
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https://cdn.jsdelivr.net'],
        connectSrc: ["'self'", 'https://ya-praktikum.tech'],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    // Дополнительные настройки безопасности
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
)

app.use(cors())
app.use(express.json())

const port = Number(process.env.SERVER_PORT) || 3001

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.get('/emojis', async (_, res) => {
  try {
    const emojis = await Emoji.findAll()
    res.json(emojis)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Ошибка при получении эмодзи' })
  }
})

app.get('/emojis/:id', async (req, res) => {
  try {
    const { id } = req.params
    const emoji = await Emoji.findByPk(Number(id))

    if (!emoji) {
      return res.status(404).json({ error: 'Нет такого эмодзи' })
    }

    return res.json(emoji)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Ошибка при подключении к БД' })
  }
})

userAPI(app)

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
    console.log(`  ➜ 🛡️ Helmet security headers enabled`)
  })
})
