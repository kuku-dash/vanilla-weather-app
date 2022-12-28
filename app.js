function newDate(timestamp) {
  let date = new Date();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesdays",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hour}: ${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastData = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastData =
      forecastData +
      `<div class="col-2">
               <div class="forecast-weekday">${day}</div>

                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7fat3L8tfkv3GfJjxyjKeF1P_ne2MNrkjy0yE8Lm44A&s"
                  alt="clouds"
                  width="30px"
                />
                <br />
                <div class="forecast-temperature-data">
                  <span class="max-temperature-data"> 18°</span> <span class="min-temperature-data">14°</span></div>
              </div>`;
  });
  `</div>`;

  forecastElement.innerHTML = forecastData;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let longitude = coordinates.lon;
  let latitude = coordinates.lat;
  let apiKey = "a5410801f2tbe3f2bfofb9a63a6f2459";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperature = document.querySelector("#temp");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;
  temperature.innerHTML = Math.round(celsiusTemp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = newDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "93c9302a335ce19bd3e0802426872a43";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function submitQuery(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-box");
  search(cityInput.value);
}
let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitQuery);
search("Lagos");

function showCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#temp");
  celsiusTemperature.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

let fahLink = document.querySelector("#fahrenheit");
fahLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);
