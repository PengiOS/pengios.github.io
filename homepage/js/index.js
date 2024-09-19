document.addEventListener('DOMContentLoaded', () => {  // ensure all the DOM content is loaded first!
  const openMeteoURL = "https://api.open-meteo.com/v1/forecast?latitude=-33.8678&longitude=151.2073&current=temperature_2m,apparent_temperature,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,precipitation_probability_max&timezone=auto&forecast_days=3"
  const greeting = document.getElementById('greeting');
  const clock = document.getElementById('clock');
  const searchBar = document.getElementById('search-bar');
  const searchEngine = document.getElementById('search-engine');
  const searchButton = document.getElementById('search-button');
  const weatherSummary = document.getElementById('weather-summary')
  const weatherDiv = document.getElementById('weather')
  var weatherDetailsShown = false;
  
  var weatherDetails1;
  var weatherDetails2;
  var weatherDetails3;
  var weatherDetails4;

  function updateTime() {
    const date = new Date();
    const hours = date.getHours();
    var greetingText;
      
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
    } else if (hours >= 22) {
      greetingText = 'Goodnight';
    } else {
      greetingText = 'Hello'
    }
    greeting.textContent = greetingText;
  }

  async function getWeather() {
    response = await fetch(openMeteoURL)
    try {
      if (!response.ok) {
        throw new Error('Network response error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather from API:', error);
      throw error;
    }
  }

  async function updateWeather() {
    try {
      var weatherData = await getWeather();
      console.log(weatherData);
      weatherSummary.textContent = "sunny or sht";
      if (weatherDetailsShown) {
        weatherDetails1.textContent = "Feels like hell"
        weatherDetails2.textContent = "150% precipitation"
        weatherDetails3.textContent = "Min: brrr, Max: ouch"
        weatherDetails4.textContent = "Sunrise: idk, Sunset: idk (12:01 of daylight)"
        // these are placeholders for obvious reasons
      }
    } catch (error) {
      console.error('Error updating weather:', error);
    }
  }

  function toggleWeatherDetails() {
    if (!weatherDetailsShown) {
      weatherDetailsShown = true
      weatherDetails1 = document.createElement("h3");
      weatherDetails2 = document.createElement("h3");
      weatherDetails3 = document.createElement("h3");
      weatherDetails4 = document.createElement("h3");
      weatherDiv.appendChild(weatherDetails1, weatherDetails2, weatherDetails3, weatherDetails4)
    } else {
      weatherDetailsShown = false
      weatherDiv.removeChild(weatherDetails1, weatherDetails2, weatherDetails3, weatherDetails4)
    }
    updateWeather();
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
          // Just in case!
          alert('Please select a search engine.');
      }
  
      if (searchUrl) {
        window.location.href = searchUrl;
      }
    }
  }

  weatherSummary.onclick = toggleWeatherDetails();
  
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

  updateTime();
  updateWeather();

  // Set detail update intervals
  setInterval(updateTime, 100);  // 0.1 sec
  setInterval(updateWeather, 60000);  // 1 min
});
