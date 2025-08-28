import React from 'react'
import { safeDisplay } from '../utils/xssProtection'

interface SafeHtmlProps {
  content: string
  className?: string
  tag?: keyof JSX.IntrinsicElements
}

/**
 * Компонент для безопасного отображения HTML контента
 * Автоматически применяет защиту от XSS
 */
export const SafeHtml: React.FC<SafeHtmlProps> = ({
  content,
  className,
  tag: Tag = 'div',
}) => {
  const safeContent = safeDisplay(content)

  return <Tag className={className}>{safeContent}</Tag>
}

export default SafeHtml
