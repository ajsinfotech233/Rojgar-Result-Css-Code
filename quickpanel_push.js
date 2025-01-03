self.addEventListener('push', function(event) {
    let options = {
        body: event.data.text(),
        icon: 'images/icon.png', // Customize the icon
        badge: 'images/badge.png', // Customize the badge
        vibrate: [100, 50, 100],
        data: {
            url: event.data.url // Data to open the correct URL
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
