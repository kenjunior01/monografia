const CACHE_NAME = 'monografiaplus-v1'
const urlsToCache = [
  '/',
  '/login',
  '/dashboard',
  '/novo-pedido',
  '/manifest.json',
  '/placeholder-logo.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})

// Notificações push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova atualização disponível!',
    icon: '/placeholder-logo.png',
    badge: '/placeholder-logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalhes',
        icon: '/placeholder-logo.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/placeholder-logo.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('MonografiaPlus', options)
  )
})
