import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Filter from "../../utils/MoviesFilter";

import Api from '../../utils/MainApi'

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

const Movies = ({ currentUser, isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const [filteredMoviesData, setFilteredMoviesData] = useState([]);
  const [moviesDataFetched, setMoviesDataFetched] = useState([]);
  const [checkbox, setCheckbox] = useState(JSON.parse(localStorage.getItem('shorts')) || false);

  useEffect(() => {
    api.getMovies().then((data) => {
      renderCards(Filter.shorts(checkbox, data));
      setMoviesData(data);
      setMoviesDataFetched(data);
    }).catch((err) => {
      setNoticeMessage('Нет данных')
      console.log(err);
    })
  }, []);

  const handleChangeInput = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const movies = moviesData;
    const query = event.target.elements.query.value;
    const shorts = event.target.elements.shorts.checked;

    let showMovies = Filter.query(shorts, query, movies);

    renderCards(showMovies)
  }
  
  const handleCheckbox = async (event) => {
    const shortsState = event.target.checked;
    const showMovies = Filter.shorts(shortsState, moviesDataFetched);
    localStorage.setItem("shorts", shortsState);

    setCheckbox(shortsState);

    if (showMovies.length === 0 && shortsState) {
      setFilteredMoviesData([]);
      setNoticeMessage('Ничего не найдено');
    } else if (showMovies.length > 0 && shortsState) {
      renderCards(showMovies);
    } else if (!shortsState) {
      renderCards(moviesDataFetched);
    }
  }

  const renderCards = async (showMovies) => {
    try {
      if (checkbox) {
        const filtered = moviesDataFetched.filter((movie) => {
          return movie.duration < 40;
        });

        setFilteredMoviesData(showMovies);
      } else {
        setFilteredMoviesData(showMovies);
      }

      setIsLoading(false);

      if (showMovies.length === 0) {
        setNoticeMessage('Ничего не найдено');
      } else {
        setNoticeMessage('');
      }
    } catch (e) {
      setNoticeMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
    }
  }

  return (
    <>
      <Header currentUser={currentUser} isLoggedIn={isLoggedIn} />

      <main>
        <SearchForm
          handleChangeInput={handleChangeInput}
          handleCheckbox={handleCheckbox}
          checkbox={checkbox}
        />

        {noticeMessage && (
          <h2 className="notice">{noticeMessage}</h2>
        )}

        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={filteredMoviesData}
            isSavedMovies={true}
            isMoreActive={false}
          />
        )}
      </main>

      <Footer />
    </>
  );
};

export default Movies;