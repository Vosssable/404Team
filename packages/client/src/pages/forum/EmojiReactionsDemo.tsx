import React, { useState } from 'react'
import { EmojiReactions } from './EmojiReactions'
import { EmojiReaction } from './lib/forumTypes'
import styles from './ForumPage.module.css'

export const EmojiReactionsDemo: React.FC = () => {
  const [reactions, setReactions] = useState<EmojiReaction[]>([
    {
      id: '1',
      emoji: '👍',
      count: 3,
      users: ['user1', 'user2'],
    },
    {
      id: '2',
      emoji: '❤️',
      count: 2,
      users: ['user1'],
    },
  ])

  const currentUserId = 'user1'

  const handleAddReaction = (emoji: string) => {
    const existingReaction = reactions.find(r => r.emoji === emoji)

    if (existingReaction) {
      if (existingReaction.users.includes(currentUserId)) {
        return
      }

      setReactions(
        reactions.map(r =>
          r.emoji === emoji
            ? { ...r, count: r.count + 1, users: [...r.users, currentUserId] }
            : r
        )
      )
    } else {
      const newReaction: EmojiReaction = {
        id: `reaction_${Date.now()}`,
        emoji,
        count: 1,
        users: [currentUserId],
      }
      setReactions([...reactions, newReaction])
    }
  }

  const handleRemoveReaction = (emoji: string) => {
    setReactions(
      reactions
        .map(r => {
          if (r.emoji === emoji && r.users.includes(currentUserId)) {
            const newUsers = r.users.filter(u => u !== currentUserId)
            const newCount = r.count - 1

            if (newCount === 0) {
              return null
            }

            return { ...r, count: newCount, users: newUsers }
          }
          return r
        })
        .filter((r): r is EmojiReaction => r !== null)
    )
  }

  return (
    <div className={styles.forumRoot}>
      <div className={styles.forumModal}>
        <div className={styles.forumTitle}>Демонстрация эмодзи-реакций</div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Как добавить реакцию:</h3>
          <ol style={{ textAlign: 'left', lineHeight: '1.6' }}>
            <li>
              Найдите кнопку с символом "+" (справа от существующих реакций)
            </li>
            <li>Нажмите на неё - откроется палитра с эмодзи</li>
            <li>Выберите нужный эмодзи кликом</li>
            <li>Реакция добавится автоматически</li>
            <li>Чтобы убрать свою реакцию, нажмите на неё ещё раз</li>
          </ol>
        </div>

        <div
          style={{
            background: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
          }}>
          <h4>Пример контента с реакциями:</h4>
          <p>
            Это пример топика или комментария, к которому можно добавить
            эмодзи-реакции.
          </p>

          <EmojiReactions
            reactions={reactions}
            currentUserId={currentUserId}
            onReactionAdd={handleAddReaction}
            onReactionRemove={handleRemoveReaction}
          />
        </div>

        <div
          style={{
            background: '#e8f4fd',
            padding: '15px',
            borderRadius: '8px',
            fontSize: '14px',
          }}>
          <strong>Текущий пользователь:</strong> {currentUserId}
          <br />
          <strong>Всего реакций:</strong> {reactions.length}
          <br />
          <strong>Ваши реакции:</strong>{' '}
          {reactions
            .filter(r => r.users.includes(currentUserId))
            .map(r => r.emoji)
            .join(' ')}
        </div>
      </div>
    </div>
  )
}
