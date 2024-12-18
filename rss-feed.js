const feedUrl = "https://www.rojgarresult.app/feeds/posts/default"; // Replace with your RSS feed URL
let feedItems = [];
let currentIndex = 0;

// Fetch and parse RSS feed
async function fetchRSSFeed(url) {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "text/xml");
  const items = xmlDoc.querySelectorAll("item");
  feedItems = Array.from(items).map(item => ({
    title: item.querySelector("title").textContent,
    link: item.querySelector("link").textContent,
    description: item.querySelector("description").textContent,
  }));
  displayItem();
}

// Display the current feed item
function displayItem() {
  const contentDiv = document.getElementById("content");
  if (feedItems.length === 0) {
    contentDiv.innerHTML = "No items found in the feed.";
    return;
  }
  const item = feedItems[currentIndex];
  contentDiv.innerHTML = `
    <h2>${item.title}</h2>
    <p>${item.description}</p>
    <a href="${item.link}" target="_blank">Read more</a>
  `;
}

// Navigation handlers
document.getElementById("prev").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    displayItem();
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (currentIndex < feedItems.length - 1) {
    currentIndex++;
    displayItem();
  }
});

// Initialize feed
fetchRSSFeed(feedUrl);
