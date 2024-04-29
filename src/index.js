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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCityName);
let apiKey = "34f7boabet4bfa3ede2162049aca8d1a";

function getWeatherForecast(city) {
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecast = document.querySelector("#forecast");
  let days = ["Mon", "Mon", "Mon", "Mon", "Mon"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml += `<div class="col">
          <div class="forecast-day">${day}</div>
          <img
            src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
            width="36"
          />
          <div class="forecast-temperature">
            <span class="max-temp">17°</span> <span class="min-temp">17°</span>
          </div>
        </div>`;
  });
  forecast.innerHTML = forecastHtml;
}

// standard value when you load page
callApiViaCity("Amsterdam");
displayForecast();
