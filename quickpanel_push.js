self.addEventListener('push', function(event) {
    let options = {
        body: event.data.text(),
        icon: 'images/icon.png', // You can customize this
        badge: 'images/badge.png', // Customize this too
        vibrate: [100, 50, 100],
        data: {
            url: event.data.url
        }
    };

    event.waitUntil(
        self.registration.showNotification('New Notification', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
