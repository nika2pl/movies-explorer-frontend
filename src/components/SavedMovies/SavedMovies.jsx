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
    { title: '500 дней лета', time: '1h 2m', picture: pic, isSaved: true },
    { title: '500 дней лета', time: '1h 2m', picture: pic, isSaved: true },
    { title: '500 дней лета', time: '1h 2m', picture: pic, isSaved: true },
    { title: '500 дней лета', time: '1h 2m', picture: pic, isSaved: true }
  ];

  return (
    <>
      <Header isAuthed={true} />

      <main>
        <SearchForm />

        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList movies={moviesSample} isSavedMovies={true} />
        )}
      </main>

      <Footer />
    </>
  );
};

export default Movies;