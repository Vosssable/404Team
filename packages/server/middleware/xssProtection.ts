import { Request, Response, NextFunction } from 'express'

/**
 * Middleware для защиты от XSS атак
 */
export function xssProtectionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Функция для экранирования HTML
  function escapeHtml(text: string): string {
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

  // Функция для валидации входных данных
  function validateInput(input: string, maxLength = 1000): string | null {
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

  // Функция для рекурсивной очистки объекта
  function sanitizeObject(obj: unknown): unknown {
    if (obj === null || obj === undefined) {
      return obj
    }

    if (typeof obj === 'string') {
      return validateInput(obj) || ''
    }

    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject)
    }

    if (typeof obj === 'object') {
      const sanitized: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = sanitizeObject(value)
      }
      return sanitized
    }

    return obj
  }

  // Очищаем body запроса
  if (req.body) {
    req.body = sanitizeObject(req.body) as typeof req.body
  }

  // Очищаем query параметры
  if (req.query) {
    req.query = sanitizeObject(req.query) as typeof req.query
  }

  // Очищаем params
  if (req.params) {
    req.params = sanitizeObject(req.params) as typeof req.params
  }

  // Добавляем функцию экранирования в res для использования в ответах
  res.locals.escapeHtml = escapeHtml

  next()
}

/**
 * Middleware для установки заголовков безопасности
 */
export function securityHeadersMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Заголовки для защиты от XSS
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Content Security Policy
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  )

  next()
}
