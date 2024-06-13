const greeting = document.getElementById('greeting');
const clock = document.getElementById('clock');
const searchBar = document.getElementById('search-bar');
const searchEngine = document.getElementById('search-engine');

function updateTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  clock.textContent = `${hours}:${minutes}`;

  let greetingText;
  if (hours >= 3 && hours < 12) {
    greetingText = 'Good morning';
  } else if (hours >= 12 && hours < 18) {
    greetingText = 'Good afternoon';
  } else {
    greetingText = 'Good night';
  }
  greeting.textContent = greetingText;
}

function handleSearch() {
  const searchTerm = searchBar.value;
  const selectedEngine = searchEngine.value;
  let searchUrl;

  if (searchTerm) {
    switch (selectedEngine) {
      case 'google':
        searchUrl = `https://www.google.com/search?q=${searchTerm}`;
        break;
      case 'bing':
        searchUrl = `https://www.bing.com/search?q=${searchTerm}`;
        break;
      case 'duckduckgo':
        searchUrl = `https://duckduckgo.com/?q=${searchTerm}`;
        break;
      case 'yahoo':
        searchUrl = `https://search.yahoo.com/search?q=${searchTerm}`;
        break;
      default:
        // Handle case where no engine is selected (optional)
        alert('Please select a search engine.');
    }

    if (searchUrl) {
      window.location.href = searchUrl;
    }
  }
}

searchEngine.addEventListener('change', () => {
  // Update UI based on selected engine (optional)
});

searchBar.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

updateTime();
setInterval(updateTime, 1000);