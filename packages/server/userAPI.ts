import type { Express } from 'express'
import { User } from './models/user.model'
import { UserTheme } from './models/user-theme.model'
import { SiteTheme } from './models/site-theme.model'

const userAPI = (app: Express) => {
  app.get('/user/:username', async (req, res) => {
    const { username } = req.params

    try {
      const user = await User.findOne({
        where: { userName: username },
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
        username: user.userName,
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

    try {
      const existing = await User.findOne({ where: { userName: username } })
      if (existing) {
        return res.status(400).json({ error: 'Пользователь уже существует' })
      }

      const user = await User.create({ userName: username })

      const defaultTheme = darkTheme ? 'dark' : 'light'
      const theme = await SiteTheme.findOne({ where: { theme: defaultTheme } })

      if (theme) {
        await UserTheme.create({
          ownerId: user.id,
          themeId: theme.id,
        })
      }

      return res.status(201).json({ id: user.id, username: user.userName })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Ошибка сервера' })
    }
  })

  app.patch('/user/:username', async (req, res) => {
    const { username } = req.params

    try {
      const user = await User.findOne({ where: { userName: username } })
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' })
      }

      const userTheme = await UserTheme.findOne({ where: { ownerId: user.id } })
      if (!userTheme) {
        return res.status(404).json({ error: 'Тема не найдена' })
      }

      const currentTheme = await SiteTheme.findByPk(userTheme.themeId)
      const newThemeName = currentTheme?.theme === 'dark' ? 'light' : 'dark'

      const newTheme = await SiteTheme.findOne({
        where: { theme: newThemeName },
      })
      if (!newTheme) {
        return res.status(404).json({ error: 'Новая тема не найдена' })
      }

      userTheme.themeId = newTheme.id
      await userTheme.save()

      return res
        .status(200)
        .json({ message: 'Тема переключена', theme: newTheme.theme })
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
