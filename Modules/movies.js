'use strict';
let axios = require('axios');

class Movies {
  constructor(dataset){
    this.title = dataset.title;
    this.popularity = dataset.popularity;
    this.overview = dataset.overview;
    this.posterPath = dataset.poster_path
  }
}


function movieData(request, response) {
  let cityName = request.query.cityName;
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${cityName}&page=1&include_adult=false`;

  axios.get(movieUrl)
  .then(moviestats => movieData.stats.data.results.map(object => new Movies(object)))
  .then(newMoviesStats => response.status(200).send(newMoviesStats))
  .catch(err => console.error(err));
}



module.exports = movieData;