import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from 'react-router-dom';

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

import Api from '../../utils/MainApi';
import MoviesApi from "../../utils/MoviesApi";
import "./App.css";

import {
  OK_AUTHED,
  OK_CHANGED,
  OK_REGISTERED,
  ERROR_PROCESSING_DATA
} from "../../utils/Messages";

function App() {
  const api = new Api();
  const beatFilmApi = new MoviesApi();

  const jwt = localStorage.getItem('jwt') || '';
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
  const [isLoggedIn, setIsLoggedIn] = React.useState(jwt.length > 0 ? true : false);
  const [isLoading, setIsLoading] = useState(true);

  const [moviesData, setMoviesData] = React.useState([]);
  const [savedMoviesData, setSavedMoviesData] = React.useState([]);

  const handleLogout = () => {
    localStorage.setItem("jwt", '');
    localStorage.setItem("query", '');
    localStorage.setItem("shorts", false);
    setIsLoggedIn(false); 
  }

  useEffect(() => {
    if (jwt) {
      Promise.all([api.getUserInfo(), beatFilmApi.getMovies()])
        .then(([userInfo, movies]) => {
          setIsLoggedIn(true);
          setCurrentUser({ name: userInfo.name, email: userInfo.email });
          setMoviesData(movies);
          
          api.getMovies().then((data) => {
            setSavedMoviesData(data);
          }).catch((err) => {
            console.log(err)
          })
        }).catch((error) => {
          setIsLoggedIn(false);
          handleLogout();
        }).finally(function () {
          setIsLoading(false);
        })
    }
  }, [jwt]);

  useEffect(() => {
    const filteredArray = moviesData.map(item => {
      item.isSaved = savedMoviesData.some((movie) => parseInt(movie.movieId) === item.id);
      if (item.isSaved) {
        item.savedId = savedMoviesData.filter((movie) => parseInt(movie.movieId) === item.id)[0]._id;
      }

      return item;
    });

    setMoviesData(filteredArray);
  }, [savedMoviesData]);

  const handleSaveMovie = (event) => {
    const isSaved = event.target.dataset.issaved;
    const savedId = event.target.dataset.savedid;

    if (isSaved === '0') {
      const movieData = JSON.parse(event.target.dataset.moviedata);

      api.saveMovie(movieData).then((data) => {
        setSavedMoviesData(prev => [...prev, data]);
      }).catch((err) => {
        console.log(err)
      })
    } else {
      var filteredArray = savedMoviesData.filter(function (movie) {
        return movie._id !== savedId
      })

      api.deleteMovie(savedId).then(() => {
        setSavedMoviesData(filteredArray);
      }).catch((err) => {
        console.log(err)
      })
    }
  };

  const handleUpdateProfile = (data) => {
    return api.editProfile(data).then((data) => {
      return Promise.resolve(OK_CHANGED);
    }).catch((err) => {
      return Promise.reject({ message: err.message || ERROR_PROCESSING_DATA });
    })
  }

  const handleSignIn = (data) => {
    return api.signIn(data).then((data) => {
      return Promise.resolve({ message: OK_AUTHED, token: data.token });
    }).catch((err) => {
      return Promise.reject({ message: err.message || ERROR_PROCESSING_DATA });
    })
  }

  const handleSignUp = (data) => {
    return api.signUp(data).then((data) => {
      return Promise.resolve({ message: OK_REGISTERED });
    }).catch((err) => {
      return Promise.reject({ message: err.message || ERROR_PROCESSING_DATA });
    })
  }

  const handleGetUserInfo = () => {
    return api.getUserInfo().then((response) => {
      return Promise.resolve(response);
    }).catch((err) => {
      return Promise.reject({ message: err.message || ERROR_PROCESSING_DATA });
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
          <Route path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn}
                moviesData={moviesData}
                handleSaveMovie={handleSaveMovie}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                savedMoviesData={savedMoviesData}
                handleSaveMovie={handleSaveMovie}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                handleLogout={handleLogout}
                handleUpdateProfile={handleUpdateProfile}
              />
            }
          />
          <Route path="/signin" element={
            isLoggedIn ? <Navigate to="/" replace /> :
              <Login
                setCurrentUser={setCurrentUser}
                setIsLoggedIn={setIsLoggedIn}
                handleSignIn={handleSignIn}
                handleGetUserInfo={handleGetUserInfo}
              />
          } />
          <Route path="/signup" element={
            isLoggedIn ? <Navigate to="/" replace /> :
              <Register
                setCurrentUser={setCurrentUser}
                setIsLoggedIn={setIsLoggedIn}
                handleSignIn={handleSignIn}
                handleSignUp={handleSignUp}
                handleGetUserInfo={handleGetUserInfo}
              />
          } />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;