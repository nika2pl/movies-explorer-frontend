import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import pic from "../../images/sample-movie.png";

const Movies = () => {
  const [isLoading, setIsLoading] = useState(true);

  // preloader example
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  const moviesSample = [
    { title: 'фантастические твари и где они обитают фантастические твари и где они обитают', time: '1h 2m', picture: pic, isSaved: false },
    { title: 'фантастические твари и где они обитают', time: '1h 2m', picture: pic, isSaved: true },
    { title: 'фантастические твари и где они обитают', time: '1h 2m', picture: pic, isSaved: false },
    { title: 'фантастические твари и где они обитают', time: '1h 2m', picture: pic, isSaved: true },
    { title: 'фантастические твари и где они обитают', time: '1h 2m', picture: pic, isSaved: false },
    { title: 'фантастические твари и где они обитают', time: '1h 2m', picture: pic, isSaved: true },
    { title: 'фантастические твари и где они обитают', time: '1h 2m', picture: pic, isSaved: true },
    { title: 'фантастические твари и где они обитают', time: '1h 2m', picture: pic, isSaved: false },
    { title: 'фантастические твари и где они обитают', time: '1h 2m', picture: pic, isSaved: true },
    { title: 'фантастические твари и где они обитают', time: '1h 2m', picture: pic, isSaved: false },
    { title: 'фантастические твари и где они обитают ', time: '1h 2m', picture: pic, isSaved: true }
  ];

  return (
    <>
      <Header isAuthed={true} />

      <SearchForm />

      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={moviesSample} isSavedMovies={false} />
      )}

      <Footer />
    </>
  );
};

export default Movies;