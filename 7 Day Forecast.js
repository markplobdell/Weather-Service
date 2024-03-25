"use strict";
/*    JavaScript 7th Edition

      Author: Mark Lobdell
      Date: 5/11/2022

      Filename: 7 Day Forecast.js
*/

//Forecast Table Day References
let day0 =  document.getElementById("day0");
let day1 =  document.getElementById("day1");
let day2 =  document.getElementById("day2");
let day3 =  document.getElementById("day3");
let day4 =  document.getElementById("day4");
let day5 =  document.getElementById("day5");
let day6 =  document.getElementById("day6");
let day0Desc =  document.getElementById("day0Desc");
let day1Desc =  document.getElementById("day1Desc");
let day2Desc =  document.getElementById("day2Desc");
let day3Desc =  document.getElementById("day3Desc");
let day4Desc =  document.getElementById("day4Desc");
let day5Desc =  document.getElementById("day5Desc");
let day6Desc =  document.getElementById("day6Desc");

//Image References
let img0 = document.getElementById("img0");
let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let img3 = document.getElementById("img3");
let img4 = document.getElementById("img4");
let img5 = document.getElementById("img5");
let img6 = document.getElementById("img6");

//Array for days of the week
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

//Set Day Headers
let day = new Date();
day0.textContent +=  weekday[day.getDay()];
day1.textContent +=  weekday[((day.getDay() + 1) % 7)];
day2.textContent +=  weekday[((day.getDay() + 2) % 7)];
day3.textContent +=  weekday[((day.getDay() + 3) % 7)];
day4.textContent +=  weekday[((day.getDay() + 4) % 7)];
day5.textContent +=  weekday[((day.getDay() + 5) % 7)];
day6.textContent +=  weekday[((day.getDay() + 6) % 7)];


// Get the device's current position
navigator.geolocation.getCurrentPosition(getLocation, handleError);

function getLocation(pos) {
     
   let myPosition = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
   }

   let key = "184c1915913f52fe5539875c5696987b";
   

   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${myPosition.lat}&lon=${myPosition.lng}&exclude=current,minutely,hourly,alert&appid=${key}&units=imperial`, {
      method: "GET",
   })
   .then(response => response.json())
   .then(json => displayForecast(json))
   .catch(error => console.log(error));

   function displayForecast(json) {

      day0.style.backgroundImage = "url(http://openweathermap.org/img/wn/" + json.daily[0].weather[0].icon + "@2x.png)";
      day1.style.backgroundImage = "url(http://openweathermap.org/img/wn/" + json.daily[1].weather[0].icon + "@2x.png)";
      day2.style.backgroundImage = "url(http://openweathermap.org/img/wn/" + json.daily[2].weather[0].icon + "@2x.png)";
      day3.style.backgroundImage = "url(http://openweathermap.org/img/wn/" + json.daily[3].weather[0].icon + "@2x.png)";
      day4.style.backgroundImage = "url(http://openweathermap.org/img/wn/" + json.daily[4].weather[0].icon + "@2x.png)";
      day5.style.backgroundImage = "url(http://openweathermap.org/img/wn/" + json.daily[5].weather[0].icon + "@2x.png)";
      day6.style.backgroundImage = "url(http://openweathermap.org/img/wn/" + json.daily[6].weather[0].icon + "@2x.png)";

      day0Desc.textContent = "High: " + Math.round(json.daily[0].temp.max) + "\r\n" + "Low: " + Math.round(json.daily[0].temp.min);
      day1Desc.textContent = "High: " + Math.round(json.daily[1].temp.max) + "\r\n" + "Low: " + Math.round(json.daily[1].temp.min);
      day2Desc.textContent = "High: " + Math.round(json.daily[2].temp.max) + "\r\n" + "Low: " + Math.round(json.daily[2].temp.min);
      day3Desc.textContent = "High: " + Math.round(json.daily[3].temp.max) + "\r\n" + "Low: " + Math.round(json.daily[3].temp.min);
      day4Desc.textContent = "High: " + Math.round(json.daily[4].temp.max) + "\r\n" + "Low: " + Math.round(json.daily[4].temp.min);
      day5Desc.textContent = "High: " + Math.round(json.daily[5].temp.max) + "\r\n" + "Low: " + Math.round(json.daily[5].temp.min);
      day6Desc.textContent = "High: " + Math.round(json.daily[6].temp.max) + "\r\n" + "Low: " + Math.round(json.daily[6].temp.min);
   }

}

function handleError() {
   alert("Unable to get your location");
}






