// ---
// Offline очередь сообщений для PWA
//
// Этот модуль реализует простую очередь сообщений в IndexedDB для поддержки offline-режима и background sync.
// Если пользователь отправляет сообщение без интернета, оно сохраняется в локальную очередь.
// Когда соединение восстанавливается (или срабатывает background sync), сервис-воркер получает все сообщения из очереди и отправляет их на сервер.
// После успешной отправки очередь очищается.
//
// Основные функции:
// - addMessageToQueue: добавить сообщение в очередь (вызывается на клиенте при ошибке сети)
// - getAllQueuedMessages: получить все сообщения из очереди (вызывается сервис-воркером при sync)
// - clearQueuedMessages: очистить очередь после успешной отправки
//
// Использование:
// 1. На клиенте: при ошибке отправки сообщения — вызвать addMessageToQueue и зарегистрировать sync.
// 2. В сервис-воркере: при событии 'sync' — получить все сообщения, отправить их на сервер и очистить очередь.
// ---

// Тип сообщения, которое кладём в очередь offline-сообщений
// Можно расширять под нужды приложения
// id — автогенерируется IndexedDB, content — основное содержимое, createdAt — время создания

// Интерфейс сообщения для очереди
type IMessageQueueItem = {
  id?: number
  content: string
  createdAt: number
  [key: string]: unknown
}

// Имя базы данных, имя хранилища и версия
// Можно использовать для других offline-очередей

const DB_NAME = 'offline-messages-db'
const STORE_NAME = 'messages'
const DB_VERSION = 1

// Открывает (или создаёт) IndexedDB с нужным store
// Используется во всех функциях ниже

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

// Добавляет сообщение в очередь (offline)
// Если нет id, он будет сгенерирован автоматически

export async function addMessageToQueue(
  message: Omit<IMessageQueueItem, 'id'>
): Promise<void> {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  store.add({ ...message, createdAt: Date.now() })
  await new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(undefined)
    tx.onerror = () => reject(tx.error)
  })
}

// Получает все сообщения из очереди
// Используется для отправки накопленных сообщений на сервер

export async function getAllQueuedMessages(): Promise<IMessageQueueItem[]> {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  return new Promise((resolve, reject) => {
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result as IMessageQueueItem[])
    request.onerror = () => reject(request.error)
  })
}

// Очищает очередь сообщений после успешной отправки

export async function clearQueuedMessages(): Promise<void> {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, 'readwrite')
  const store = tx.objectStore(STORE_NAME)
  store.clear()
  await new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve(undefined)
    tx.onerror = () => reject(tx.error)
  })
}
