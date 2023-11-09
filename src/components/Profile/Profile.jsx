import React from 'react';
import { NavLink } from "react-router-dom";

import Header from "../Header/Header";
import "./Profile.css";

const Profile = () => {
    return (
        <>
            <Header isAuthed={true} />

            <div className="profile">
                <h2 className="profile__title">Привет, Виталий!</h2>

                <div className="profile__info">
                    <div className="profile__info-container profile__info-bottom-line">
                        <div className="profile__info-label">Имя</div>
                        <div className="profile__info-label-content">Виталий</div>
                    </div>
                    <div className="profile__info-container">
                        <div className="profile__info-label">E-mail</div>
                        <div className="profile__info-label-content">pochta@yandex.ru</div>
                    </div>
                </div>
                
                    <ul className="profile__links">
                        <li>
                            <NavLink className="profile__link" to="/movies">Редактировать</NavLink>
                        </li>
                        <li>
                            <NavLink className="profile__link profile__link-signout" to="/saved-movies">Выйти из аккаунта</NavLink>
                        </li>
                    </ul>

            </div>
        </>
    );
};

export default Profile;