function updateTime() {
  const currentDate = new Date();
  const offsetMinutes = currentDate.getTimezoneOffset();
  currentDate.setMinutes(currentDate.getMinutes() + offsetMinutes);
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  document.getElementById("current-datetime").textContent = formattedTime;
}

updateTime();
setInterval(updateTime, 1000);

const searchForm = document.getElementById("search-form");
const searchBar = document.getElementById("search-bar");

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const searchQuery = searchBar.value;
  window.location.href = "https://www.google.com/search?q=" + searchQuery;
});