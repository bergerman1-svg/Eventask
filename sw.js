/* Eventask — service worker
   - Network-first passthrough (so changes deploy instantly to all devices)
   - Bumps VERSION on each release; old SW is replaced and clients reload automatically
*/
const VERSION = 'eventask-sw-v72-2026-05-26-desktop-readability-polish';

self.addEventListener('install', (event) => {
  // Activate immediately on first install (don't wait for old SW to finish)
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
      // Notify all open clients that a new version is active so they can reload
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(c => c.postMessage({ type: 'sw-updated', version: VERSION }));
    })()
  );
});

self.addEventListener('fetch', (event) => {
  // Network-first passthrough. The HTML is fetched fresh from the network so updates land instantly.
  // We MUST attach a fetch handler for Chrome to consider the app installable.
  const req = event.request;
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req, { cache: 'no-store' }).catch(() =>
        caches.match('./index.html').then(r => r || new Response('', { status: 503 }))
      )
    );
    return;
  }
  // Other resources — just pass through
  event.respondWith(fetch(req).catch(() => new Response('', { status: 503 })));
});
