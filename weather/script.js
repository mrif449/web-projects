document.getElementById('searchBtn').addEventListener('click', function () {
    let cityCountry = document.getElementById('searchInput').value.trim();
    if (cityCountry) {
        fetchWeather(cityCountry);
    } else {
        alert('Please enter a city or country.');
    }
});

function searchWeather() {
    const searchInput = document.getElementById('searchInput');
    const cityName = searchInput.value.trim();
    if (cityName !== '') {
        fetchWeather(cityName);
        searchInput.value = '';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
}

document.getElementById('searchBtn').addEventListener('click', searchWeather);
document.getElementById('searchInput').addEventListener('keypress', handleKeyPress);

function fetchWeather(cityCountry) {
    const apiKey = 'your api here';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityCountry}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City or country not found.');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    let weatherIconUrl;
    switch (data.weather[0].main.toLowerCase()) {
        case 'clear':
            weatherIconUrl = 'assets/clear.png';
            break;
        case 'clouds':
            weatherIconUrl = 'assets/cloudy.png';
            break;
        case 'haze':
            weatherIconUrl = 'assets/mist.png';
            break;
        case 'mist':
            weatherIconUrl = 'assets/mist.png';
            break;
        case 'snow':
            weatherIconUrl = 'assets/snow.png';
            break;
        case 'rain':
            weatherIconUrl = 'assets/rain.png';
            break;
        default:
            weatherIconUrl = 'assets/404.png';
            break;
    }
    const mainTemp = data.main.temp.toFixed(1);
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <div class="weather-icon-container">
            <img src="${weatherIconUrl}" class="weather-icon" alt="Weather Icon">
            <div class="main-info">
                <p class="current-temp">${mainTemp}°C</p>
                
            </div>
        </div>
        <div class="weather-blocks">
            <div class="weather-block">
                <h3>Temperature</h3>
                <p>Condition: ${data.weather[0].description}</p>
                <p>Min Temperature: ${data.main.temp_min}°C</p>
                <p>Max Temperature: ${data.main.temp_max}°C</p>
                <p>Feels like: ${data.main.feels_like}°C</p>
            </div>
            <div class="weather-block">
                <h3>Other</h3>
                <p>Pressure: ${data.main.pressure} hPa</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Visibility: ${data.visibility} meters</p>
                <p>Cloudiness: ${data.clouds.all}%</p>
            </div>
            <div class="weather-block">
                <h3>Wind</h3>
                <p>Speed: ${data.wind.speed} m/s</p>
                <p>Direction: ${data.wind.deg}°</p>
            </div>
            <div class="weather-block">
            <h3>Sun</h3>
            <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, hourCycle: 'h12' }).toUpperCase()}</p>
            <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, hourCycle: 'h12' }).toUpperCase()}</p>
            </div>
        </div>
    `;
}


