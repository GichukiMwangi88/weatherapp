// Get weather data from the specified location

const cityInput = document.querySelector(".location");
const searchButton = document.querySelector(".search");

async function getWeatherInfo() {
  try {
    const city = cityInput.value.trim().toLowerCase();
    const apiurl = `https://api.weatherapi.com/v1/current.json?key=afb7e81f0a7e4b9ebe8181130230911&q=${city}`;

    const response = await fetch(apiurl, { mode: "cors" });

    const weatherData = await response.json();

    console.log(weatherData);
  } catch (error) {
    throw new Error(`Error details: ${error.code}, ${error.message}`);
  }
}

//Add event listener to the search button

searchButton.addEventListener("click", (event) => {
  getWeatherInfo();
  event.preventDefault();
});
