import { NavLink } from "react-router-dom";
import React from 'react';

import "./Header.css";
import Logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import Dropdown from "../Dropdown/Dropdown";

const Header = ({isLoggedIn}) => {
  return (
    <header className="header">
      <div className="header__container">

        <div className="header__logo-container">
          <NavLink to="/"><img src={Logo} alt="Movies Exlporer" /></NavLink>
        </div>

        {isLoggedIn ?
          <>
            <div className="header__authed">
              <Navigation />
              <div className="header__auth-container">
                <ul className="header__auth-links">
                  <li>
                    <NavLink className="header__link header__link_account" to="/profile">Аккаунт</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <Dropdown />
          </>
          :
          <>
            <div className="header__auth-container">
              <ul className="header__links header__links_auth">
                <li>
                  <NavLink className="header__link header__link_signup" to="/signup">Регистрация</NavLink>
                </li>
                <li>
                  <NavLink className="header__link header__link_signin" to="/signin">Войти</NavLink>
                </li>
              </ul>
            </div>
          </>
        }
      </div>
    </header>
  );
};

export default Header;