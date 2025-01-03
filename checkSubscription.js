document.addEventListener("DOMContentLoaded", async () => {
  const allowButton = document.getElementById("allowButton");

  // Function to check subscription status
  async function checkSubscriptionStatus() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.error("Push notifications are not supported in this browser.");
      return false;
    }

    try {
      // Ensure the service worker is ready
      const sw = await navigator.serviceWorker.ready;
      // Check if the user is subscribed
      const subscription = await sw.pushManager.getSubscription();
      return subscription !== null; // Returns true if subscribed
    } catch (error) {
      console.error("Error checking subscription status:", error);
      return false;
    }
  }

  // Main logic
  const isSubscribed = await checkSubscriptionStatus();
  if (isSubscribed) {
    // Hide the "Allow Notifications" button if already subscribed
    if (allowButton) {
      allowButton.style.display = "none";
      console.log("User is already subscribed to notifications.");
    }
  } else {
    // Show the button if not subscribed
    if (allowButton) {
      allowButton.style.display = "block";
    }
  }
});
