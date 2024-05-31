const CACHE_NAME = 'calculadora-descuentos-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './assets/css/styles.css',
    './assets/img/background.jpg',
    './manifest.json',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png',
    './assets/img/Logo.png',
    './assets/ttf/Coffee Fills.ttf'
    
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});