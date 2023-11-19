import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import useWindowDimensions from '../../hooks/useWindowDimensions';
import MoviesApi from "../../utils/MoviesApi";
import Filter from "../../utils/MoviesFilter";

const Movies = ({ currentUser, isLoggedIn }) => {
  var beatFilmApi = new MoviesApi({
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreActive, setIsMoreActive] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState('Нужно ввести ключевое слово');
  const [moviesData, setMoviesData] = useState([]);
  const [moviesDataFetched, setMoviesDataFetched] = useState([]);
  const [filteredMoviesData, setFilteredMoviesData] = useState(JSON.parse(localStorage.getItem('filtered')) || []);
  const { width } = useWindowDimensions();

  const [cardsToShowOnInitCount, setToShowOnInitCount] = useState(0);
  const [cardsToShowCount, setcardsToShowCount] = useState(0);
  const [cardsCount, setcardsCount] = useState(cardsToShowCount);

  const [query, setQuery] = useState(localStorage.getItem('query') || '');
  const [checkbox, setCheckbox] = useState(JSON.parse(localStorage.getItem('shorts')) || false);

  useEffect(() => {
    if (width > 1280) {
      setcardsToShowCount(12);
      setToShowOnInitCount(12);
    } else if (width > 768) {
      setcardsToShowCount(8);
      setToShowOnInitCount(8);
    } else {
      setcardsToShowCount(2);
      setToShowOnInitCount(5);
    }

    setFilteredMoviesData(moviesData.slice(0, cardsToShowOnInitCount));
  }, [width]);

  useEffect(() => {
    const filtered = JSON.parse(localStorage.getItem('filtered'));

    beatFilmApi.getMovies().then((data) => {
      renderCards('', checkbox, data);

      setMoviesDataFetched(data);
      setMoviesData(data);

      if (filtered.length > 0) {
        renderCards(query, checkbox, filtered);
        setMoviesData(filtered);
      }
    }).catch((err) => {
      setNoticeMessage('Нет данных')
    })
  }, [cardsToShowOnInitCount]);

  const moreCardsHandler = async () => {
    const toShow = (cardsCount + cardsToShowCount);

    setcardsCount(toShow);
    setFilteredMoviesData(moviesData.slice(0, toShow));

    if (moviesData.length < toShow) {
      setIsMoreActive(false);
    }
  }

  const handleChangeInput = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsMoreActive(false);

    const movies = await beatFilmApi.getMovies();

    const query = event.target.elements.query.value;
    const shorts = event.target.elements.shorts.checked;

    let showMovies = Filter.query(shorts, query, movies);

    localStorage.setItem("filtered", JSON.stringify(showMovies));
    setQuery(query);
    setMoviesDataFetched(showMovies);
    renderCards(query, shorts, showMovies)
  }

  const handleCheckbox = async (event) => {
    const shortsState = event.target.checked;

    const filtered = Filter.shorts(shortsState, moviesDataFetched);

    localStorage.setItem("filtered", JSON.stringify(filtered));

    setCheckbox(shortsState);
    renderCards('', shortsState, filtered);
  }

  const renderCards = async (query, shorts, showMovies) => {
    try {
      if (cardsToShowOnInitCount !== 0) {
        if (query === '' && showMovies.length === 0) {
          setNoticeMessage('Введите свой запрос');
        } else {
          setNoticeMessage('');
        }

        setIsLoading(false);
        setcardsCount(cardsToShowOnInitCount);
        setMoviesData(showMovies);
        setFilteredMoviesData(showMovies.slice(0, cardsToShowOnInitCount));

        localStorage.setItem("query", query);
        localStorage.setItem("shorts", shorts);

        if (showMovies.length > cardsToShowOnInitCount || showMovies.length == cardsToShowOnInitCount) {
          setIsMoreActive(true);
        }else{
          setIsMoreActive(false);
        }

        if (showMovies.length === 0) {
          setNoticeMessage('Ничего не найдено');
        }
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
          query={query}
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
            isSavedMovies={false}
            isMoreActive={isMoreActive}
            moreCardsHandler={moreCardsHandler}
          />
        )}
      </main>

      <Footer />
    </>
  );
};

export default Movies;