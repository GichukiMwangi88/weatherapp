import getWeather from "./fetch.js";

// Grab and create DOM elements
// Get the weather card div
const weatherCard = document.querySelector(".weatherCard");

//Create DOM elements
const icon = document.createElement("img");
const location = document.createElement("h2");
const date = document.createElement("p");
const time = document.createElement("p");
const temp = document.createElement("p");
const conditions = document.createElement("p");

// Set attributes to allow styling
icon.setAttribute("id", "conditionImg");
location.setAttribute("id", "locationName");
date.setAttribute("id", "date");
time.setAttribute("id", "localtime");
temp.setAttribute("id", "tempF");
conditions.setAttribute("id", "conditions");
// Create a weather object with the weather details from API call

const weatherObject = {
  icon: "",
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

    weatherObject.icon = weatherData.current.condition.icon;
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

    //Populate the page
    icon.src = weatherObject.icon;
    location.textContent = weatherObject.location;
    date.textContent = `Date: ${weatherObject.date}`;
    time.textContent = `Time: ${weatherObject.time}`;
    temp.textContent = `Temp: ${weatherObject.temp}F`;
    conditions.textContent = `Conditions: ${weatherObject.conditions}`;

    // Append the elements to the weatherCard div
    weatherCard.appendChild(icon);
    weatherCard.appendChild(location);
    weatherCard.appendChild(date);
    weatherCard.appendChild(time);
    weatherCard.appendChild(temp);
    weatherCard.appendChild(conditions);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}
