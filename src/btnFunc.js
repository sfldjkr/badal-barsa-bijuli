import { userInputsCity } from ".";
const fBtn = document.querySelector(".fBtn");
const cBtn = document.querySelector(".cBtn");
let city = document.querySelector(".city");

let addBtnFunc = () => {
  let fChoosed = false;
  let cChoosed = true;

  if (fChoosed) {
    cBtn.classList.remove("choosed");
    fBtn.classList.add("choosed");
  } else if (cChoosed) {
    fBtn.classList.remove("choosed");
    cBtn.classList.add("choosed");
  }

  let clickedFBtn = () => {
    fChoosed = true;
    cChoosed = false;
    if (fChoosed) {
      cBtn.classList.remove("choosed");
      fBtn.classList.add("choosed");
    } else if (cChoosed) {
      fBtn.classList.remove("choosed");
      cBtn.classList.add("choosed");
    }
    userInputsCity(city.innerText.toLowerCase());
  };
  let clickedCBtn = () => {
    cChoosed = true;
    fChoosed = false;
    if (fChoosed) {
      cBtn.classList.remove("choosed");
      fBtn.classList.add("choosed");
    } else if (cChoosed) {
      fBtn.classList.remove("choosed");
      cBtn.classList.add("choosed");
    }
    userInputsCity(city.innerText.toLowerCase());
  };

  fBtn.addEventListener("click", clickedFBtn);
  cBtn.addEventListener("click", clickedCBtn);
};

export { addBtnFunc };
