import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Api from '../../utils/MainApi'
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';

import "./App.css";
const api = new Api();

function App() {
  const jwt = localStorage.getItem('jwt') || '';
  let isLoggedInDefault = false;

  if(jwt.length > 0){
    isLoggedInDefault = true;
  }

  const [currentUser, setCurrentUser] = React.useState({ name: '', email: ''});
  const [isLoggedIn, setIsLoggedIn] = React.useState(isLoggedInDefault);

  const resetLocalStorage = () => {
    localStorage.setItem("jwt", '');
    localStorage.setItem("query", '');
    localStorage.setItem("shorts", false);
    localStorage.setItem("filtered", false);
  }

  useEffect(() => {
    if (jwt) {
      api.checkToken().then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser({ name: res.name, email: res.email });
        }
      }).catch((err) => {
        setIsLoggedIn(false);
        resetLocalStorage();
      });
    }
  }, []);

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
              />
            }
          />
          <Route path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                resetLocalStorage={resetLocalStorage}
              />
            }
          />
          <Route path="/signin" element={<Login setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Register setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;