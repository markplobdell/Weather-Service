"use strict";
/*    JavaScript 7th Edition

      Author: Mark Lobdell
      Date: 5/11/2022

      Filename: Today's Weather.js
*/

// Weather Table References
let day = document.getElementById("day");
let temp = document.getElementById("temp");
let feelsLike = document.getElementById("feelslike");
let minTemp = document.getElementById("minTemp");
let maxTemp = document.getElementById("maxTemp");
let humidity = document.getElementById("humidity");
let winds = document.getElementById("winds");

// Weather Image Table References
let weatherImage = document.getElementById("weatherImage");
let weatherDesc = document.getElementById("weatherDesc");


//Set Day of the week heading
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let currentDay = new Date();
day.textContent += weekday[currentDay.getDay()];

// Get the device's current position
navigator.geolocation.getCurrentPosition(getLocation, handleError);

function getLocation(pos) {
     
   let myPosition = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
   }

   let key = "184c1915913f52fe5539875c5696987b";

   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${myPosition.lat}&lon=${myPosition.lng}&appid=${key}&units=imperial`, {
      method: "GET",
   })
   .then(response => response.json())
   .then(json => displayWeather(json))
   .catch(error => console.log(error));

   function displayWeather(json) {

      //Set Weather Table Data
      temp.textContent += Math.round(json.main.temp) + "\u00B0";
      feelsLike.textContent += Math.round(json.main.feels_like)+ "\u00B0";
      minTemp.textContent += Math.round(json.main.temp_min) + "\u00B0";
      maxTemp.textContent += Math.round(json.main.temp_max) + "\u00B0";
      humidity.textContent += Math.round(json.main.humidity) + "%";
      winds.textContent += Math.round(json.wind.speed) + " mph";

      //Set Weather Image Table Data
      weatherDesc.textContent += json.weather[0].description;
      let iconID = json.weather[0].icon;
      weatherImage.src = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
         
      
   }

}

function handleError() {
   alert("Unable to get your location");
   temp.textContent += "Unknown";
   feelsLike.textContent += "Unknown";
   minTemp.textContent += "Unknown";
   maxTemp.textContent += "Unknown";
   humidity.textContent += "Unknown";
   winds.textContent += "Unknown";
}






