import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import ErrorBoundary from './pages/error-pages/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        // Можно добавить обработку обновлений воркера
        console.log('Service Worker зарегистрирован:', registration)
      })
      .catch(error => {
        console.error('Ошибка регистрации Service Worker:', error)
      })
  })
}
