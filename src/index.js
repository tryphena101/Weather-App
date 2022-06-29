// Import weather icons
import SunnyDay from "./src/icons/wi-day-sunny.svg";
import CloudyDayOne from "./src/icons/wi-cloud.svg";
import CloudyDayTwo from "./src/icons/wi-day-cloudy.svg";
import CloudyDayThree from "./src/icons/wi-day-cloudy-high.svg";
import RainyDay from "./src/icons/wi-day-rain.svg";
import ShowersDay from "./src/icons/wi-day-showers.svg";
import ThunderstormsDay from "./src/icons/wi-thunderstorm.svg";
import FogDay from "./src/icons/wi-fog-day.svg";
import SnowDay from "./src/icons/wi-snowflake-cold-day.svg";
import Night from "./src/icons/wi-night-clear.svg";
import CloudyNightOne from "./src/icons/wi-night-alt-cloudy.svg";
import CloudyNightTwo from "./src/icons/wi-night-alt-cloudy-high.svg";
import CloudyNightThree from "./src/icons/wi-night-alt-partly-cloudy.svg";
import RainyNight from "./src/icons/wi-night-alt-rain.svg";
import ShowersNight from "./src/icons/wi-night-alt-showers.svg";
import ThunderstormsNight from "./src/icons/wi-night-thunderstorm.svg";
import FogNight from"./src/icons/wi-fog-night.svg";
import SnowNight from "./src/icons/wi-snowflake-cold-night.svg";

const weatherIcon = {
  icons: {
    "01d": SunnyDay,
    "01n": Night,
    "02d": CloudyDayTwo,
    "03d": CloudyDayOne,
    "04d": CloudyDayThree,
    "09d": ShowersDay,
    "10d": RainyDay,
    "11d": ThunderstormsDay,
    "13d": SnowDay,
    "50d": FogDay,
    "01n": Night,
    "02n": CloudyNightTwo,
    "03n": CloudyNightOne,
    "04n": CloudyNightThree,
    "09n": ShowersNight,
    "10n": RainyNight,
    "11n": ThunderstormsNight
  }
}

console.log(weatherIcon);

import './style.css';
//Search
const search = document.querySelector('input');

search.addEventListener('keydown', function(e) {
  if (e.key === "Enter") {
    handleSubmit(e);
  }
});


function handleSubmit(e) {
  e.preventDefault();
  fetchWeather();
  reset();
}

//get location from api
async function searchWeather(location) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=942870d3587e6222d2cc17f74d37ce5d`);
  if(response.status === 404){
    errorMsg();
  } else {
    response.json().then(function(response) {
      weatherData(response);
    })

  }
}
//fetch location from user to be used to retrieve weather information
const form = document.getElementById('search_city_form');
function fetchWeather() {
  const input = document.querySelector('input');
  const userLocation = input.value;
  searchWeather(userLocation);
}


//moved divs to html and called them in js app using querySelector instead
function weatherData(obj) {
  const weather_all = document.querySelector('.weather');
  const weatherInfo = document.querySelectorAll('.additional, .temp, .details, .icon, .date');
  console.log(weatherInfo);
  Array.from(weatherInfo).forEach((div) => {
    if (div.classList.contains('fade-in2')) {
      div.classList.remove('fade-in2');
      div.offsetWidth;
      div.classList.add('fade-in2');
    } else {
      div.classList.add('fade-in2');
    }
  })


//UI code
  // const main = document.querySelector('.main');
  const add = document.querySelector('.additional')
  const icon = document.querySelector('.icon')
  const temp = document.querySelector('.temp');
  const details = document.querySelector('.details');
  const date = document.querySelector('.date');


//need to dom manipulate here and create additional divs to format and align the text probably
  let weatherPic = obj.weather[0].icon;
  icon.src = weatherIcon.icons[weatherPic];
  temp.innerHTML = `<b>${Math.round(obj.main.temp - 273.15)}°C</b>`;
  details.innerHTML = `<font size="5">${obj.weather[0].description}</font><br> <font size="4"><b>${obj.name}, ${obj.sys.country}</b></font>`;

  //convert unix timestamp for sunrise/sunset from api data into a more readable timestamp


  const sunrise_new = new Date((obj.sys.sunrise + obj.timezone)*1000);
  const rise_hour = sunrise_new.getUTCHours();
  const rise_minute = sunrise_new.getUTCMinutes();
  const sunrise_time = rise_hour + ':' + rise_minute;
  console.log(sunrise_time);

  const sunset =  new Date((obj.sys.sunset + obj.timezone)*1000);
  const set_hour = sunset.getUTCHours();
  const reset_hour = (set_hour % 12) || 12;
  const set_minute = sunset.getUTCMinutes();
  const reset_minute = set_minute.toString().padStart(2, '0')
  const sunset_time = reset_hour + ':' + reset_minute;
  console.log(sunset_time);

  add.innerHTML = `<b>${Math.round(obj.main.feels_like - 273.15)}°C  ${obj.main.humidity}%   ${sunrise_time}AM  ${sunset_time}PM</b>`
  console.log(obj.sys.sunrise);
  const today = new Date((obj.sys.sunrise + obj.timezone) * 1000);
  date.innerHTML = `${today.toLocaleString('default', { month: 'short' })}<br> ${today.getDate()}`;
  console.log(today.getUTCHours());
  console.log(sunrise_new);



  weather_all.appendChild(date)
  weather_all.appendChild(icon);
  weather_all.appendChild(temp);
  weather_all.appendChild(details);
  weather_all.appendChild(weatherimage);
  weather_all.appendChild(add);



}

//create error message if user enters incorrect location
const error = document.querySelector('.error-msg');
function errorMsg() {
  error.style.display = 'block';
  if (error.classList.contains('fade-in')) {
    error.style.display = 'none';
    error.classList.remove('fade-in2');
    error.offsetWidth;
    error.classList.add('fade-in');
    error.style.display = 'block';

  }



    else {
    error.classList.add('fade-in');
    search.addEventListener('keydown', function(e) {
      if (e.key === "Enter") {
        error.style.display = 'none';
      }
    })
  }
}




//reset form after user enters their search
function reset() {
  form.reset();
}

searchWeather("Singapore")
