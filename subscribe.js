document.getElementById('allowButton').addEventListener('click', () => {
  subscribeUser();
});

async function subscribeUser() {
  try {
    // Request notification permission from the user
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const sw = await navigator.serviceWorker.ready;
      const publicKey = 'YOUR_PUBLIC_VAPID_KEY'; // Replace with your own VAPID key
      const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKey,
      });

      console.log('User is subscribed:', subscription);
      // You should send the subscription object to your server for storing

      // After successful subscription, hide the "Allow Notifications" button
      document.getElementById('allowButton').style.display = 'none';
      alert('Thank you for subscribing to notifications!');
    } else {
      console.log('Notification permission denied.');
    }
  } catch (error) {
    console.error('Error during subscription:', error);
  }
}
