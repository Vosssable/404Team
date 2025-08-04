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
import { User } from './User'
import { SiteTheme } from './SiteTheme'

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
  SiteTheme!: SiteTheme
}
