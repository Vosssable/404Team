import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './ForumPage.module.css'
import { mockTopics, mockComments } from './lib/mockForumData'
import { ForumComment } from './lib/forumTypes'
import { AddCommentForm } from './AddCommentForm'
import { EmojiReactions } from './EmojiReactions'
import {
  useEmojiReactions,
  useCommentEmojiReactions,
} from './lib/useEmojiReactions'

const currentUserId = 'user2' // временно, потом брать из auth

const ForumTopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>()
  const navigate = useNavigate()
  const topic = useMemo(() => mockTopics.find(t => t.id === topicId), [topicId])
  const [comments, setComments] = useState<ForumComment[]>(
    mockComments.filter(c => c.topicId === topicId)
  )
  const [comment, setComment] = useState('')

  const isMyMessage = (userId: string) => userId === currentUserId

  // Хук для управления эмодзи-реакциями топика
  const {
    reactions: topicReactions,
    addReaction: addTopicReaction,
    removeReaction: removeTopicReaction,
  } = useEmojiReactions({
    topicId: topicId || '',
    currentUserId,
    initialReactions: topic?.reactions || [],
  })

  // Хук для управления эмодзи-реакциями комментариев
  const { addCommentReaction, removeCommentReaction } =
    useCommentEmojiReactions({
      topicId: topicId || '',
      currentUserId,
      comments,
      onCommentsUpdate: setComments,
    })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim() || !topic) return
    setComments([
      ...comments,
      {
        id: String(Date.now()),
        topicId: topic.id,
        content: comment,
        author: 'User2', // временно, потом брать из профиля
        userId: currentUserId,
        createdAt: new Date().toISOString().slice(0, 10),
        reactions: [],
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

        {/* Эмодзи-реакции для топика */}
        <EmojiReactions
          reactions={topicReactions}
          currentUserId={currentUserId}
          onReactionAdd={addTopicReaction}
          onReactionRemove={removeTopicReaction}
        />

        <div className={styles.commentsTitle}>Чат</div>
        <div className={styles.chatContainer}>
          {comments.map(c => (
            <div
              key={c.id}
              className={
                isMyMessage(c.userId) ? styles.myMessage : styles.otherMessage
              }>
              <div className={styles.messageHeader}>
                {!isMyMessage(c.userId) && (
                  <span className={styles.commentAuthor}>{c.author}</span>
                )}
                <span className={styles.commentDate}>{c.createdAt}</span>
              </div>
              <div className={styles.messageContent}>{c.content}</div>

              {/* Эмодзи-реакции для комментария */}
              <EmojiReactions
                reactions={c.reactions || []}
                currentUserId={currentUserId}
                onReactionAdd={emoji => addCommentReaction(c.id, emoji)}
                onReactionRemove={emoji => removeCommentReaction(c.id, emoji)}
              />
            </div>
          ))}
        </div>
        <AddCommentForm
          comment={comment}
          onCommentChange={setComment}
          onSubmit={handleSubmit}
          navigateBack={() => navigate(-1)}
        />
      </div>
    </div>
  )
}

export default ForumTopicPage
