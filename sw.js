var cacheName = 'pwa-commits-v3';

var filesToCache = [
    './',
    './css/style.css',
    './images/books.png',
    './images/Home.svg',
    './images/ic_refresh_white_24px.svg',
    './images/profile.png',
    './images/push-off.png',
    './images/push-on.png',
    './js/app.js',
    './js/menu.js',
    './js/offline.js',
    './js/toast.js'
];

// Install Service Worker
self.addEventListener('install', function(event) {

    console.log('Service Worker: Installing....');

    event.waitUntil(

        // Open the Cache
        caches.open(cacheName).then(function(cache) {
            console.log('Service Worker: Caching App Shell at the moment......');

            // Add Files to the Cache
            return cache.addAll(filesToCache);
        })
    );
});


// Fired when the Service Worker starts up
self.addEventListener('activate', function(event) {

    console.log('Service Worker: Activating....');

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(key) {
                if( key !== cacheName) {
                    console.log('Service Worker: Removing Old Cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});


self.addEventListener('fetch', function(event) {

    console.log('Service Worker: Fetch', event.request.url);

    console.log("Url", event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});


// triggered everytime, when a push notification is received.
self.addEventListener('push', function(event) {

  console.info('Event: Push');

  var title = 'New commit on Github Repo: RIL';

  var body = {
    'body': 'Click to see the latest commit',
    'tag': 'pwa',
    'icon': './images/48x48.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, body)
  );
});


self.addEventListener('notificationclick', function(event) {

  var url = './latest.html';

  event.notification.close(); //Close the notification

  // Open the app and navigate to latest.html after clicking the notification
  event.waitUntil(
    clients.openWindow(url)
  );

});

