self.addEventListener('push', event => {
    const data = event.data.json();

    const title = data.title || "Default Title";
    const options = {
        body: data.message || "Default message",
        icon: data.icon || "/icon.png",
        badge: data.badge || "/badge.png",
        data: {
            url: data.url || "https://www.rojgarresult.app"
        }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url || 'https://www.rojgarresult.app')
    );
});
