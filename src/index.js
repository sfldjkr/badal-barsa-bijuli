import "./styling/style.css";
import { getEveryWeatherData, getWeatherData } from "./fetchFunc";
import { renderData, getData } from "./showData";
import { addUvColorFunc } from "./uvFunc";
import { addBtnFunc } from "./btnFunc";
import { addSearchFunc } from "./searchFunc";

let country;

let myWeatherApi = `35b6f285148a44abb0c111950233108`;
const anotherUserApi = `20f7632ffc2c022654e4093c6947b4f4`;
const weatherApiCall = `https://api.weatherapi.com/v1/current.json?key= &q= `;

let getInfo = async (data) => {
  let lad = data.location.lat;
  let long = data.location.lon;
  let input = document.querySelector(".input-text").value;
  let fBtn = document.querySelector(".fBtn");
  let cBtn = document.querySelector(".cBtn");
  let unit;
  if (fBtn.classList.contains("choosed")) {
    unit = "F";
  } else if (cBtn.classList.contains("choosed")) {
    unit = "C";
  }
  let allData = await getEveryWeatherData(lad, long, unit, anotherUserApi);
  getData(allData, data, unit);
};

let userInputsCity = async (city) => {
  let weatherData = await getWeatherData(city, myWeatherApi);
  if (weatherData === "wroung") {
    return;
  }
  getInfo(weatherData);
};
userInputsCity("kathmandu");
addBtnFunc();
addSearchFunc();

export { getInfo, userInputsCity };
