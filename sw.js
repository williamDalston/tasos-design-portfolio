// BEPO Service Worker - Offline Support & Performance
const CACHE_NAME = 'bepo-v1.0.0';
const STATIC_CACHE = 'bepo-static-v1.0.0';
const DYNAMIC_CACHE = 'bepo-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/assets/taso1.jpg',
    '/assets/headshot.png',
    '/assets/work1.JPG',
    '/assets/work2.JPG',
    '/assets/work3.JPG',
    '/assets/work4.JPG',
    '/assets/work5.JPG',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('BEPO Service Worker: Installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('BEPO Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('BEPO Service Worker: Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('BEPO Service Worker: Error caching static assets', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('BEPO Service Worker: Activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('BEPO Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('BEPO Service Worker: Activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip analytics and external API calls
    if (url.hostname.includes('google-analytics.com') || 
        url.hostname.includes('googletagmanager.com') ||
        url.hostname.includes('facebook.com') ||
        url.hostname.includes('instagram.com')) {
        return;
    }

    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                // Return cached version if available
                if (cachedResponse) {
                    console.log('BEPO Service Worker: Serving from cache', request.url);
                    return cachedResponse;
                }

                // Otherwise fetch from network
                return fetch(request)
                    .then(response => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response for caching
                        const responseToCache = response.clone();

                        // Cache dynamic content
                        caches.open(DYNAMIC_CACHE)
                            .then(cache => {
                                cache.put(request, responseToCache);
                            });

                        return response;
                    })
                    .catch(error => {
                        console.error('BEPO Service Worker: Fetch failed', error);
                        
                        // Return offline page for navigation requests
                        if (request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                        
                        // Return a fallback for other requests
                        return new Response('BEPO is offline. Please check your connection.', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('BEPO Service Worker: Background sync triggered');
        event.waitUntil(doBackgroundSync());
    }
});

// Push notifications for new content
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body || 'New content available on BEPO',
            icon: '/assets/icon-192.png',
            badge: '/assets/badge-72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey || 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Explore Now',
                    icon: '/assets/checkmark.png'
                },
                {
                    action: 'close',
                    title: 'Close',
                    icon: '/assets/xmark.png'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title || 'BEPO Update', options)
        );
    }
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Background sync function
async function doBackgroundSync() {
    try {
        // Sync any pending form submissions or analytics
        console.log('BEPO Service Worker: Performing background sync');
        
        // Here you would sync any pending data
        // For example, sending queued analytics events
        
        return Promise.resolve();
    } catch (error) {
        console.error('BEPO Service Worker: Background sync failed', error);
        return Promise.reject(error);
    }
}

// Performance monitoring
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'PERFORMANCE_METRIC') {
        // Log performance metrics
        console.log('BEPO Service Worker: Performance metric received', event.data.metric);
        
        // You could send this to your analytics service
        // sendToAnalytics(event.data.metric);
    }
});

console.log('BEPO Service Worker: Loaded successfully');

