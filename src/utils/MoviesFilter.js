
const query = function (shortsState, query, movies) {
  let showMovies = movies.filter((movie) => {
    if (shortsState) {
      return movie.duration < 40 &&
        (movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(query.toLowerCase()))
    } else {
      return (movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase()))
    }
  });

  return showMovies;
}

export default {
  query
}