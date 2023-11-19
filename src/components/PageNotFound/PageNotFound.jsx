import React from 'react';
import "./PageNotFound.css";
import { NavLink, useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="not-found">
                <h1 className="not-found__header">404</h1>
                <span className="not-found__text">Страница не найдена</span>
                <NavLink className="not-found__footer" onClick={() => navigate(-1)}>Назад</NavLink>
            </div>
        </>
    );
};

export default PageNotFound;