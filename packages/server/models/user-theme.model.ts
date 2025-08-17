import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript'
import { User } from './user.model'
import { SiteTheme } from './site-theme.model'

@Table({ tableName: 'user_theme', timestamps: false })
export class UserTheme extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'theme_id' })
  themeId!: number

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'owner_id' })
  ownerId!: number

  @Column(DataType.STRING)
  device?: string

  @BelongsTo(() => SiteTheme)
  siteTheme!: SiteTheme

  @BelongsTo(() => User, { foreignKey: 'ownerId' })
  owner!: User
}
