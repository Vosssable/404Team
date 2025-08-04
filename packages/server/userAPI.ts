import type { Express } from 'express'
import type { Pool } from 'pg'

const userAPI = (app: Express, pool: Pool) => {
  app.get('/user/:username', async (req, res) => {
    try {
      const { username } = req.params

      const { rows } = await pool.query(
        'SELECT * FROM users WHERE user_name = $1',
        [username]
      )

      if (rows.length === 0) {
        res.status(404).json({ error: 'Нет такого пользователя' })
        return
      }

      res.json(rows[0])
    } catch (err) {
      res.status(500).json({ error: 'Нет подключения к базе' })
    }
  })

  app.post('/user', async (req, res) => {
    try {
      const { username, darkTheme } = req.body

      if (!username) {
        res.status(400).json({ error: 'Нет поля username' })
        return
      }
      const result = await pool.query(
        'insert into users (user_name, dark_theme) values ($1, $2);',
        [username, darkTheme]
      )

      res.status(201).json(!!result.rowCount)
    } catch (err) {
      res.status(500).json({ error: 'Нет подключения к базе' })
    }
  })

  app.patch('/user/:username', async (req, res) => {
    try {
      const { username } = req.params
      pool
        .query(`SELECT * FROM Users WHERE user_name ILIKE '${username}'`)
        .then(result => {
          pool
            .query(
              `UPDATE Users SET dark_theme = ${!result.rows[0]
                .dark_theme} WHERE user_name ILIKE '${username}'`
            )
            .then(() => {
              res.status(201).json(result.rows[0])
            })
        })
    } catch (err) {
      res.status(500).json({ error: 'Нет подключения к базе' })
    }
  })
}

export default userAPI
