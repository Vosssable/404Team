import { ForumTopic, ForumComment } from '../../types/forum'

export const mockTopics: ForumTopic[] = [
  {
    id: '1',
    title: 'Первый топик',
    content: 'Обсуждение игры',
    author: 'User1',
    createdAt: '2024-06-01',
  },
  {
    id: '2',
    title: 'Вопросы по механике',
    content: 'Задавайте вопросы!',
    author: 'User2',
    createdAt: '2024-06-02',
  },
  {
    id: '3',
    title: 'Любимые стратегии',
    content: 'Делимся тактиками и советами.',
    author: 'User3',
    createdAt: '2024-06-03',
  },
]

export const mockComments: ForumComment[] = [
  {
    id: 'c1',
    topicId: '1',
    content: 'Согласен, игра отличная!',
    author: 'User2',
    userId: 'user2',
    createdAt: '2024-06-01',
  },
  {
    id: 'c2',
    topicId: '1',
    content: 'А какие есть секреты?',
    author: 'User3',
    userId: 'user3',
    createdAt: '2024-06-02',
  },
  {
    id: 'c3',
    topicId: '2',
    content: 'Какой максимальный уровень?',
    author: 'User1',
    userId: 'user1',
    createdAt: '2024-06-02',
  },
  {
    id: 'c4',
    topicId: '3',
    content: 'Я всегда стараюсь ловить яйца в правом верхнем углу!',
    author: 'User2',
    userId: 'user2',
    createdAt: '2024-06-03',
  },
]
