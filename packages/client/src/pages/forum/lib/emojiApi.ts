import { EmojiReaction } from './forumTypes'

const API_BASE_URL = '/api/forum'

interface AddReactionRequest {
  topicId: string
  commentId?: string
  emoji: string
  userId: string
}

interface RemoveReactionRequest {
  topicId: string
  commentId?: string
  emoji: string
  userId: string
}

// Функция для добавления эмодзи-реакции к топику
export const addTopicReaction = async (
  topicId: string,
  emoji: string,
  userId: string
): Promise<EmojiReaction[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/topics/${topicId}/reactions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topicId,
          emoji,
          userId,
        } as AddReactionRequest),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Ошибка при добавлении реакции к топику:', error)
    throw error
  }
}

// Функция для удаления эмодзи-реакции с топика
export const removeTopicReaction = async (
  topicId: string,
  emoji: string,
  userId: string
): Promise<EmojiReaction[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/topics/${topicId}/reactions/${encodeURIComponent(
        emoji
      )}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topicId,
          emoji,
          userId,
        } as RemoveReactionRequest),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Ошибка при удалении реакции с топика:', error)
    throw error
  }
}

// Функция для добавления эмодзи-реакции к комментарию
export const addCommentReaction = async (
  topicId: string,
  commentId: string,
  emoji: string,
  userId: string
): Promise<EmojiReaction[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/topics/${topicId}/comments/${commentId}/reactions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topicId,
          commentId,
          emoji,
          userId,
        } as AddReactionRequest),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Ошибка при добавлении реакции к комментарию:', error)
    throw error
  }
}

// Функция для удаления эмодзи-реакции с комментария
export const removeCommentReaction = async (
  topicId: string,
  commentId: string,
  emoji: string,
  userId: string
): Promise<EmojiReaction[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/topics/${topicId}/comments/${commentId}/reactions/${encodeURIComponent(
        emoji
      )}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topicId,
          commentId,
          emoji,
          userId,
        } as RemoveReactionRequest),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Ошибка при удалении реакции с комментария:', error)
    throw error
  }
}

// Функция для получения эмодзи-реакций топика
export const getTopicReactions = async (
  topicId: string
): Promise<EmojiReaction[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/topics/${topicId}/reactions`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении реакций топика:', error)
    throw error
  }
}

// Функция для получения эмодзи-реакций комментария
export const getCommentReactions = async (
  topicId: string,
  commentId: string
): Promise<EmojiReaction[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/topics/${topicId}/comments/${commentId}/reactions`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении реакций комментария:', error)
    throw error
  }
}

// Mock функции для разработки
export const mockAddTopicReaction = async (
  topicId: string,
  emoji: string,
  userId: string,
  currentReactions: EmojiReaction[]
): Promise<EmojiReaction[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))

  const existingReaction = currentReactions.find(r => r.emoji === emoji)

  if (existingReaction) {
    if (existingReaction.users.includes(userId)) {
      // Пользователь уже поставил эту реакцию
      return currentReactions
    }

    // Добавляем пользователя к существующей реакции
    return currentReactions.map(r =>
      r.emoji === emoji
        ? { ...r, count: r.count + 1, users: [...r.users, userId] }
        : r
    )
  } else {
    // Создаем новую реакцию
    const newReaction: EmojiReaction = {
      id: `reaction_${Date.now()}`,
      emoji,
      count: 1,
      users: [userId],
    }
    return [...currentReactions, newReaction]
  }
}

export const mockRemoveTopicReaction = async (
  topicId: string,
  emoji: string,
  userId: string,
  currentReactions: EmojiReaction[]
): Promise<EmojiReaction[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))

  return currentReactions
    .map(r => {
      if (r.emoji === emoji && r.users.includes(userId)) {
        const newUsers = r.users.filter(u => u !== userId)
        const newCount = r.count - 1

        if (newCount === 0) {
          return null // Удаляем реакцию, если счетчик стал 0
        }

        return { ...r, count: newCount, users: newUsers }
      }
      return r
    })
    .filter((r): r is EmojiReaction => r !== null)
}

// Mock функции для комментариев (аналогичные функциям для топиков)
export const mockAddCommentReaction = async (
  topicId: string,
  commentId: string,
  emoji: string,
  userId: string,
  currentReactions: EmojiReaction[]
): Promise<EmojiReaction[]> => {
  // Имитируем задержку сети
  await new Promise(resolve => setTimeout(resolve, 100))

  const existingReaction = currentReactions.find(r => r.emoji === emoji)

  if (existingReaction) {
    if (existingReaction.users.includes(userId)) {
      // Пользователь уже поставил эту реакцию
      return currentReactions
    }

    // Добавляем пользователя к существующей реакции
    return currentReactions.map(r =>
      r.emoji === emoji
        ? { ...r, count: r.count + 1, users: [...r.users, userId] }
        : r
    )
  } else {
    // Создаем новую реакцию
    const newReaction: EmojiReaction = {
      id: `reaction_${Date.now()}`,
      emoji,
      count: 1,
      users: [userId],
    }
    return [...currentReactions, newReaction]
  }
}

export const mockRemoveCommentReaction = async (
  topicId: string,
  commentId: string,
  emoji: string,
  userId: string,
  currentReactions: EmojiReaction[]
): Promise<EmojiReaction[]> => {
  // Имитируем задержку сети
  await new Promise(resolve => setTimeout(resolve, 100))

  return currentReactions
    .map(r => {
      if (r.emoji === emoji && r.users.includes(userId)) {
        const newUsers = r.users.filter(u => u !== userId)
        const newCount = r.count - 1

        if (newCount === 0) {
          return null // Удаляем реакцию, если счетчик стал 0
        }

        return { ...r, count: newCount, users: newUsers }
      }
      return r
    })
    .filter((r): r is EmojiReaction => r !== null)
}
