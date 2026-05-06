/* Eventask — minimal service worker
   Goal: enable Chrome's "Install app" prompt on Android (PWA installability requires
   a service worker that responds to fetch).
   This is a network-first passthrough — no offline caching yet (we'll add that later).
*/
const VERSION = 'eventask-sw-v1';

self.addEventListener('install', (event) => {
  // Activate immediately on first install
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Take control of any open clients right away
      await self.clients.claim();
      // Clean up any stale caches from older versions
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    })()
  );
});

self.addEventListener('fetch', (event) => {
  // Network-first passthrough. We just let the browser handle it normally,
  // but we MUST attach a fetch handler for Chrome to consider the app installable.
  // For navigation requests, fall back to index.html on network failure (graceful refresh).
  const req = event.request;
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('./index.html').then(r => r || new Response('', { status: 503 })))
    );
    return;
  }
  // Pass through everything else
  event.respondWith(fetch(req).catch(() => new Response('', { status: 503 })));
});
