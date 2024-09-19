document.addEventListener('DOMContentLoaded', () => {  // ensure all the DOM content is loaded first!
  const openMeteoURL = "https://api.open-meteo.com/v1/forecast?latitude=-33.8678&longitude=151.2073&current=temperature_2m,apparent_temperature,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,precipitation_probability_max&timezone=auto&forecast_days=3"
  const greeting = document.getElementById('greeting');
  const clock = document.getElementById('clock');
  const searchBar = document.getElementById('search-bar');
  const searchEngine = document.getElementById('search-engine');
  const searchHint = document.getElementById('search-hint');
  const searchButton = document.getElementById('search-button');
  const weatherSummary = document.getElementById('weather-summary')
  const weatherDiv = document.getElementById('weather')
  var weatherDetailsShown = false;
  var weatherData;
  
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
      weatherData = await getWeather();
      console.log(weatherData);
      weatherSummary.textContent = `${weatherData.current.temperature_2m}${weatherData.current_units.temperature_2m}`;  // TODO: location and relevant icon before temp
      if (weatherDetailsShown) {
        weatherDetails1.textContent = `Feels like ${weatherData.current.apparent_temperature}${weatherData.current_units.apparent_temperature}`;
        weatherDetails2.textContent = `${weatherData.daily.precipitation_probability_max[0]}${weatherData.daily_units.precipitation_probability_max} precipitation`;
        weatherDetails3.textContent = `Min: ${weatherData.daily.temperature_2m_max[0]}${weatherData.daily_units.temperature_2m_max}, Max: ${weatherData.daily.temperature_2m_min[0]}${weatherData.daily_units.temperature_2m_min}`;
        let sunriseTime = weatherData.daily.sunrise.substring(str.indexOf("T"));
        let sunsetTime = weatherData.daily.sunset.substring(str.indexOf("T"));
        weatherDetails4.textContent = `Sunrise: ${sunriseTime}, Sunset: ${sunsetTime} (TODO of daylight)`;
      }
    } catch (error) {
      console.error('Error updating weather:', error);
    }
  }

  function toggleWeatherDetails() {
    console.log("Weather details toggled")
    if (!weatherDetailsShown) {
      weatherDetailsShown = true
      weatherDetails1 = document.createElement("h3");
      weatherDetails2 = document.createElement("h3");
      weatherDetails3 = document.createElement("h3");
      weatherDetails4 = document.createElement("h3");
      weatherDiv.appendChild(weatherDetails1)
      weatherDiv.appendChild(weatherDetails2)
      weatherDiv.appendChild(weatherDetails3)
      weatherDiv.appendChild(weatherDetails4)
    } else {
      weatherDetailsShown = false
      weatherDiv.removeChild(weatherDetails1)
      weatherDiv.removeChild(weatherDetails2)
      weatherDiv.removeChild(weatherDetails3)
      weatherDiv.removeChild(weatherDetails4)
    }
    updateWeather()
  }
  
  function handleSearch() {
    const searchTerm = searchBar.value;
    const selectedEngine = searchEngine.value;
    let searchUrl;
  
    if (searchTerm) {
      switch (selectedEngine) {
        case 'google':
          searchUrl = `https://www.google.com/search?q=${searchTerm}`;
          searchHint.setAttribute(src, ".assets/google.png");
          break;
        case 'bing':
          searchUrl = `https://www.bing.com/search?q=${searchTerm}`;
          searchHint.setAttribute(src, ".assets/bing.png");
          break;
        case 'duckduckgo':
          searchUrl = `https://duckduckgo.com/?q=${searchTerm}`;
          searchHint.setAttribute(src, ".assets/duckduckgo.png");
          break;
        case 'yahoo':
          searchUrl = `https://search.yahoo.com/search?q=${searchTerm}`;
          searchHint.setAttribute(src, ".assets/yahoo.png");
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

  function switchHint() {
    switch (searchEngine.value) {
      case 'google':
        searchHint.setAttribute("src", "./assets/google.png");
        break;
      case 'bing':
        searchHint.setAttribute("src", "./assets/bing.png");
        break;
      case 'duckduckgo':
        searchHint.setAttribute("src", "./assets/duckduckgo.png");
        break;
      case 'yahoo':
        searchHint.setAttribute("src", "./assets/yahoo.png");
        break;
    }
  }
    
  searchEngine.addEventListener('change', switchHint);

  weatherSummary.addEventListener('click', toggleWeatherDetails);
  
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
  switchHint();

  // Set detail update intervals
  setInterval(updateTime, 100);  // 0.1 sec
  setInterval(updateWeather, 60000);  // 1 min
});
