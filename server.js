'use strict';

// console.log('first server');

// REQUIRES
// require is used instead of import in servers
let express = require('express');
require('dotenv').config();
let weather = require('./modules/weather.js')
 let movie = require('./modules/movies.js')
 const axios = require('axios').default
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

app.get('/weather', weather);

app.get('/movies', movie);

app.get('*', (request, response) => {
  response.send('Not a valid request!');
});

// ERRORS
// Handle any errors
function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

// app.use((error, request, response, next) => {
//   response.status(500).send(error.message);
// });

// CLASSES



// Listen
// Start the server
// listen is an express method
app.listen(PORT, () => console.log(`listening on ${PORT}`));


