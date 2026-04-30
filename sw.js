const CACHE_NAME = 'cami-detalles-v1';
const ASSETS = [
  './',
  './index_12.html',
  './style_12.css',
  './scrip_12.js',
  './manifest_11.json'
];

// Instalación: Guarda los archivos esenciales en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Estrategia: Cargar de la red y si falla, usar la caché
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});