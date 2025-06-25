import React from 'react'
import styles from './ForumPage.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { ForumTopic } from '../../types/forum'

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

const ForumPage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.forumRoot}>
      <div className={styles.forumModal}>
        <div className={styles.forumTitle}>Форум</div>
        <div className={styles.topicsHeader}>
          <span>Темы</span>
          <button
            className={styles.createTopicBtn}
            onClick={() => navigate('/forum/create')}>
            + Создать топик
          </button>
        </div>
        <div className={styles.topicsList}>
          {mockTopics.map(topic => (
            <div key={topic.id} className={styles.topicCard}>
              <Link to={`/forum/${topic.id}`} className={styles.topicLink}>
                <div className={styles.topicTitle}>{topic.title}</div>
                <div className={styles.topicMeta}>
                  {topic.author} | {topic.createdAt}
                </div>
                <div className={styles.topicPreview}>{topic.content}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ForumPage
