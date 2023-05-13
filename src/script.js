let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(".current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let now = new Date();
let today = now.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let hours = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

let day = days[now.getDay()];
let hour = hours[now.getHours()];
let minutes = now.getMinutes();
let dateTime = document.querySelector("#datetime");
dateTime.innerHTML = `${day} ${hour}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector("h3").innerHTML = response.data.name;
  document.querySelector("#weather-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#precipitation").innerHTML =
    response.data.main.pressure;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city1 = document.querySelector("#input-search").value;
  searchCity(city1);
}

function searchLocation(position) {
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
