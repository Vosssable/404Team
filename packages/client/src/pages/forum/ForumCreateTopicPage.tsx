import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ForumPage.module.css'

const ForumCreateTopicPage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    navigate('/forum')
  }

  return (
    <div className={styles.forumRoot}>
      <div className={styles.forumModal}>
        <div className={styles.forumTitle}>Создать топик</div>
        <form onSubmit={handleSubmit} className={styles.addCommentForm}>
          <input
            className={styles.topicInput}
            placeholder="Заголовок"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            rows={4}
            placeholder="Сообщение"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
          <div className={styles.buttons}>
            <button className={styles.addCommentBtn} type="submit">
              Создать
            </button>
            <button
              className={styles.createTopicBtn}
              onClick={() => navigate(-1)}>
              Назад
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForumCreateTopicPage
