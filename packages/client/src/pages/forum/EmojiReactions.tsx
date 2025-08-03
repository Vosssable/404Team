import React, { useState, useRef, useEffect } from 'react'
import { EmojiReaction, EmojiOption, AVAILABLE_EMOJIS } from './lib/forumTypes'
import styles from './ForumPage.module.css'

interface EmojiReactionsProps {
  reactions: EmojiReaction[]
  currentUserId: string
  onReactionAdd: (emoji: string) => void
  onReactionRemove: (emoji: string) => void
  className?: string
}

export const EmojiReactions: React.FC<EmojiReactionsProps> = ({
  reactions,
  currentUserId,
  onReactionAdd,
  onReactionRemove,
  className = '',
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false)
      }
    }

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEmojiPicker])

  const handleEmojiClick = (emoji: string) => {
    const existingReaction = reactions.find(r => r.emoji === emoji)

    if (existingReaction && existingReaction.users.includes(currentUserId)) {
      // Убираем реакцию
      onReactionRemove(emoji)
    } else {
      // Добавляем реакцию
      onReactionAdd(emoji)
    }
    setShowEmojiPicker(false)
  }

  const hasUserReacted = (emoji: string) => {
    const reaction = reactions.find(r => r.emoji === emoji)
    return reaction?.users.includes(currentUserId) || false
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  return (
    <div className={`${styles.emojiReactions} ${className}`}>
      {/* Отображение существующих реакций */}
      <div className={styles.existingReactions}>
        {reactions.map(reaction => (
          <button
            key={reaction.id}
            className={`${styles.emojiButton} ${
              hasUserReacted(reaction.emoji) ? styles.userReacted : ''
            }`}
            onClick={() => handleEmojiClick(reaction.emoji)}
            title={`${reaction.emoji} ${reaction.count} - ${
              hasUserReacted(reaction.emoji)
                ? 'Убрать реакцию'
                : 'Добавить реакцию'
            }`}>
            <span className={styles.emoji}>{reaction.emoji}</span>
            <span className={styles.emojiCount}>{reaction.count}</span>
          </button>
        ))}
      </div>

      {/* Кнопка добавления новой реакции */}
      <button
        ref={buttonRef}
        className={`${styles.addReactionButton} ${
          showEmojiPicker ? styles.active : ''
        }`}
        onClick={toggleEmojiPicker}
        title="Добавить реакцию"
        aria-label="Добавить эмодзи-реакцию">
        <span className={styles.addReactionIcon}>+</span>
      </button>

      {/* Палитра эмодзи */}
      {showEmojiPicker && (
        <div ref={pickerRef} className={styles.emojiPicker}>
          <div className={styles.emojiPickerHeader}>
            <span>Выберите реакцию</span>
            <button
              className={styles.closePickerButton}
              onClick={() => setShowEmojiPicker(false)}
              aria-label="Закрыть палитру эмодзи">
              ×
            </button>
          </div>
          <div className={styles.emojiGrid}>
            {AVAILABLE_EMOJIS.map(emojiOption => (
              <button
                key={emojiOption.code}
                className={styles.emojiOption}
                onClick={() => handleEmojiClick(emojiOption.emoji)}
                title={`${emojiOption.label} - ${
                  hasUserReacted(emojiOption.emoji) ? 'Убрать' : 'Добавить'
                }`}
                aria-label={`Добавить реакцию ${emojiOption.label}`}>
                <span className={styles.emoji}>{emojiOption.emoji}</span>
                {hasUserReacted(emojiOption.emoji) && (
                  <div className={styles.userReactedIndicator}>✓</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
