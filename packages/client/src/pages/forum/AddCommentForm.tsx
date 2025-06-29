import React from 'react'
import styles from './ForumPage.module.css'

interface AddCommentFormProps {
  comment: string
  onCommentChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  navigateBack: () => void
}

export const AddCommentForm = ({
  comment,
  onCommentChange,
  onSubmit,
  navigateBack,
}: AddCommentFormProps) => (
  <form onSubmit={onSubmit} className={styles.addCommentForm}>
    <textarea
      rows={3}
      value={comment}
      onChange={e => onCommentChange(e.target.value)}
      placeholder="Ваше сообщение..."
    />
    <div className={styles.buttons}>
      <button className={styles.addCommentBtn} type="submit">
        Отправить
      </button>
      <button
        className={styles.createTopicBtn}
        onClick={e => {
          e.preventDefault()
          navigateBack()
        }}>
        ← Назад
      </button>
    </div>
  </form>
)
