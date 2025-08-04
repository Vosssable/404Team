import { Sequelize } from 'sequelize-typescript'
import { User } from './models/User'
import { SiteTheme } from './models/SiteTheme'
import { UserTheme } from './models/UserTheme'

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'yourpassword',
  database: 'wolf_db',
  models: [User, SiteTheme, UserTheme],
})
