'use strict';

// console.log('first server');

// REQUIRES
// require is used instead of import in servers
let express = require('express');
require('dotenv').config();
let weatherData = require('./components/weather.js')
 let movieData = require('./components/weather.js')
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

app.get('/weather', weatherData);

app.get('/movies', movieData);

app.get('*', (request, response) => {
  response.send('Not a valid request!');
});

// ERRORS
// Handle any errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// CLASSES



// Listen
// Start the server
// listen is an express method
app.listen(PORT, () => console.log(`listening on ${PORT}`));


