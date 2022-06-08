function iconShow(iconName) {
  let icon = iconName;
  if (icon === "Thunderstorm") {
    return "img/thunderstorm.7e644c1a.svg";
  } else if (icon === "Clear") {
    return "img/icons8-sun-104.svg";
  } else if (icon === "Clouds") {
    return "img/cloud.2b02f907.svg";
  } else if (icon === "Drizzle") {
    return "img/rain.a56a7915.svg";
  } else if (icon === "Rain") {
    return "img/rain.a56a7915.svg";
  } else if (icon === "Snow") {
    return "img/snow.0bb8cb16.svg";
  } else {
    return "img/cloud.2b02f907.svg";
  }
}
function addDate(dayTime) {
  let date = new Date(dayTime);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  //if (hours < 5 || hours > 19) {
  //document.body.style.bgColor = "#494E60";
  // }

  return `${day} ${hours}:${minutes}`;
}

function formatForecastDay(days) {
let date = new Date(days*1000);
let day = date.getDay();
let fDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  return fDays[day];
}
function displayCoordinates(coords) {
 let apiKey = "9eac88714aa707593c33f048a9d7da34";
 let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayForecast(resp) {
  let dataForecast = resp.data.daily;

  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  dataForecast.forEach(function (forecastDay, index) {
    if(index < 6) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
              <div class="weather-forecast-date">${formatForecastDay(forecastDay.dt)}</div>
              <img src="${iconShow(forecastDay.weather[0].main)}" alt="" width="48px" />
              <div class="weather-forecast-temp">
                <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°</span>
                <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;

}
function showTemp(resp) {
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(resp.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = resp.data.name;
  let descriptionElement = document.querySelector("#condition");
  descriptionElement.innerHTML = resp.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = resp.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(resp.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = addDate(resp.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `${iconShow(resp.data.weather[0].main)}`);
  celciumTemperature = resp.data.main.temp;
  displayCoordinates(resp.data.coord);
}

function search(city) {
  let apiKey = "9eac88714aa707593c33f048a9d7da34";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function handleSearch(event) {
  event.preventDefault();
  let cityElem = document.querySelector("#city-search");
  search(cityElem.value);
}
function farenheitConvert(event) {
  event.preventDefault();
  let convert = document.querySelector("#temperature");
  let newConv = (celciumTemperature * 9) / 5 + 32;
  convert.innerHTML = Math.round(newConv);
}

function celciumConvert(event) {
  event.preventDefault();
  let convert = document.querySelector("#temperature");
  convert.innerHTML = Math.round(celciumTemperature);
}

let celciumTemperature = null;

let form = document.querySelector("#form-search");
form.addEventListener("submit", handleSearch);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", farenheitConvert);

let celciumLink = document.querySelector("#celcium-link");
celciumLink.addEventListener("click", celciumConvert);

search("Kyiv");
