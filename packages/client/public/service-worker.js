/// <reference lib="webworker" />

// Версия кеша (увеличивать при изменениях)
const CACHE_NAME = '404team-cache-v2'
// Список файлов для кеширования (добавлять новые при необходимости)
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/vite.svg',
  '/img/background.jpg',
  '/img/logo.png',
  '/images/error-pages/404-error.jpg',
  '/images/error-pages/500-error.jpg',
  '/auth-bg.jpg',
  '/default-avatar.png',
  '/form-bg.png',
  '/game-bg.png',
  '/game-wolf-center.png',
  '/game-wolf-moving.png',
]

// Установка воркера и кеширование файлов
this.addEventListener('install', event => {
  /** waitUntil - сервис-воркер не завершит установку, пока не закеширует все файлы */
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(PRECACHE_URLS)
      })
      .catch(error => {
        throw error
      })
  )
  /** skipWaiting() — сразу активирует новый воркер, не дожидаясь закрытия старых вкладок. */
  this.skipWaiting()
})

// Активация воркера и удаление старых кешей
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    })
  )
  this.clients.claim()
})

// Перехват fetch-запросов
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Если ответ корректный — кладём в кеш
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache)
          })
        }
        return response
      })
      .catch(() => {
        // Если сеть недоступна — пробуем из кеша
        return caches.match(event.request)
      })
  )
})

// navigator.serviceWorker.ready.then(reg => reg.sync.register('sync-messages')) - пример использования на клиенте

// Background Sync: обработка фоновой синхронизации при временном отсутствии интернета
this.addEventListener('sync', event => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(sendQueuedMessagesToServer())
  }
})

// --- IndexedDB helpers для service worker. Полное описание работы в src/utils/idb-messages.ts ---

const DB_NAME = 'offline-messages-db'
const STORE_NAME = 'messages'
const DB_VERSION = 1

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function getAllQueuedMessages() {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  return new Promise((resolve, reject) => {
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function clearQueuedMessages() {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  store.clear()
  await new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(undefined)
    tx.onerror = () => reject(tx.error)
  })
}

// --- Функция отправки сообщений на сервер ---
async function sendQueuedMessagesToServer() {
  const messages = await getAllQueuedMessages()
  for (const msg of messages) {
    try {
      await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify(msg),
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (e) {
      // Если не удалось — оставляем в очереди
      return
    }
  }
  await clearQueuedMessages()
}
