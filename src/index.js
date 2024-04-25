function callApiViaCity(city) {
  apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
}

function displayCityName(event) {
  event.preventDefault();
  let cityFormInput = document.querySelector("#city-form-input");
  cityDisplayedApp = document.querySelector("#app-city");
  cityDisplayedApp.innerHTML = cityFormInput.value;

  callApiViaCity(cityFormInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCityName);

let apiKey = "34f7boabet4bfa3ede2162049aca8d1a";
