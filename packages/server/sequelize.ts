// server/sequelize.ts
import { Sequelize } from 'sequelize-typescript'
import { User } from './models/user.model'
import { SiteTheme } from './models/site-theme.model'
import { UserTheme } from './models/user-theme.model'
import { Emoji } from './models/emoji.model'
import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [SiteTheme, User, UserTheme, Emoji],
})
