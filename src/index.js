function updateWeather(response) {
  let temperatureApi = response.data.temperature.current;
  let temperatureLoc = document.querySelector("#app-temperature");
  temperatureLoc.innerHTML = Math.round(temperatureApi);

  cityDisplayedApp = document.querySelector("#app-city");
  cityDisplayedApp.innerHTML = response.data.city;
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
