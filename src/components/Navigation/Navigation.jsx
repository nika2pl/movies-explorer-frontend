import React from 'react';
import "./Navigation.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="navigation">
            <ul className="header__links">
                <li>
                    <NavLink className="header__link" to="/movies">Фильмы</NavLink>
                </li>
                <li>
                    <NavLink className="header__link" to="/saved-movies">Сохранённые фильмы</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Navigation;