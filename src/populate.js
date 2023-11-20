import getWeather from "./fetch.js";
import cloudy from "./assets/cloudy.png";
import rainy from "./assets/rainy.png";
import snow from "./assets/snow.png";
import sunny from "./assets/sunny.png";
import thunder from "./assets/thunder.png";

// Grab and create DOM elements
// Get the weather card div
const weatherCard = document.querySelector(".weatherCard");

//Create DOM elements
const divConditions = document.createElement("div");
const imageWeather = document.createElement("img");
const location = document.createElement("h2");
const date = document.createElement("p");
const time = document.createElement("p");
const temp = document.createElement("p");
const conditions = document.createElement("p");

// Set attributes to allow styling
divConditions.classList.add("conditionsDiv");

imageWeather.setAttribute("id", "conditionImg");
imageWeather.setAttribute("alt", "weatherImage");
location.setAttribute("id", "locationName");
date.setAttribute("id", "date");
time.setAttribute("id", "localtime");
temp.setAttribute("id", "tempF");
conditions.setAttribute("id", "conditions");
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
      alert("City input element not found");
      return;
    }

    const city = cityInput.value.trim().toLowerCase();
    console.log(city);

    //validate city input
    if (!city) {
      alert("Please enter a valid city!");
      return;
    }

    const weatherData = await getWeather(city);
    //console.log(weatherData);

    weatherObject.location = weatherData.location.name;
    weatherObject.date = new Date(weatherData.location.localtime).toDateString(
      "en-US"
    );
    weatherObject.time = new Date(
      weatherData.location.localtime
    ).toLocaleTimeString("en-US");
    weatherObject.temp = Math.trunc(weatherData.current.temp_f);
    weatherObject.conditions = weatherData.current.condition.text;

    console.log(weatherObject);
    console.log("Weather conditions:", weatherObject.conditions);
    console.log("Image source: ", imageWeather.src);

    setWeatherImage();
    populatePage();
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}

// Set the weather Image based on weather conditions
function setWeatherImage() {
  switch (weatherObject.conditions) {
    case "Sunny":
    case "Clear":
      imageWeather.src = sunny;
      break;
    case "Partly cloudy":
    case "Cloudy":
      imageWeather.src = cloudy;
      break;
    case "Rainy":
    case "Heavy showers":
    case "Light rain":
    case "Patchy rain possible":
      imageWeather.src = rainy;
      break;
    case "Snow showers":
      imageWeather.src = snow;
      break;
    default:
      imageWeather.src = thunder;
  }

  //Handle image loading errors

  imageWeather.onerror = function () {
    console.error("Error loading weather image: ", imageWeather.src);
  };
}

// Function to populate the page

function populatePage() {
  conditions.textContent = weatherObject.conditions;
  location.textContent = weatherObject.location;
  date.textContent = weatherObject.date;
  time.textContent = `Time: ${weatherObject.time}`;
  temp.textContent = `${weatherObject.temp}°F`;

  divConditions.appendChild(temp);
  divConditions.appendChild(imageWeather);

  weatherCard.appendChild(location);
  weatherCard.appendChild(conditions);

  weatherCard.appendChild(divConditions);
  //weatherCard.appendChild(imageWeather);

  //weatherCard.appendChild(date);
  //weatherCard.appendChild(time);
}
