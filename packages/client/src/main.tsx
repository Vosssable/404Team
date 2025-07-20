import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import ErrorBoundary from './pages/error-pages/ErrorBoundary'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
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
