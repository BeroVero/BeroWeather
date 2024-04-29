let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCityName);
let apiKey = "34f7boabet4bfa3ede2162049aca8d1a";

function formatDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let timeDisplayed = document.querySelector("#time-app");
  let weekDayName = weekDays[date.getDay()];
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  timeDisplayed.innerHTML = `${weekDayName}, ${hours}:${minutes}`;
}

function updateWeather(response) {
  let temperatureApi = response.data.temperature.current;
  let temperatureLoc = document.querySelector("#app-temperature");
  let cityDisplayed = document.querySelector("#app-city");
  let conditionDisplayed = document.querySelector("#app-condition");
  let humidityDisplayed = document.querySelector("#humidity-app");
  let windDisplayed = document.querySelector("#wind-app");
  let date = new Date(response.data.time * 1000);
  let iconDisplayed = document.querySelector("#app-emoji");

  temperatureLoc.innerHTML = Math.round(temperatureApi);
  cityDisplayed.innerHTML = response.data.city;
  conditionDisplayed.innerHTML = response.data.condition.description;
  humidityDisplayed.innerHTML = response.data.temperature.humidity;
  windDisplayed.innerHTML = response.data.wind.speed;
  img = `<img src="${response.data.condition.icon_url}" />`;
  iconDisplayed.innerHTML = img;

  getWeatherForecast(response.data.city);
  formatDate(date);
}

function callApiViaCity(city) {
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function displayCityName(event) {
  event.preventDefault();
  let cityFormInput = document.querySelector("#city-form-input");

  callApiViaCity(cityFormInput.value);
}

function getWeatherForecast(city) {
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `<div class="col">
          <div class="forecast-day">${formatDay(day.time)}</div>
          <img class="forecast-img"
            src=${day.condition.icon_url}
        
          />
          <div class="forecast-temperature">
            <span class="max-temp">${Math.round(
              day.temperature.maximum
            )}°</span> <span class="min-temp">${Math.round(
        day.temperature.minimum
      )}°</span>
          </div>
        </div>`;
    }
  });
  forecast.innerHTML = forecastHtml;
}

// standard value when you load page
callApiViaCity("Amsterdam");
displayForecast();
