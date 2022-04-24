'use strict';

let cache = require('./cache.js');
let axios = require('axios');


function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${cityLat}&lon=${cityLon}&key=${process.env.WEATHER_API_KEY}&days${3}`;
  
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
    .then(response => parseWeather(response.data));
  }
  console.log(cache[key].data);
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(dataset) {
    this.description = dataset.weather.description;
    this.timestamp = Date.now();
    this.icon = dataset.weather.icon;
    this.temp = dataset.temp
    this.date = dataset.datetime;
  }
}
  module.exports = getWeather;