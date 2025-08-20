/**
 * Утилиты для защиты от XSS атак
 */

/**
 * Экранирует HTML символы для безопасного отображения
 * @param text - текст для экранирования
 * @returns экранированный текст
 */
export function escapeHtml(text: string): string {
  if (typeof text !== 'string') {
    return String(text)
  }

  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  return text.replace(/[&<>"'/]/g, match => htmlEscapes[match])
}

/**
 * Валидирует и очищает HTML строку, оставляя только безопасные теги
 * @param html - HTML строка для очистки
 * @returns очищенная HTML строка
 */
export function sanitizeHtml(html: string): string {
  if (typeof html !== 'string') {
    return ''
  }

  // Простая очистка - удаляем все HTML теги, оставляя только разрешенные
  let sanitized = html

  // Удаляем все скрипты и опасные теги
  sanitized = sanitized.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ''
  )
  sanitized = sanitized.replace(
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    ''
  )
  sanitized = sanitized.replace(
    /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
    ''
  )
  sanitized = sanitized.replace(
    /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
    ''
  )
  sanitized = sanitized.replace(
    /<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi,
    ''
  )
  sanitized = sanitized.replace(/<input\b[^<]*>/gi, '')
  sanitized = sanitized.replace(
    /<textarea\b[^<]*(?:(?!<\/textarea>)<[^<]*)*<\/textarea>/gi,
    ''
  )
  sanitized = sanitized.replace(
    /<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/gi,
    ''
  )

  // Удаляем все атрибуты javascript: и data: URL
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
  sanitized = sanitized.replace(/\s*href\s*=\s*["']javascript:[^"']*["']/gi, '')
  sanitized = sanitized.replace(/\s*src\s*=\s*["']data:[^"']*["']/gi, '')

  return sanitized
}

/**
 * Валидирует входные данные для предотвращения XSS
 * @param input - входные данные
 * @param maxLength - максимальная длина (по умолчанию 1000)
 * @returns валидированные данные или null если невалидны
 */
export function validateInput(input: string, maxLength = 1000): string | null {
  if (typeof input !== 'string') {
    return null
  }

  // Проверяем длину
  if (input.length > maxLength) {
    return null
  }

  // Проверяем на наличие опасных паттернов
  const dangerousPatterns = [
    /<script\b/i,
    /javascript:/i,
    /data:text\/html/i,
    /vbscript:/i,
    /on\w+\s*=/i,
    /<iframe\b/i,
    /<object\b/i,
    /<embed\b/i,
  ]

  for (const pattern of dangerousPatterns) {
    if (pattern.test(input)) {
      return null
    }
  }

  return input.trim()
}

/**
 * Безопасно отображает пользовательский контент
 * @param content - контент для отображения
 * @param allowHtml - разрешить ли HTML теги (по умолчанию false)
 * @returns безопасный контент для отображения
 */
export function safeDisplay(content: string, allowHtml = false): string {
  if (typeof content !== 'string') {
    return ''
  }

  if (allowHtml) {
    return sanitizeHtml(content)
  }

  return escapeHtml(content)
}

/**
 * Валидирует и очищает данные формы
 * @param formData - данные формы
 * @returns очищенные данные формы
 */
export function sanitizeFormData(
  formData: Record<string, unknown>
): Record<string, string> {
  const sanitized: Record<string, string> = {}

  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      const validated = validateInput(value, 1000)
      if (validated !== null) {
        sanitized[key] = validated
      }
    }
  }

  return sanitized
}
