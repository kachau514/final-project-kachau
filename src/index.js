function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayGeolocTemp(response) {
  displayDate();
  let city = response.data.city;
  let country = response.data.country;
  let iconUrl = response.data.condition.icon_url;
  let description = response.data.condition.description;
  let descriptionFormatted = capitalizeFirstLetter(description);
  let temperature = response.data.temperature.current;
  let tempFormatted = Math.round(temperature);
  let windUnit = "km/h";
  let wind = response.data.wind.speed;
  let humidity = response.data.temperature.humidity;
  celsiusTemperature = temperature;

  let cityElement = document.querySelector("#current-city");
  let iconElement = document.querySelector("#current-icon");
  let tempElement = document.querySelector("#current-temp");

  let descriptionElement = document.querySelector("#current-description");
  let altElement = document.querySelector("#current-icon");
  let windElement = document.querySelector("#current-wind");
  let humidityElement = document.querySelector("#current-humidity");

  cityElement.innerHTML = `${city}, ${country}`;
  iconElement.setAttribute("src", iconUrl);
  tempElement.innerHTML = tempFormatted;

  descriptionElement.innerHTML = descriptionFormatted;
  altElement.setAttribute("alt", description);
  windElement.innerHTML = `Wind: ${wind} ${windUnit}`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

function retrieveGeolocPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "240eof8530cet06fbe36f1fa5d44040b";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?lon=${long}&lat=${lat}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayGeolocTemp);
}
function displayDate() {
  let dateArea = document.querySelector("#current-date");
  dateArea.innerHTML = `Last updated: ${time}`;
}

function retrievePosition() {
  navigator.geolocation.getCurrentPosition(retrieveGeolocPosition);
}

function search(city) {
  let apiKey = "240eof8530cet06fbe36f1fa5d44040b";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayGeolocTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, "0");
let time = `${day} ${hour}:${minutes}`;
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

retrievePosition();
