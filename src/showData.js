import moment from "moment";
import { addUvColorFunc } from "./uvFunc";
import cloud from "./images/amcharts_weather_icons_1.0.0/animated/cloudy-day-3.svg";
import haze from "./images/amcharts_weather_icons_1.0.0/animated/cloudy-day-3.svg";
import clear from "./images/amcharts_weather_icons_1.0.0/animated/weather.svg";
import drizzle from "./images/amcharts_weather_icons_1.0.0/animated/rainy-1.svg";
import thunderstorm from "./images/amcharts_weather_icons_1.0.0/animated/thunder.svg";
import rain from "./images/amcharts_weather_icons_1.0.0/animated/day.svg";
import snow from "./images/amcharts_weather_icons_1.0.0/animated/snowy-1.svg";
import defaultImg from "./images/amcharts_weather_icons_1.0.0/animated/weather.svg";

let cityPl = document.querySelector(".city");
let datesPl = document.querySelector(".dates");
let temperaturePl = document.querySelector(".temperature");
let headingPl = document.querySelector(".heading");
let feelsLikePl = document.querySelector(".feelsLike");
let looksLikePl = document.querySelector(".looksLike");
let windPl = document.querySelector(".wind");
let humidityPl = document.querySelector(".humidity");
let uvIndexPl = document.querySelector(".uvIndex");
let visibilityPl = document.querySelector(".visibility");
let cloudnessPl = document.querySelector(".cloudness");
let rainPl = document.querySelector(".chanceOfRain");
let sunrisePl = document.querySelector(".sunrise");
let sunsetPl = document.querySelector(".sunset");
let pressurePl = document.querySelector(".pressure");
let weeklyContainer = document.querySelector(".weeklyDiv");
let tempImg = document.querySelector(".temperatureImg");

let renderTodayData = (
  city,
  country,
  dateString,
  finalTemp,
  headingData,
  feelsLikeFinal,
  looksLike,
  wind,
  humidity,
  uvIndex,
  visibility,
  cloudness,
  chanceOfRain,
  sunrise,
  sunset,
  pressure,
  tempImgSrc,
) => {
  cityPl.innerText = `${city}`;
  datesPl.innerText = dateString;
  temperaturePl.innerText = finalTemp;
  headingPl.innerText = headingData;
  feelsLikePl.innerText = feelsLikeFinal;
  looksLikePl.innerText = looksLike;
  windPl.innerText = wind;
  humidityPl.innerText = humidity;
  uvIndexPl.innerText = uvIndex;
  visibilityPl.innerText = visibility;
  cloudnessPl.innerText = cloudness;
  rainPl.innerText = chanceOfRain;
  sunrisePl.innerText = sunrise;
  sunsetPl.innerText = sunset;
  pressurePl.innerText = pressure;
  tempImg.src = tempImgSrc;
  addUvColorFunc();
};

let renderWeeklyData = (allDatas, unit) => {
  weeklyContainer.innerHTML = "";
  weeklyContainer.innerHTML = `<h2 class='weeklyForeCast'">Weekly ForeCast</h2>`;
  let allDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let today;
  let date = new Date();
  let todayIndex = date.getDay();
  switch (todayIndex) {
    case 0:
      today = "sunday";
      break;

    case 1:
      today = "monday";
      break;

    case 2:
      today = "tuesday";
      break;

    case 3:
      today = "wednesday";
      break;

    case 4:
      today = "thursday";
      break;

    case 5:
      today = "friday";
      break;

    case 6:
      today = "saturday";
      break;
  }

  let hasReachedToday = false;
  let actualDays = [];
  for (let day of allDays) {
    if (day === today) {
      hasReachedToday = true;
    }
    if (hasReachedToday) {
      actualDays.push(day);
    }
  }

  for (let day of allDays) {
    if (!actualDays.includes(day)) {
      actualDays.push(day);
    }
  }

  actualDays.push(today);

  for (let i = 1; i < actualDays.length; i++) {
    let indexday = actualDays[i];
    let indexMaxTemp = allDatas.daily[i].temp.max;
    let indexMinTemp = allDatas.daily[i].temp.min;
    let indexTempHeading = allDatas.daily[i].weather[0].description;
    let indexMaxTempStr;
    let indexMinTempStr;
    if (unit === "F") {
      indexMaxTemp = ((Number(indexMaxTemp) - 273.15) * (9 / 5) + 32).toFixed(
        1,
      );
      indexMinTemp = ((Number(indexMinTemp) - 273.15) * (9 / 5) + 32).toFixed(
        1,
      );
      console.log({ indexMinTemp, indexMaxTemp });
      indexMaxTempStr = `${indexMaxTemp} °F`;
      indexMinTempStr = `${indexMinTemp} °F`;
    } else if (unit === "C") {
      indexMaxTemp = (Number(indexMaxTemp) - 273.15).toFixed(1);
      indexMinTemp = (Number(indexMinTemp) - 273.15).toFixed(1);
      indexMaxTempStr = `${indexMaxTemp} °C`;
      indexMinTempStr = `${indexMinTemp} °C`;
    }
    let div = document.createElement("div");
    div.classList.add("dayDiv");
    let day = document.createElement("h5");
    let img = new Image();
    let iconcode = allDatas.daily[i].weather[0].icon;
    img.src = "http://openweathermap.org/img/w/" + iconcode + ".png";
    let h5Head = document.createElement("h5");
    let h5Min = document.createElement("h5");
    let h5Max = document.createElement("h5");
    day.innerText = indexday;
    h5Head.innerText = indexTempHeading;
    h5Max.innerText = indexMaxTempStr;
    h5Min.innerText = indexMinTempStr;
    div.appendChild(day);
    div.appendChild(img);
    div.appendChild(h5Head);
    div.appendChild(h5Max);
    div.appendChild(h5Min);
    weeklyContainer.appendChild(div);
  }
};

let getData = (allData, secondaryData, unit) => {
  let city = secondaryData.location.name;
  let country = secondaryData.location.country;
  let date = new Date();
  let month = date.getMonth();
  let year = date.getFullYear();
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();

  let dateString = `${
    day + " | " + month + " | " + year + " | " + hour + ":" + minute
  }`;
  let tempC = secondaryData.current.temp_c;
  let tempF = secondaryData.current.temp_f;
  let finalTemp;
  let headingData = allData.current.weather[0].main;
  let feelsLikeC = `Feels Like ${secondaryData.current.feelslike_c} °C`;
  let feelsLikeF = `Feels Like ${secondaryData.current.feelslike_f} °F`;
  let feelsLikeFinal;
  if (unit === "F") {
    finalTemp = `${tempF} °F`;
    feelsLikeFinal = feelsLikeF;
  } else if (unit === "C") {
    finalTemp = `${tempC} °C`;
    feelsLikeFinal = feelsLikeC;
  }

  let looksLike = secondaryData.current.condition.text;
  let wind = `${secondaryData.current.wind_mph}m/h`;
  let humidity = secondaryData.current.humidity;
  let uvIndex = secondaryData.current.uv;
  let visibility = `${allData.current.visibility}km`;
  let cloudness = `${secondaryData.current.cloud}%`;
  let chanceOfRain = `${allData.daily[0].rain}%`;
  let timeZone = allData.current.timezone_offset;
  let sunrise = allData.current.sunrise;
  let sunset = allData.current.sunset;
  let tempImgSrc;
  sunrise = moment.utc(sunrise, "X").add(timeZone, "seconds").format("HH:mm a");
  sunset = moment.utc(sunset, "X").add(timeZone, "seconds").format("HH:mm a");
  let pressure = allData.current.pressure;
  if (headingData === "Clouds") {
    tempImgSrc = cloud;
  } else if (headingData === "Haze") {
    tempImgSrc = haze;
  } else if (headingData === "clear") {
    tempImgSrc = clear;
  } else if (headingData === "Thunderstorm") {
    tempImgSrc = thunderstorm;
  } else if (headingData === "Drizzle") {
    tempImgSrc = drizzle;
  } else if (headingData === "Rain") {
    tempImgSrc = rain;
  } else if (headingData === "Snow") {
    tempImgSrc = snow;
  } else {
    tempImgSrc = defaultImg;
  }
  console.log(headingData);
  renderTodayData(
    city,
    country,
    dateString,
    finalTemp,
    headingData,
    feelsLikeFinal,
    looksLike,
    wind,
    humidity,
    uvIndex,
    visibility,
    cloudness,
    chanceOfRain,
    sunrise,
    sunset,
    pressure,
    tempImgSrc,
  );
  renderWeeklyData(allData, unit);
};

export { renderTodayData, getData, renderWeeklyData };
