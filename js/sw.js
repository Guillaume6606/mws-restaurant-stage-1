//Creating a static cache name
const staticCache = 'restaurant-review-app-cache-v1';
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCache)
    .then(cache => {
      console.log('Opening Cache');
      return cache.addAll([
        './',
        './index.html',
        './restaurant.html',
        './data/restaurants.json',
        './js/main.js',
        './js/restaurant_info.js',
        './js/dbhelper.js',
        './css/styles.css'
      ])
      .catch( err => {
        console.log(`The cache opening seems to have failed: ${err}`);
      });
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
