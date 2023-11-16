// fetch weather data from the weather api

// Select the location entered by user
const cityInput = document.querySelector("#location");

export default async function getWeather() {
  try {
    const city = cityInput.value.trim().toLowerCase();
    console.log(city);
    const apiurl = `https://api.weatherapi.com/v1/current.json?key=afb7e81f0a7e4b9ebe8181130230911&q=${city}`;

    const data = await fetch(apiurl, { mode: "cors" });
    const weatherInfo = await data.json();

    return weatherInfo;
  } catch (error) {
    throw new Error(`Error details: ${error.code}, ${error.message}`);
  }
}
