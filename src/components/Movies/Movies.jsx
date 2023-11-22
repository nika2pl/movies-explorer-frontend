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
  WIDTH_TABLET_MAX,
  CARDS_DESKTOP_INIT_COUNT,
  CARDS_DESKTOP_LOADING_COUNT,
  CARDS_TABLET_INIT_COUNT,
  CARDS_TABLET_LOADING_COUNT,
  CARDS_MOBILE_INIT_COUNT,
  CARDS_MOBILE_LOADING_COUNT
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

  const [onInitCardsCount, setOnInitCardsCount] = useState(0);
  const [moreCardsCount, setMoreCardsCount] = useState(0);
  const [cardsCount, setCardsCount] = useState(moreCardsCount);

  useEffect(() => {
    if (width > WIDTH_DESKTOP_MAX) {
      setMoreCardsCount(CARDS_DESKTOP_LOADING_COUNT);
      setOnInitCardsCount(CARDS_DESKTOP_INIT_COUNT);
    } else if (width > WIDTH_TABLET_MAX) {
      setMoreCardsCount(CARDS_TABLET_LOADING_COUNT);
      setOnInitCardsCount(CARDS_TABLET_INIT_COUNT);
    } else {
      setMoreCardsCount(CARDS_MOBILE_LOADING_COUNT);
      setOnInitCardsCount(CARDS_MOBILE_INIT_COUNT);
    }
  }, [width]);

  useEffect(() => {
    const filteredArray = Filter.query(checkbox, query, moviesData);

    renderCards(query, checkbox, filteredArray);
  }, [onInitCardsCount, moviesData, checkbox, query]);


  const moreCardsHandler = async () => {
    const totalCards = (cardsCount + moreCardsCount);
    const filteredArray = Filter.query(checkbox, query, moviesData)

    setCardsCount(totalCards);
    setMoviesDataFiltered(filteredArray.slice(0, totalCards));

    if (filteredArray.length < totalCards) {
      setIsMoreActive(false);
    }
  }

  const handleChangeInput = async (event) => {
    event.preventDefault();

    const query = event.target.elements.query.value;
    const shorts = event.target.elements.shorts.checked;
    const moviesDataFiltered = Filter.query(shorts, query, moviesData);

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
      if (onInitCardsCount !== 0) {
        let counted;
        const totalCards = (cardsCount + moreCardsCount);

        if (query === '' && moviesList.length === 0) {
          setNoticeMessage(ENTER_A_QUERY);
        } else if (moviesList.length === 0) {
          setNoticeMessage(NOT_FOUND);
        } else {
          setNoticeMessage('');
        }

        if (!isMoreActive) {
          counted = onInitCardsCount;
        } else {
          counted = cardsCount;
        }
    
        setCardsCount(totalCards);
        setMoviesDataFiltered(moviesList.slice(0, counted));

        localStorage.setItem("query", query);
        localStorage.setItem("shorts", shorts);

        if (moviesList.length > onInitCardsCount || moviesList.length === onInitCardsCount) {
          setIsMoreActive(true);
        } else {
          setIsMoreActive(false);
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