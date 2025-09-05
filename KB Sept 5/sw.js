/**
 * SERVICE WORKER
 * ==================
 * This file caches the application's assets, enabling offline functionality
 * and significantly improving performance on repeat visits.
 *
 * UPDATED: The cache version has been incremented to v8 to include the
 * new notes file for American Water (AWK).
 */

// Cache name is incremented to v8 to force a full refresh for all users.
const CACHE_NAME = 'biller-hub-cache-v8';

// The list of URLs is updated to include the new notes file.
const URLS_TO_CACHE = [
  // --- Core App Shell ---
  '/',
  'index.html',

  // --- Stylesheets ---
  'src/css/theme.css',
  'src/css/styles.css',
  'src/css/search.css',
  'src/css/components.css',
  'src/css/notes.css',
  
  // --- Core Libraries ---
  'src/js/lib/fuse.min.js',
  
  // --- Core Data & Logic ---
  'src/js/data/biller-data-all.js',
  'src/js/data/kb-articles.js',
  'src/js/data/locations.js',
  'src/js/core/utils.js',
  'src/js/core/db.js',
  'src/js/core/virtual-list.js',
  'src/js/core/app-core.js',
  'src/js/core/data-helpers.js',
  'src/js/core/anim.js',
  
  // --- UI Logic ---
  'src/js/ui/ui-core.js',
  'src/js/ui/ui-components.js',
  'src/js/ui/ui-features.js',
  'src/js/ui/ui-notes.js',
  
  // --- Feature Logic ---
  'src/js/features/location-feature.js',
  'src/js/features/notes-feature.js',
  'src/js/features/app-features.js',
  
  // --- Main Application & Worker ---
  'src/js/main/app-main.js',
  'src/js/workers/search.worker.js',

  // --- Biller-Specific Note Files ---
  'src/live/BGE.js',
  'src/live/CEMI.js',
  'src/live/NSRC.js',
  'src/live/DNE.js',
  'src/live/CEB.js',
  'src/live/DUQL.js',
  'src/live/PAC.js',
  'src/live/AWK.js', // New notes file added

  // --- External CDN Assets ---
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.1/gsap.min.js',
];

/**
 * Installation Event:
 * Caches all specified application assets.
 */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log(`[SW] Opened cache: ${CACHE_NAME}`);
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

/**
 * Activation Event:
 * Cleans up old caches from previous versions.
 */
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

/**
 * Fetch Event:
 * Intercepts network requests and serves assets from the cache first.
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});