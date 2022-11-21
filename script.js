const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icons");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const row = document.querySelector(".row");
const cities = document.querySelectorAll(".city");
let cityInput = "Kolkata";
// const cities_array = [...cities];

// const i = 0;
// for (let i = 0; i < 3; i++) {
//   row.innerHTML += `<div class="column" style="background-color:#aaa;">
// <span class="date" style="position: absolute;">Monday 25 Dec</span>

// <img src="./Icons/day/113.png"
// class = "icons"
// alt = "icon"
// width="50"
// height = "50"/>
// <span class="condition">Cloudy</span>
// </div>`;
// }

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    //console.log(document.getElementById("upFor"));
    document.getElementById("upFor").remove();
    fetchWeatherData();
    app.style.opacity = "0";
  });
});
form.addEventListener("submit", (e) => {
  //console.log(search.value);
  e.preventDefault();
  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {
    cityInput = search.value;
    //console.log(document.getElementById("upFor"));
    document.getElementById("upFor").remove();
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
  }
});
function dayofTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // console.log(new Date(year, month, day).getDate());
  return weekday[new Date(year + "," + month + "," + day).getDay()];
}
function fetchWeatherData() {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=506e06a7d1914155a39173818221711&q=${cityInput}&days=4`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(
        data.current.condition.icon.substr(
          "//cdn.weatherapi.com/weather/64*64/".length
        )
      );
      temp.innerHTML = data.current.temp_c + "&#176" + "C";
      const date = data.location.localtime;
      row.innerHTML = `<span class="rowDetails" id="upFor">
      </span>`;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);
      dateOutput.innerHTML = `${dayofTheWeek(d, m, y)}, ${m} ${y}`;
      timeOutput.innerHTML = time;
      conditionOutput.innerHTML = data.current.condition.text;
      nameOutput.innerHTML = data.location.name;
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64*64/".length
      );
      icon.src = "./icons/" + iconId;

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";
      let timeOfDay = "day";
      const code = data.current.condition.code;
      //console.log(data.forecast.forecastday);
      if (data.forecast.forecastday.length == 4) {
        data.forecast.forecastday.slice(1, 4).map((days) => {
          const upIconId = days.day.condition.icon.substr(
            "//cdn.weatherapi.com/weather/64*64/".length
          );
          upIcon = "./icons/" + upIconId;
          const upDate = days.date;
          const y = parseInt(upDate.substr(0, 4));
          const m = parseInt(upDate.substr(5, 2));
          const d = parseInt(upDate.substr(8, 2));
          dateUpdate = `${dayofTheWeek(d, m, y)}, ${m} ${y}`;
          row.innerHTML += `
         
            <section class="column">
            <span class="date" style="position: absolute;">${dateUpdate}</span>
                <img src=${upIcon}
                class = "icons"
                alt = "icon"
                width="50"
                height = "50"/>
                <div class="upcoming-temp">
                <span >Min temp</span>
                <span >${days.day.mintemp_c}&#176;C</span>
            </div>
            <div class="upcoming-temp" style="display: flex; flex-direction: row; justify-content: space-between;">
                <span>Max temp</span>
                <span>${days.day.maxtemp_c}&#176;C</span>
            </div>
                <span class="up-condition">${days.day.condition.text}</span>
                </section>
               
            `;
        });
      }
      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      if (code == 1000) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#fa6d1b";
        console.log("night");
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        if (timeOfDay == "night") {
          btn.style.background = "#325c80";
        }
      } else {
        app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
        btn.style.background = "#4d72aa";
        if (timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      }
      app.style.opacity = "1";
    })
    .catch(() => {
      alert("City not found, please try again");
      app.style.opacity = "1";
    });
}

fetchWeatherData();

app.style.opacity = "1";
