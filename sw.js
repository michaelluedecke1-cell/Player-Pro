const CACHE_NAME = 'music-player-cache-v1';
const ASSETS = [
  'player15.html',
  'manifest.json'
];

// 1. Dateien beim Installieren in den Cache laden
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. Alten Cache beim Aktivieren löschen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Ladeanfragen abfangen und aus dem Cache bedienen (Offline-Modus)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Wenn es im Cache ist, nutze es, andernfalls hole es aus dem Netzwerk
      return cachedResponse || fetch(event.request);
    })
  );
});


