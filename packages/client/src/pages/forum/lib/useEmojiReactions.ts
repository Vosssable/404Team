import { useState, useCallback } from 'react'
import { EmojiReaction, ForumComment } from './forumTypes'
import {
  mockAddTopicReaction,
  mockRemoveTopicReaction,
  mockAddCommentReaction,
  mockRemoveCommentReaction,
} from './emojiApi'

interface UseEmojiReactionsProps {
  topicId: string
  currentUserId: string
  initialReactions?: EmojiReaction[]
}

export const useEmojiReactions = ({
  topicId,
  currentUserId,
  initialReactions = [],
}: UseEmojiReactionsProps) => {
  const [reactions, setReactions] = useState<EmojiReaction[]>(initialReactions)
  const [isLoading, setIsLoading] = useState(false)

  const addReaction = useCallback(
    async (emoji: string) => {
      setIsLoading(true)
      try {
        const newReactions = await mockAddTopicReaction(
          topicId,
          emoji,
          currentUserId,
          reactions
        )
        setReactions(newReactions)
      } catch (error) {
        console.error('Ошибка при добавлении реакции:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [topicId, currentUserId, reactions]
  )

  const removeReaction = useCallback(
    async (emoji: string) => {
      setIsLoading(true)
      try {
        const newReactions = await mockRemoveTopicReaction(
          topicId,
          emoji,
          currentUserId,
          reactions
        )
        setReactions(newReactions)
      } catch (error) {
        console.error('Ошибка при удалении реакции:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [topicId, currentUserId, reactions]
  )

  const updateReactions = useCallback((newReactions: EmojiReaction[]) => {
    setReactions(newReactions)
  }, [])

  return {
    reactions,
    isLoading,
    addReaction,
    removeReaction,
    updateReactions,
  }
}

interface UseCommentEmojiReactionsProps {
  topicId: string
  currentUserId: string
  comments: ForumComment[]
  onCommentsUpdate: (comments: ForumComment[]) => void
}

export const useCommentEmojiReactions = ({
  topicId,
  currentUserId,
  comments,
  onCommentsUpdate,
}: UseCommentEmojiReactionsProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const addCommentReaction = useCallback(
    async (commentId: string, emoji: string) => {
      setIsLoading(true)
      try {
        const comment = comments.find(c => c.id === commentId)
        if (!comment) return

        const newReactions = await mockAddCommentReaction(
          topicId,
          commentId,
          emoji,
          currentUserId,
          comment.reactions || []
        )

        const updatedComments = comments.map(c =>
          c.id === commentId ? { ...c, reactions: newReactions } : c
        )

        onCommentsUpdate(updatedComments)
      } catch (error) {
        console.error('Ошибка при добавлении реакции к комментарию:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [topicId, currentUserId, comments, onCommentsUpdate]
  )

  const removeCommentReaction = useCallback(
    async (commentId: string, emoji: string) => {
      setIsLoading(true)
      try {
        const comment = comments.find(c => c.id === commentId)
        if (!comment) return

        const newReactions = await mockRemoveCommentReaction(
          topicId,
          commentId,
          emoji,
          currentUserId,
          comment.reactions || []
        )

        const updatedComments = comments.map(c =>
          c.id === commentId ? { ...c, reactions: newReactions } : c
        )

        onCommentsUpdate(updatedComments)
      } catch (error) {
        console.error('Ошибка при удалении реакции с комментария:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [topicId, currentUserId, comments, onCommentsUpdate]
  )

  return {
    isLoading,
    addCommentReaction,
    removeCommentReaction,
  }
}
