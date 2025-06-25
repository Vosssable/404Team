export interface ForumTopic {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
}

export interface ForumComment {
  id: string
  topicId: string
  content: string
  author: string
  userId: string
  createdAt: string
  isRead?: boolean
}
