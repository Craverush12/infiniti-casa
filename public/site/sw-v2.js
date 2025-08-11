// Namespaced Service Worker for Infiniti Casa (served from /site/sw-v2.js)
// Copy of main SW to avoid legacy rewrite issues on /sw.js

const CACHE_NAME = 'infiniti-casa-v2';
const STATIC_CACHE_NAME = 'infiniti-casa-static-v2';
const DYNAMIC_CACHE_NAME = 'infiniti-casa-dynamic-v2';

const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => cache.addAll(STATIC_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.map((n) => {
      if (n !== STATIC_CACHE_NAME && n !== DYNAMIC_CACHE_NAME) return caches.delete(n);
    })))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isStaticAsset(request)) {
    event.respondWith(cacheFirstForAssets(request));
    return;
  }

  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(networkFirst(request));
});

function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|avif|heic|heif|woff|woff2|ttf|eot)$/);
}

async function cacheFirstForAssets(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const res = await fetch(request);
  if (res.ok && !(res.headers.get('content-type') || '').includes('text/html')) {
    const c = await caches.open(DYNAMIC_CACHE_NAME);
    c.put(request, res.clone());
  }
  return res;
}

async function networkFirst(request) {
  try {
    const res = await fetch(request);
    if (res.ok) {
      const c = await caches.open(DYNAMIC_CACHE_NAME);
      c.put(request, res.clone());
    }
    return res;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/index.html');
    }
    return new Response('Offline', { status: 503 });
  }
}

self.addEventListener('sync', () => {});
self.addEventListener('push', () => {});

console.log('SW /site/sw-v2.js loaded');
