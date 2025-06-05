const CACHE_VERSION = 'v1.3.0';
const STATIC_CACHE_NAME = `recovery-office-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `recovery-office-dynamic-${CACHE_VERSION}`;
const FONT_CACHE_NAME = `recovery-office-fonts-${CACHE_VERSION}`;
const IMAGE_CACHE_NAME = `recovery-office-images-${CACHE_VERSION}`;
const API_CACHE_NAME = `recovery-office-api-${CACHE_VERSION}`;

// Critical resources to cache immediately (for eliminating render-blocking resources)
const CRITICAL_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico'
];

// Fonts to cache aggressively
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap',
  'https://fonts.gstatic.com/s/opensans/v40/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4iaVQUwaEQbjB_mQ.woff2'
];

// Install event - cache critical resources for performance
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(CRITICAL_ASSETS);
      }),
      caches.open(FONT_CACHE_NAME).then((cache) => {
        return cache.addAll(FONT_URLS.filter(url => url));
      })
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return !cacheName.includes(CACHE_VERSION);
            })
            .map((cacheName) => caches.delete(cacheName))
        );
      }),
      self.clients.claim()
    ])
  );
});

// Advanced fetch handling with different strategies
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Strategy 1: Fonts - Cache first (critical for performance)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(event.request, FONT_CACHE_NAME));
    return;
  }
  
  // Strategy 2: Images - Cache first with long expiry
  if (event.request.destination === 'image') {
    event.respondWith(cacheFirst(event.request, IMAGE_CACHE_NAME));
    return;
  }
  
  // Strategy 3: API calls - Network first with cache fallback
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/locales/')) {
    event.respondWith(networkFirst(event.request, API_CACHE_NAME));
    return;
  }
  
  // Strategy 4: Static assets - Cache first
  if (url.pathname.startsWith('/static/') || 
      event.request.destination === 'script' || 
      event.request.destination === 'style') {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE_NAME));
    return;
  }
  
  // Strategy 5: HTML pages - Network first with cache fallback
  if (event.request.destination === 'document') {
    event.respondWith(networkFirst(event.request, DYNAMIC_CACHE_NAME));
    return;
  }
  
  // Default strategy - Network with cache fallback
  event.respondWith(networkWithCacheFallback(event.request, DYNAMIC_CACHE_NAME));
});

// Cache first strategy - for static assets
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
    }).catch(() => {
      // Network failed, but we have cache
    });
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  return networkResponse;
}

// Network first strategy - for dynamic content
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network with cache fallback
async function networkWithCacheFallback(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
} 