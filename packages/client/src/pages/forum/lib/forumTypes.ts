export interface ForumTopic {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  reactions?: EmojiReaction[]
}

export interface ForumComment {
  id: string
  topicId: string
  content: string
  author: string
  userId: string
  createdAt: string
  isRead?: boolean
  reactions?: EmojiReaction[]
}

export interface EmojiReaction {
  id: string
  emoji: string
  count: number
  users: string[] // массив userId пользователей, которые поставили эту реакцию
}

export interface EmojiOption {
  emoji: string
  label: string
  code: string
}

// Доступные эмодзи для реакций
export const AVAILABLE_EMOJIS: EmojiOption[] = [
  { emoji: '👍', label: 'Нравится', code: 'thumbs_up' },
  { emoji: '❤️', label: 'Любовь', code: 'heart' },
  { emoji: '😂', label: 'Смех', code: 'joy' },
  { emoji: '😮', label: 'Удивление', code: 'open_mouth' },
  { emoji: '😢', label: 'Грусть', code: 'cry' },
  { emoji: '😡', label: 'Злость', code: 'rage' },
  { emoji: '👏', label: 'Аплодисменты', code: 'clap' },
  { emoji: '🎉', label: 'Праздник', code: 'party' },
  { emoji: '🔥', label: 'Огонь', code: 'fire' },
  { emoji: '💯', label: '100', code: 'hundred' },
]
