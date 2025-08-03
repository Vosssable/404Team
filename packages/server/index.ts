import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { createClientAndConnect } from './db'
import { Pool } from 'pg'
import userAPI from './userAPI'

dotenv.config({ path: '../../.env' })

const app = express()
app.use(cors())
app.use(express.json())
const port = Number(process.env.SERVER_PORT) || 3001

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
})

createClientAndConnect()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.get('/emojis', async (_, res) => {
  try {
    await pool.query('SELECT NOW()')
    const { rows } = await pool.query('SELECT * FROM emojis')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Нет подключения к базе' })
  }
})

app.get('/emojis/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { rows } = await pool.query(
      'SELECT * FROM emojis WHERE emoji_id = $1',
      [id]
    )

    if (rows.length === 0) {
      res.status(404).json({ error: 'Нет такого эмодзи' })
      return
    }

    res.json(rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Нет подключения к базе' })
  }
})

userAPI(app, pool)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
