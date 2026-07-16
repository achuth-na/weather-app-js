const apiKey = "4b7ac438f1b9ed09a5accdad538fe55d";

const searchButton = document.getElementById("search-btn");
const cityInput = document.getElementById("city");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weather-icon");
const weatherCard = document.querySelector(".weather-card");
const errorMessage = document.getElementById("error-message");

searchButton.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        getWeather();

    }

});

async function getWeather() {

    const city = cityInput.value.trim();
    errorMessage.textContent = "";

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {

        const response = await fetch(url);

console.log(response);;

        if (!response.ok) {

    const errorData = await response.json();

    throw new Error(errorData.message);

}

        const data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        let weather = data.weather[0].description;

let words = weather.split(" ");

words = words.map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
);

weather = words.join(" ");

description.textContent = weather;
        const icon = data.weather[0].icon;

weatherIcon.src =
`https://openweathermap.org/img/wn/${icon}@2x.png`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} km/h`;
        errorMessage.textContent = "";
        cityInput.value = "";
        cityInput.focus();
        weatherCard.style.display = "block";

    } catch (error) {

        errorMessage.textContent = error.message;

    }

}