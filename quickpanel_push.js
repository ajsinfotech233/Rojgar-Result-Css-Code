let website_id = 131;
let website_pixel_key = 'RaPxPWgbwHnqz5Wa';
importScripts("https://www.quickpanel.in/pixel_service_worker.js");
self.addEventListener('push', function(event) {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
    data: data.url,
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
});
