document.addEventListener('DOMContentLoaded', () => {  // ensure all the DOM content is loaded first!
  const greeting = document.getElementById('greeting');
  const clock = document.getElementById('clock');
  const searchBar = document.getElementById('search-bar');
  const searchEngine = document.getElementById('search-engine');
  const searchButton = document.getElementById('search-button');
  
  function updateTime() {
    const date = new Date();
    const hours = date.getHours();
      
    if (hours >= 0 && hours < 3) {
      greetingText = 'Sleep well';
    } else if (hours >= 3 && hours < 7) {
      greetingText = 'Rise and shine';
    } else if (hours >= 7 && hours < 10) {
      greetingText = 'Good morning';
    } else if (hours >= 10 && hours < 14) {
      greetingText = 'Good day';
    } else if (hours >= 14 && hours < 18) {
      greetingText = 'Good afternoon';
    } else if (hours >= 18 && hours < 22) {
      greetingText = 'Good evening';
    } else if (hours >= 23) {
      greetingText = 'Goodnight';
    } else {
      greetingText = 'Hello'
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

  searchButton.addEventListener('click', handleSearch);

  // Update time every tenth of a second
  updateTime();
  setInterval(updateTime, 100);
});
