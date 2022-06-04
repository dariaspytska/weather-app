function addDate(dayTime) {
   let date = new Date(dayTime);
   let day = date.getDay();
   let hours = date.getHours();
   let minutes = date.getMinutes();
   return `${day} ${hours}:${minutes}` ;
}
function showTemp(resp) {
  //console.log(resp);
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
  
}

let apiKey = "9eac88714aa707593c33f048a9d7da34";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Zaporizhzhya&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemp);
