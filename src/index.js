import "./styles/main.scss";
import getWeather from "./fetch.js";
import weatherCreate from "./populate.js";

const searchButton = document.querySelector(".search");
searchButton.addEventListener("click", (event) => {
  const weatherData = getWeather();
  console.log(weatherData);
  weatherCreate(weatherData);

  event.preventDefault();
});
