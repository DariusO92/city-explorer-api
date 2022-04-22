'use strict';
let axios = require('axios');
// const { response } = require('express');



class Forecast {
  constructor(dataset){
    this.date = dataset.datetime;
    this.description = dataset.weather.description;
    this.temp = dataset.temp;
  }
}

function weatherData(request,response) {
  let cityLat = request.query.lat;
  let cityLon = request.query.lon;
  let weatherUrl = `https://api.weatherbit.io/v2.o/current?lat=${cityLat}&lon=${cityLon}&key=${process.env.WEATHER_API_KEY}&units=${I}&days${3}`

}
axios. get(weatherUrl)
.then(weatherStats => weatherStats.data.data.map(obj => new Forecast(obj)))
.then(newWeatherStats => response.status(200).send(newWeatherStats))
.catch(err => console.error(err));





module.exports = weatherData


// app.get('/weather', (request, response, next) => {
//   try{

//     let cityInput = request.query.city;
//     console.log(cityInput);
//     let cityLat = parseInt(request.searchQuery.lat);
//     let cityLon = parseInt(request.searchQuery.lon);
    
//     let cityData = weatherData.find(data => 
//       data.city_name.toLowerCase() === cityInput.toLowerCase()
//       // && parseInt(data.lat) === cityLat 
//       // && parseInt(data.lon) === cityLon
//     );
//     console.log(cityData);
//     let forecastArr = [];
//     cityData.data.forEach(object => {
//       forecastArr.push(new Forecast(object));
//     });
//     response.send(forecastArr);
//   }
//   catch{
//     next(error);
//   }
// });