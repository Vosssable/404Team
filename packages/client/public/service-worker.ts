/// <reference lib="webworker" />

// Версия кеша (увеличивать при изменениях)
const CACHE_NAME = '404team-cache-v1'
// Список файлов для кеширования (добавлять новые при необходимости)
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/vite.svg',
  '/src/assets/LiderBg.jpg',
  '/public/img/background.jpg',
  '/public/img/logo.png',
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
this.addEventListener('activate', event => {
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
this.addEventListener('fetch', event => {
  event.respondWith(
    // Пытаемся найти ответ на такой запрос в кеше
    caches.match(event.request).then(response => {
      // Если ответ найден, выдаём его
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()
      // В противном случае делаем запрос на сервер
      return (
        fetch(fetchRequest)
          // Можно задавать дополнительные параметры запроса, если ответ вернулся некорректный.
          .then(response => {
            // Если что-то пошло не так, выдаём в основной поток результат, но не кладём его в кеш
            if (
              !response ||
              response.status !== 200 ||
              response.type !== 'basic'
            ) {
              return response
            }

            const responseToCache = response.clone()
            // Получаем доступ к кешу по CACHE_NAME
            caches.open(CACHE_NAME).then(cache => {
              // Записываем в кеш ответ, используя в качестве ключа запрос
              cache.put(event.request, responseToCache)
            })
            // Отдаём в основной поток ответ
            return response
          })
      )
    })
  )
})

// navigator.serviceWorker.ready.then(reg => reg.sync.register('sync-messages'))

// Background Sync: обработка фоновой синхронизации при временном отсутствии интернета
this.addEventListener('sync', event => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(sendQueuedMessagesToServer())
  }
})

// TODO: Добавить background sync, динамического кеширования и fallback-страниц

// --- IndexedDB helpers для service worker. Полное описание работы в src/utils/idb-messages.ts ---
type IMessageQueueItem = {
  id?: number
  content: string
  createdAt: number
  [key: string]: unknown
}

const DB_NAME = 'offline-messages-db'
const STORE_NAME = 'messages'
const DB_VERSION = 1

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function getAllQueuedMessages(): Promise<IMessageQueueItem[]> {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  return new Promise((resolve, reject) => {
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result as IMessageQueueItem[])
    request.onerror = () => reject(request.error)
  })
}

async function clearQueuedMessages(): Promise<void> {
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
