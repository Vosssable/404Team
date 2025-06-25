import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './ForumPage.module.css'
import { ForumTopic, ForumComment } from '../../types/forum'

const mockTopics: ForumTopic[] = [
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
]

const mockComments: ForumComment[] = [
  {
    id: 'c1',
    topicId: '1',
    content: 'Согласен, игра отличная!',
    author: 'User2',
    createdAt: '2024-06-01',
  },
  {
    id: 'c2',
    topicId: '1',
    content: 'А какие есть секреты?',
    author: 'User3',
    createdAt: '2024-06-02',
  },
]

const ForumTopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>()
  const navigate = useNavigate()
  const topic = useMemo(() => mockTopics.find(t => t.id === topicId), [topicId])
  const [comments, setComments] = useState<ForumComment[]>(
    mockComments.filter(c => c.topicId === topicId)
  )
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim() || !topic) return
    setComments([
      ...comments,
      {
        id: String(Date.now()),
        topicId: topic.id,
        content: comment,
        author: 'Вы',
        createdAt: new Date().toISOString().slice(0, 10),
      },
    ])
    setComment('')
  }

  if (!topic) {
    return (
      <div className={styles.forumRoot}>
        <div className={styles.forumModal}>
          <div className={styles.forumTitle}>Топик не найден</div>
          <button
            className={styles.createTopicBtn}
            onClick={() => navigate(-1)}>
            Назад
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.forumRoot}>
      <div className={styles.forumModal}>
        <div className={styles.topicTitle}>{topic.title}</div>
        <div className={styles.topicMeta}>
          {topic.author} | {topic.createdAt}
        </div>
        <div className={styles.topicContent}>{topic.content}</div>

        <div className={styles.commentsTitle}>Комментарии</div>
        {comments.map(c => (
          <div key={c.id} className={styles.commentCard}>
            <div className={styles.commentAuthor}>{c.author}</div>
            <div>{c.content}</div>
            <div className={styles.commentDate}>{c.createdAt}</div>
          </div>
        ))}
        <form onSubmit={handleSubmit} className={styles.addCommentForm}>
          <textarea
            rows={3}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Ваш комментарий..."
          />
          <div className={styles.buttons}>
            <button className={styles.addCommentBtn} type="submit">
              Добавить
            </button>
            <button
              className={styles.createTopicBtn}
              onClick={() => navigate(-1)}>
              ← Назад
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForumTopicPage
