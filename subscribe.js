document.getElementById('allowButton').addEventListener('click', () => {
  subscribeUser();
});

async function subscribeUser() {
  try {
    // Request notification permission from the user
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const sw = await navigator.serviceWorker.ready;
      const publicKey = 'BBsh736IWv_0pqDl2foq6-Xc6mq3zY91H6fjkuDrbrm_hITCpfBXtdpj88LjiDAAfT-pi7z0niZ5Qk8wE2ovF3g'; // Replace with your own VAPID key
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
