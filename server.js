'use strict';

// console.log('first server');

// REQUIRES
// require is used instead of import in servers
let express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json')
let cors = require('cors');

// USE
// assign required file a variable
let app = express();
app.use(cors());

let PORT = process.env.PORT || 3002;

// ROUTES
// will use these for endpoint
app.get('/', (request, response) => {
  response.send('Start Route');
});

app.get('/weather', (request, response, next) => {
  try{

    let cityInput = request.query.city;
    let cityLat = parseInt(request.query.lat);
    let cityLon = parseInt(request.query.lon);
    
    let cityData = weatherData.find(data => 
      data.city_name === cityInput 
      && parseInt(data.lat) === cityLat 
      && parseInt(data.lon) === cityLon
    );
    let forecastArr = [];
    cityData.data.forEach(object => {
      forecastArr.push(new Forecast(object));
    });
    response.send(forecastArr);
  }
  catch{
    next(error);
  }
});

app.get('*', (request, response) => {
  response.send('Not a valid request!');
});

// ERRORS
// Handle any errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// CLASSES
class Forecast {
  constructor(dataset){
    this.date = dataset.datetime;
    this.description = dataset.weather.description
  }
}


// Listen
// Start the server
// listen is an express method
app.listen(PORT, () => console.log(`listening on ${PORT}`));


