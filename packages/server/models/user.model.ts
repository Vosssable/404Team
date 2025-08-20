import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  HasMany,
} from 'sequelize-typescript'
import { UserTheme } from './user-theme.model'

@Table({
  tableName: 'users',
  timestamps: false,
  indexes: [
    {
      name: 'idx_users_user_name',
      using: 'BTREE',
      fields: ['user_name'],
    },
  ],
})
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.STRING, field: 'user_name' })
  userName!: string

  @HasMany(() => UserTheme)
  userThemes!: UserTheme[]
}
