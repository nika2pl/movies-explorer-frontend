import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Filter from "../../utils/MoviesFilter";

import {
  WIDTH_DESKTOP_MAX,
  WIDTH_TABLET_LOADING_COUNT,
  WIDTH_TABLET_INIT_COUNT,
  WIDTH_TABLET_MAX,
  WIDTH_MOBILE_LOADING_COUNT,
  WIDTH_MOBILE_INIT_COUNT
} from "../../utils/WidthConstrants";

import {
  ENTER_A_QUERY,
  NOT_FOUND,
  INTERNAL_ERROR
} from "../../utils/Messages";

const Movies = ({ currentUser, isLoggedIn, moviesData, handleSaveMovie, setIsLoading, isLoading }) => {
  const [isMoreActive, setIsMoreActive] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState('Нужно ввести ключевое слово');

  const [query, setQuery] = useState(localStorage.getItem('query') || '');
  const [checkbox, setCheckbox] = useState(JSON.parse(localStorage.getItem('shorts')) || false);

  const [moviesDataFiltered, setMoviesDataFiltered] = useState([]);
  const { width } = useWindowDimensions();

  const [cardsToShowOnInitCount, setToShowOnInitCount] = useState(0);
  const [cardsToShowCount, setcardsToShowCount] = useState(0);
  const [cardsCount, setcardsCount] = useState(cardsToShowCount);

  useEffect(() => {
    if (width > WIDTH_DESKTOP_MAX) {
      setcardsToShowCount(WIDTH_TABLET_LOADING_COUNT);
      setToShowOnInitCount(WIDTH_TABLET_INIT_COUNT);
    } else if (width > WIDTH_TABLET_MAX) {
      setcardsToShowCount(WIDTH_TABLET_LOADING_COUNT);
      setToShowOnInitCount(WIDTH_TABLET_INIT_COUNT);
    } else {
      setcardsToShowCount(WIDTH_MOBILE_LOADING_COUNT);
      setToShowOnInitCount(WIDTH_MOBILE_INIT_COUNT);
    }
  }, [width]);

  useEffect(() => {
    const filteredArray = Filter.query(checkbox, query, moviesData)
    renderCards(query, checkbox, filteredArray);
  }, [cardsToShowOnInitCount, moviesData, checkbox, query]);


  const moreCardsHandler = async () => {
    const toShow = (cardsCount + cardsToShowCount);
    const filteredArray = Filter.query(checkbox, query, moviesData)

    setcardsCount(toShow);
    setMoviesDataFiltered(filteredArray.slice(0, toShow));

    if (filteredArray.length < toShow) {
      setIsMoreActive(false);
    }
  }

  const handleChangeInput = async (event) => {
    event.preventDefault();

    const query = event.target.elements.query.value;
    const shorts = event.target.elements.shorts.checked;
    const moviesDataFiltered = Filter.query(shorts, query, moviesData);

    setIsLoading(true);
    setIsMoreActive(false);
    setQuery(query);

    renderCards(query, shorts, moviesDataFiltered)
  }

  const handleChangeCheckbox = async (event) => {
    const shortsState = event.target.checked;

    const filteredArray = Filter.query(shortsState, query, moviesData);

    setCheckbox(shortsState);
    renderCards(query, shortsState, filteredArray);
  }

  const renderCards = async (query, shorts, moviesList) => {
    try {
      if (cardsToShowOnInitCount !== 0) {
        if (query === '' && moviesList.length === 0) {
          setNoticeMessage(ENTER_A_QUERY);
        } else {
          setNoticeMessage('');
        }

        setcardsCount(cardsToShowOnInitCount);
        setMoviesDataFiltered(moviesList.slice(0, cardsToShowOnInitCount));

        localStorage.setItem("query", query);
        localStorage.setItem("shorts", shorts);

        if (moviesList.length > cardsToShowOnInitCount || moviesList.length === cardsToShowOnInitCount) {
          setIsMoreActive(true);
        } else {
          setIsMoreActive(false);
        }

        if (moviesList.length === 0) {
          setNoticeMessage(NOT_FOUND);
        }
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
          query={query}
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
            isSavedMovies={false}
            isMoreActive={isMoreActive}
            moreCardsHandler={moreCardsHandler}
            handleSaveMovie={handleSaveMovie}
          />
        )}
      </main>

      <Footer />
    </>
  );
};

export default Movies;