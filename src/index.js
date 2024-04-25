function displayCityName(event) {
  event.preventDefault();
  let cityFormInput = document.querySelector("#city-form-input");

  cityDisplayedApp = document.querySelector("#app-city");
  cityDisplayedApp.innerHTML = cityFormInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCityName);
