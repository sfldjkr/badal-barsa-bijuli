let addUvColorFunc = () => {
  let uvIndexPl = document.querySelector(".uvIndex");
  let uvIndex = Number(uvIndexPl.innerText);
  if (uvIndex < 3) {
    uvIndexPl.style.backgroundColor = "green";
  } else if (uvIndex < 8) {
    uvIndexPl.style.backgroundColor = "yellow";
  } else {
    uvIndexPl.style.backgroundColor = "red";
  }
};

export { addUvColorFunc };
