import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Filter from "../../utils/MoviesFilter";

import {
  NO_DATA,
  NOT_FOUND,
  INTERNAL_ERROR
} from "../../utils/Messages";

const Movies = ({ currentUser, isLoggedIn, savedMoviesData, handleSaveMovie, isLoading, setIsLoading }) => {
  const [noticeMessage, setNoticeMessage] = useState('');
  const [moviesDataFiltered, setMoviesDataFiltered] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (savedMoviesData) {
      setMoviesDataFiltered(savedMoviesData);
      renderCards(Filter.query(checkbox, query, savedMoviesData));
    } else {
      setNoticeMessage(NO_DATA)
    }
  }, [savedMoviesData]);

  const handleChangeInput = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const query = event.target.elements.query.value;
    const shorts = event.target.elements.shorts.checked;

    setQuery(query);
    setCheckbox(shorts);

    const showMovies = Filter.query(shorts, query, savedMoviesData);
    
    setIsLoading(false);
    renderCards(showMovies)
  }

  const handleChangeCheckbox = async (event) => {
    setIsLoading(true);

    const shortsState = event.target.checked;
    const filteredArray = Filter.query(shortsState, query, savedMoviesData);

    localStorage.setItem("shorts", shortsState);

    setCheckbox(shortsState);
    renderCards(filteredArray);
    setIsLoading(false);

    if (filteredArray.length === 0 && shortsState) {
      setNoticeMessage(NOT_FOUND);
    }
  }

  const renderCards = async (movies) => {
    try {
      setMoviesDataFiltered(movies);

      if (movies.length === 0) {
        setNoticeMessage(NOT_FOUND);
      } else {
        setNoticeMessage('');
      }
    } catch (e) {
      setNoticeMessage(INTERNAL_ERROR)
    }
  }
  return (
    <>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn} />

      <main>
        <SearchForm
          handleChangeInput={handleChangeInput}
          handleChangeCheckbox={handleChangeCheckbox}
          checkbox={checkbox}
        />

        {!isLoading && noticeMessage && (
          <h2 className="notice">{noticeMessage}</h2>
        )}

        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={moviesDataFiltered}
            isSavedMovies={true}
            isMoreActive={false}
            handleSaveMovie={handleSaveMovie}
          />
        )}
      </main>

      <Footer />
    </>
  );
};

export default Movies;