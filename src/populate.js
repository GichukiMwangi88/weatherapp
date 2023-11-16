import getWeather from "./fetch.js";

// Create a weather object with the weather details from API call

const weatherObject = {
  location: "",
  date: "",
  time: "",
  temp: "",
  conditions: "",
};

export default async function weatherCreate() {
  try {
    const cityInput = document.querySelector("#location");

    // Check if input is empty

    if (!cityInput) {
      console.error("City input element not found");
      return;
    }

    const city = cityInput.value.trim().toLowerCase();
    console.log(city);

    //validate city input
    if (!city) {
      console.error("Please enter a valid city!");
      return;
    }

    const weatherData = await getWeather(city);
    console.log(weatherData);

    weatherObject.location = weatherData.location.name;
    weatherObject.date = new Date(
      weatherData.location.localtime
    ).toLocaleDateString("en-US");
    weatherObject.time = new Date(
      weatherData.location.localtime
    ).toLocaleTimeString("en-US");
    weatherObject.temp = weatherData.current.temp_f;
    weatherObject.conditions = weatherData.current.condition.text;

    console.log(weatherObject);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}
