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
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS)
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
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})

// TODO: Добавить обработку push, background sync, динамического кеширования и fallback-страниц
