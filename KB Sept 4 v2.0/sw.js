/**
 * SERVICE WORKER
 * ==================
 * UPDATED: The cache version has been incremented to v4 to force a full
 * refresh for all users. The list of URLs to cache has been updated to be
 * comprehensive, including all data shards and biller-specific note files.
 * This ensures that any data updates are correctly fetched and cached.
 *
 * This file caches the application's assets, enabling offline functionality
 * and significantly improving performance on repeat visits.
 */

// UPDATED: Cache name incremented to v4 to force asset refresh.
const CACHE_NAME = 'biller-hub-cache-v5';

// UPDATED: The list of URLs is now comprehensive.
const URLS_TO_CACHE = [
  // Core App Shell
  '/',
  'index.html',

  // Stylesheets
  'src/css/theme.css',
  'src/css/styles.css',
  'src/css/search.css',
  'src/css/components.css',
  'src/css/notes.css',
  
  // Core Libraries
  'src/js/lib/fuse.min.js',
  
  // Core Data & Logic
  'src/js/data/kb-articles.js',
  'src/js/data/locations.js',
  'src/js/core/utils.js',
  'src/js/core/db.js',
  'src/js/core/virtual-list.js',
  'src/js/core/app-core.js',
  'src/js/core/data-helpers.js',
  
  // Feature Logic
  'src/js/features/location-feature.js',
  'src/js/features/notes-feature.js',
  'src/js/features/app-features.js',
  
  // UI Logic
  'src/js/ui/ui-notes.js',
  'src/js/ui/ui-components-stable.js',
  'src/js/ui/ui-components-core.js',

  // Main Application Entry & Worker
  'src/js/main/app-main.js',
  'src/js/workers/search.worker.js',

  // Biller Data Shards
  'src/js/data/billers-a-c.js',
  'src/js/data/billers-d-f.js',
  
  // Biller-Specific Note Files
  'src/live/BGE.js',
  'src/live/CEMI.js',
  'src/live/CEB.js',
  'src/live/NSRC.js',
  'src/live/DNE.js',

  // External Assets (Icons)
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css'
];

/**
 * Installation Event:
 * Caches all specified application assets.
 */
self.addEventListener('install', (event) => {
  // Use skipWaiting to ensure the new service worker activates immediately.
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log(`Opened cache and caching assets for ${CACHE_NAME}`);
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
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all pages immediately
  );
});

/**
 * Fetch Event:
 * Intercepts network requests and serves assets from the cache first (cache-first strategy).
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});