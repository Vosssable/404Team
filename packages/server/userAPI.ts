import type { Express } from 'express'
import { User } from './models/user.model'
import { UserTheme } from './models/user-theme.model'
import { SiteTheme } from './models/site-theme.model'

// Функция для экранирования HTML на сервере
function escapeHtml(text: string): string {
  if (typeof text !== 'string') {
    return String(text)
  }

  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  return text.replace(/[&<>"'/]/g, match => htmlEscapes[match])
}

// Функция для валидации входных данных
function validateInput(input: string, maxLength = 100): string | null {
  if (typeof input !== 'string') {
    return null
  }

  // Проверяем длину
  if (input.length > maxLength) {
    return null
  }

  // Проверяем на наличие опасных паттернов
  const dangerousPatterns = [
    /<script\b/i,
    /javascript:/i,
    /data:text\/html/i,
    /vbscript:/i,
    /on\w+\s*=/i,
    /<iframe\b/i,
    /<object\b/i,
    /<embed\b/i,
  ]

  for (const pattern of dangerousPatterns) {
    if (pattern.test(input)) {
      return null
    }
  }

  return input.trim()
}

const userAPI = (app: Express) => {
  app.get('/user/:username', async (req, res) => {
    const { username } = req.params

    // Валидируем username
    const validatedUsername = validateInput(username, 50)
    if (!validatedUsername) {
      return res.status(400).json({ error: 'Некорректное имя пользователя' })
    }

    try {
      const user = await User.findOne({
        where: { userName: validatedUsername },
        include: {
          model: UserTheme,
          include: [SiteTheme],
        },
      })

      if (!user) {
        return res.status(404).json({ error: 'Нет такого пользователя' })
      }

      const userTheme = user.userThemes?.[0]
      const theme = userTheme?.siteTheme?.theme ?? 'light'

      return res.json({
        id: user.id,
        username: escapeHtml(user.userName), // Экранируем для безопасности
        theme,
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Ошибка сервера' })
    }
  })

  app.post('/user', async (req, res) => {
    const { username, darkTheme } = req.body

    if (!username) {
      return res.status(400).json({ error: 'Нет поля username' })
    }

    // Валидируем username
    const validatedUsername = validateInput(username, 50)
    if (!validatedUsername) {
      return res.status(400).json({ error: 'Некорректное имя пользователя' })
    }

    try {
      const existing = await User.findOne({
        where: { userName: validatedUsername },
      })
      if (existing) {
        return res.status(400).json({ error: 'Пользователь уже существует' })
      }

      const user = await User.create({ userName: validatedUsername })

      const defaultTheme = darkTheme ? 'dark' : 'light'
      const theme = await SiteTheme.findOne({ where: { theme: defaultTheme } })

      if (theme) {
        await UserTheme.create({
          ownerId: user.id,
          themeId: theme.id,
        })
      }

      return res.status(201).json({
        id: user.id,
        username: escapeHtml(user.userName), // Экранируем для безопасности
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Ошибка сервера' })
    }
  })

  app.patch('/user/:username', async (req, res) => {
    const { username } = req.params

    // Валидируем username
    const validatedUsername = validateInput(username, 50)
    if (!validatedUsername) {
      return res.status(400).json({ error: 'Некорректное имя пользователя' })
    }

    try {
      const user = await User.findOne({
        where: { userName: validatedUsername },
      })
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' })
      }

      // Здесь можно добавить логику обновления пользователя
      return res.json({
        id: user.id,
        username: escapeHtml(user.userName), // Экранируем для безопасности
      })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Ошибка сервера' })
    }
  })

  app.get('/user/:username/theme', async (req, res) => {
    const { username } = req.params

    try {
      const user = await User.findOne({
        where: { userName: username },
        include: {
          model: UserTheme,
          include: [SiteTheme],
          limit: 1,
          order: [['id', 'DESC']],
        },
      })

      if (!user || !user.userThemes?.length) {
        return res.status(404).json({ error: 'Тема не найдена' })
      }

      const theme = user.userThemes[0].siteTheme?.theme ?? 'light'

      return res.json({ theme })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Ошибка сервера' })
    }
  })

  app.get('/themes', async (_, res) => {
    try {
      const themes = await SiteTheme.findAll()
      return res.json(themes)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Ошибка при получении тем' })
    }
  })
}

export default userAPI
