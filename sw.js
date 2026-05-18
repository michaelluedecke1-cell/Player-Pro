const CACHE_NAME = 'music-player-cache-v1';
const ASSETS = [
  'index.html', // Hier angepasst
  'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});
// ... (Rest des Codes bleibt gleich)
