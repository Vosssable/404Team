import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  Index,
  HasMany,
} from 'sequelize-typescript'
import { UserTheme } from './UserTheme'

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number

  @AllowNull(false)
  @Unique
  @Index({ name: 'idx_users_user_name', using: 'btree' })
  @Column({ type: DataType.STRING, field: 'user_name' })
  userName!: string

  @HasMany(() => UserTheme)
  userThemes!: UserTheme[]
}
