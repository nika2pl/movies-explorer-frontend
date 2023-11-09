import React from 'react';
import "./PageNotFound.css";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
    return (
        <>
            <div className="not-found">
                <h1 className="not-found__header">404</h1>
                <span className="not-found__text">Страница не найдена</span>
                <NavLink className="not-found__footer" to="/">На главную</NavLink>
            </div>
        </>
    );
};

export default PageNotFound;