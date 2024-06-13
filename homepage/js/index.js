const greeting = document.getElementById('greeting');
const clock = document.getElementById('clock');
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');

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
    if (searchTerm) {
        window.location.href = `https://www.google.com/search?q=${searchTerm}`;
    }
}

searchButton.addEventListener('click', handleSearch);

// Update time every tenth of a second
setInterval(updateTime, 100);
updateTime();