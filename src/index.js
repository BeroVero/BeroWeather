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
  temperatureLoc.innerHTML = Math.round(temperatureApi);

  let cityDisplayed = document.querySelector("#app-city");
  cityDisplayed.innerHTML = response.data.city;

  let conditionDisplayed = document.querySelector("#app-condition");
  conditionDisplayed.innerHTML = response.data.condition.description;

  let humidityDisplayed = document.querySelector("#humidity-app");
  humidityDisplayed.innerHTML = response.data.temperature.humidity;

  let windDisplayed = document.querySelector("#wind-app");
  windDisplayed.innerHTML = response.data.wind.speed;
  let date = new Date(response.data.time * 1000);

  formatDate(date);
}

function callApiViaCity(city) {
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
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

// standard value when you load page
callApiViaCity("Amsterdam");
