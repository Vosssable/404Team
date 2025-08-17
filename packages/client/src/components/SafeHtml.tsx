import React from 'react'
import { safeDisplay } from '../utils/xssProtection'

interface SafeHtmlProps {
  content: string
  allowHtml?: boolean
  className?: string
  tag?: keyof JSX.IntrinsicElements
}

/**
 * Компонент для безопасного отображения HTML контента
 * Автоматически применяет защиту от XSS
 */
export const SafeHtml: React.FC<SafeHtmlProps> = ({
  content,
  allowHtml = false,
  className,
  tag: Tag = 'div',
}) => {
  const safeContent = safeDisplay(content, allowHtml)

  if (allowHtml) {
    return (
      <Tag
        className={className}
        dangerouslySetInnerHTML={{ __html: safeContent }}
      />
    )
  }

  return <Tag className={className}>{safeContent}</Tag>
}

export default SafeHtml
