//Creating a static cache name
const staticCache = 'restaurant-review-app-cache-v1';
let cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/data/restaurants.json',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/css/styles.css',
    '/img/1.jpg',
    '/img/10.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
]
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCache)
    .then(cache => {
      console.log('Opening Cache');
      return cache.addAll(cacheFiles);
    })
    .catch( err => {
      console.log(`The cache opening seems to have failed: ${err}`);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(response => {
        if (response.status === 404) return 'Error 404';
        return response;
      });
    })
    .catch( err => {
      console.log(`There was an unexpected error : ${err}`)
    })
  );
});
