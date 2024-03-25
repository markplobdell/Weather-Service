"use strict";
/*    JavaScript 7th Edition

      Author: Mark Lobdell
      Date: 4/19/2022

      Filename: UV Index.js
*/

// Table References
let latCell = document.getElementById("lat");
let lngCell = document.getElementById("lng");
let uvIndexCell = document.getElementById("uvIndex");
let uvMaxCell = document.getElementById("uvMax");
let ozoneCell = document.getElementById("ozone");
let st1Cell = document.getElementById("st1");
let st2Cell = document.getElementById("st2");
let st3Cell = document.getElementById("st3");
let st4Cell = document.getElementById("st4");
let st5Cell = document.getElementById("st5");
let st6Cell = document.getElementById("st6");


// Get the device's current position
navigator.geolocation.getCurrentPosition(getLocation, handleError);

function getLocation(pos) {
     
   let myPosition = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
   }
      
   let url = "https://api.openuv.io/api/v1/uv";
   let key = "296b9030b3e828aac11974e705eeba2b";

   fetch(`${url}?lat=${myPosition.lat}&lng=${myPosition.lng}`, {

      method: "GET",
      headers: {
         'x-access-token': key
      }
   })
   .then(response => response.json())
   .then(json => showSunSafety(json))
   .catch(error => console.log(error));

   function showSunSafety(json) {

      latCell.textContent = myPosition.lat.toFixed(6);
      lngCell.textContent = myPosition.lng.toFixed(6);
      uvIndexCell.textContent = json.result.uv;
      uvMaxCell.textContent = json.result.uv_max;
      ozoneCell.textContent = json.result.ozone;

      if(json.result.safe_exposure_time.st1 == null){
         
         st1Cell.textContent = "No Risk";
         st2Cell.textContent = "No Risk";
         st3Cell.textContent = "No Risk";
         st4Cell.textContent = "No Risk";
         st5Cell.textContent = "No Risk";
         st6Cell.textContent = "No Risk";
      }
      else{

         st1Cell.textContent = json.result.safe_exposure_time.st1;
         st2Cell.textContent = json.result.safe_exposure_time.st2;
         st3Cell.textContent = json.result.safe_exposure_time.st3;
         st4Cell.textContent = json.result.safe_exposure_time.st4;
         st5Cell.textContent = json.result.safe_exposure_time.st5;
         st6Cell.textContent = json.result.safe_exposure_time.st6;
      }

      
   }

}

function handleError() {
   alert("Unable to get your location");
   latCell.textContent = "Unknown";
   lngCell.textContent = "Unknown";
}






