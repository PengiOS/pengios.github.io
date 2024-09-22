document.addEventListener('DOMContentLoaded', () => {  // ensure all the DOM content is loaded first!
  const weatherBaseURL = "https://api.open-meteo.com/v1/forecast?latitude=-33.8678&longitude=151.2073&current=weather_code,temperature_2m,apparent_temperature,is_day,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,precipitation_probability_max&timezone=auto&forecast_days=1"
  const farenheit = false;
  const windSpeed = "km/h"
  const inches = false
  var openMeteoURL;
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];  // unfortunately must start on Sunday
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  if (farenheit) {
    openMeteoURL = weatherBaseURL + "&temperature_unit=fahrenheit";
  } else {
    openMeteoURL = weatherBaseURL;
  }
  if (windSpeed == "m/s") {
    openMeteoURL += "&wind_speed_unit=ms";
  } else if (windSpeed == "mph") {
    openMeteoURL += "&wind_speed_unit=mph";
  } else if (windSpeed == "knots") {
    openMeteoURL += "&wind_speed_unit=kn";
  }
  if (inches) {
    openMeteoURL += "&precipitation_unit=inch";
  }
  const greeting = document.getElementById('greeting');
  const clock = document.getElementById('clock');
  const dateHeader = document.getElementById('date');
  const searchBar = document.getElementById('search-bar');
  const searchEngine = document.getElementById('search-engine');
  const searchHint = document.getElementById('search-hint');
  const searchButton = document.getElementById('search-button');
  const weatherSummary = document.getElementById('weather-summary')
  const weatherIcon = document.getElementById('weather-icon')
  const weatherDiv = document.getElementById('weather')
  var weatherDetailsShown = false;
  var weatherData;
  
  var weatherDetails1;
  var weatherDetails2;
  var weatherDetails3;
  var weatherDetails4;

  const weatherCodes = {
    0: "sun",          // Clear sky // or "moon" at night
    1: "sun",          // Mainly clear // or "moon" at night
    2: "cloud",        // Partly cloudy
    3: "cloud",        // Overcast
    45: "cloud",   // Fog
    48: "cloud",   // Depositing rime fog
    51: "cloud-drizzle", // Light drizzle
    53: "cloud-drizzle", // Moderate drizzle
    55: "cloud-drizzle", // Dense drizzle
    56: "cloud-drizzle", // Light freezing drizzle
    57: "cloud-drizzle", // Dense freezing drizzle
    61: "cloud-rain",  // Slight rain
    63: "cloud-rain",  // Moderate rain
    65: "cloud-rain",  // Heavy rain
    66: "cloud-drizzle", // Light freezing rain
    67: "cloud-drizzle", // Heavy freezing rain
    71: "cloud-snow",  // Slight snowfall
    73: "cloud-snow",  // Moderate snowfall
    75: "cloud-snow",  // Heavy snowfall
    77: "cloud-snow",  // Snow grains
    80: "cloud-rain",  // Slight rain showers
    81: "cloud-rain",  // Moderate rain showers
    82: "cloud-rain",  // Violent rain showers
    85: "cloud-snow",  // Slight snow showers
    86: "cloud-snow",  // Heavy snow showers
    95: "cloud-lightning", // Thunderstorm (slight)
    96: "cloud-lightning", // Thunderstorm with slight hail
    99: "cloud-lightning", // Thunderstorm with heavy hail
  };


  function updateTime() {
    let date = new Date();
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    clock.textContent = `${hours}:${minutes}:${seconds}`;

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

  function updateDate() {
    let date = new Date();
    weekDay = weekDays[date.getDay()];
    month = months[date.getMonth()];
    dateHeader.textContent = `${weekDay} ${date.getDate()} ${month}`;
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
      weatherSummary.textContent = `${weatherData.current.temperature_2m}${weatherData.current_units.temperature_2m}`;
      let weatherCode = weatherData.current.weather_code;
      let icon = weatherCodes[weatherCode];
      if ((weatherCode === 0 || weatherCode === 1) && (weatherData.current.id_day = 0)) {
        icon = 'moon';
      }

      weatherIcon.setAttribute("src", `/homepage/assets/feather-weather/${icon}.svg`);
      if (weatherDetailsShown) {
        let sunriseString = weatherData.daily.sunrise[0];
        let sunsetString = weatherData.daily.sunset[0];
        let sunriseTime = sunriseString.substring(sunriseString.indexOf("T") + 1);
        let sunsetTime = sunsetString.substring(sunsetString.indexOf("T") + 1);
        let daylightSeconds = weatherData.daily.daylight_duration[0]
        let h = Math.floor(daylightSeconds / 3600);
        let m = Math.round(daylightSeconds % 3600 / 60);
        let daylightDisplay = `${h}hr ${m}min`

        weatherDetails1.textContent = `Feels like ${weatherData.current.apparent_temperature}${weatherData.current_units.apparent_temperature}`;
        weatherDetails2.textContent = `${weatherData.daily.precipitation_probability_max[0]}${weatherData.daily_units.precipitation_probability_max} precipitation`;
        weatherDetails3.textContent = `Min: ${weatherData.daily.temperature_2m_max[0]}${weatherData.daily_units.temperature_2m_max}, Max: ${weatherData.daily.temperature_2m_min[0]}${weatherData.daily_units.temperature_2m_min}`;
        weatherDetails4.textContent = `Sunrise: ${sunriseTime}, Sunset: ${sunsetTime} (${daylightDisplay} of daylight)`;
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

  function switchHint() {
    switch (searchEngine.value) {
      case 'google':
        searchHint.setAttribute("src", "/homepage/assets/google.png");
        break;
      case 'bing':
        searchHint.setAttribute("src", "/homepage/assets/bing.png");
        break;
      case 'duckduckgo':
        searchHint.setAttribute("src", "/homepage/assets/duckduckgo.png");
        break;
      case 'yahoo':
        searchHint.setAttribute("src", "/homepage/assets/yahoo.png");
        break;
    }
  }
    
  searchEngine.addEventListener('change', switchHint);

  weatherSummary.addEventListener('click', toggleWeatherDetails);
  
  searchBar.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
  
  searchButton.addEventListener('click', handleSearch);

  updateTime();
  updateDate();
  updateWeather();
  switchHint();

  // Set detail update intervals
  setInterval(updateTime, 100);  // 0.1 sec
  setInterval(updateWeather, 60000);  // 1 min
  setInterval(updateDate, 3000);  // 3 sec
});
