import { userInputsCity } from ".";

let input = document.querySelector(".input-text");
let searchBtn = document.querySelector(".searchBtn");

let addSearchFunc = () => {
  let searchCity = () => {
    let cityName = input.value;
    if (cityName) {
      userInputsCity(cityName.toLowerCase());
    }
    input.value = "";
  };

  searchBtn.addEventListener("click", searchCity);
};

export { addSearchFunc };
