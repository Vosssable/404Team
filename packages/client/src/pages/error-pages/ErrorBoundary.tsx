import { Component, ReactNode } from 'react'
import ErrorPage from './ErrorPage'

/**
 * Интерфейс пропсов для компонента ErrorBoundary
 * @interface ErrorBoundaryProps
 * @property {ReactNode} children - Дочерние компоненты, которые будут обёрнуты в ErrorBoundary
 * @property {ReactNode} [fallback] - Опциональный компонент, который будет отображен вместо ErrorPage при возникновении ошибки
 * @property {Function} [onError] - Опциональный callback для обработки ошибок. Получает объект ошибки и информацию о компоненте
 */
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: { componentStack: string }) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: { componentStack: string } | null
}

/**
 * Компонент ErrorBoundary для отлова и обработки ошибок в React-приложении.
 *
 * @example
 *   Базовое использование
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * @example
 * Использование с кастомным fallback
 * <ErrorBoundary
 *   fallback={<div>Что-то пошло не так...</div>}
 *   onError={(error) => console.error(error)}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 */

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  /**
   * Статический метод для обновления состояния при возникновении ошибки
   * @param {Error} error - Объект ошибки
   * @returns {ErrorBoundaryState} Новое состояние с флагом ошибки
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null }
  }

  /**
   * Метод жизненного цикла, вызываемый после возникновения ошибки
   * Используется для логирования ошибок и вызова пользовательского обработчика
   * @param {Error} error - Объект ошибки
   * @param {Object} errorInfo - Информация о компоненте, в котором произошла ошибка
   */
  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    this.setState({ error, errorInfo })
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render() {
    const { hasError } = this.state
    const { fallback, children } = this.props
    if (hasError) {
      if (fallback) {
        return fallback
      }

      return <ErrorPage />
    }
    return children
  }
}

export default ErrorBoundary
