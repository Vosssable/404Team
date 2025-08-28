import React from 'react'
import styles from './ForumPage.module.css'
import { validateInput } from '../../utils/xssProtection'

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
}: AddCommentFormProps) => {
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    // Применяем защиту от XSS при вводе
    const validated = validateInput(value, 5000)
    if (validated !== null) {
      onCommentChange(validated)
    } else {
      // Если ввод невалиден, очищаем поле
      e.target.value = ''
      onCommentChange('')
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.addCommentForm}>
      <textarea
        rows={3}
        value={comment}
        onChange={handleCommentChange}
        placeholder="Ваше сообщение..."
        onBlur={e => {
          // Дополнительная валидация при потере фокуса
          const value = e.target.value
          const validated = validateInput(value, 5000)
          if (validated === null) {
            e.target.classList.add('input-error')
          } else {
            e.target.classList.remove('input-error')
          }
        }}
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
}
