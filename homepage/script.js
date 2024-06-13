function updateTime() {
    const currentDate = new Date();
  
    // Get user's timezone offset in minutes
    const offsetMinutes = currentDate.getTimezoneOffset();
  
    // Adjust the date object based on the offset
    currentDate.setMinutes(currentDate.getMinutes() + offsetMinutes);
  
    // Get hours, minutes, and seconds with leading zeros
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  
    // Format the time for display
    const formattedTime = `${hours}:${minutes}:${seconds}`;
  
    // Update the text content with the formatted time
    document.getElementById("current-datetime").textContent = formattedTime;
  }
  
  // Call the updateTime function initially
  updateTime();
  
  // Set an interval to call updateTime every second (1000 milliseconds)
  setInterval(updateTime, 1000);
  
  const searchForm = document.getElementById("search-form");
  const searchBar = document.getElementById("search-bar");
  
  searchForm.addEventListener("submit", function(event) {
    // Prevent default form submission behavior
    event.preventDefault();
  
    const searchQuery = searchBar.value;
  
    // Redirect to Google search with the search query
    window.location.href = "https://www.google.com/search?q=" + searchQuery;
  });  