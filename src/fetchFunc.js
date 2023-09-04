let getWeatherData = async (city, API) => {
  let fetchData = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API}&q=${city}`,
  );
  if (fetchData.status !== 200) {
    return "wroung";
  }
  let data = await fetchData.json();
  return data;
};

let getEveryWeatherData = async (lat, lon, unit, API) => {
  let fetchFromApi = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${unit}}&appid=${API}`,
  );
  let data = await fetchFromApi.json();
  return data;
};

export { getEveryWeatherData, getWeatherData };
