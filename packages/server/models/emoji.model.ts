import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript'

@Table({ tableName: 'emojis', timestamps: false })
export class Emoji extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: 'emoji_id', type: DataType.INTEGER })
  override id!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  emoji!: string

  @AllowNull(false)
  @Column({ field: 'emoji_name', type: DataType.STRING })
  emojiName!: string
}
