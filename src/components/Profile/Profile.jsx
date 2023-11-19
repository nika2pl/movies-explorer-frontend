import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Api from '../../utils/MainApi'
import Alert from "../Alert/Alert";

import Header from "../Header/Header";
import "./Profile.css";

const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

const Profile = (props) => {
    const { currentUser, isLoggedIn, resetLocalStorage } = props;

    const navigate = useNavigate();

    const [isEditProfileActive, setIsEditProfileActive] = React.useState(false);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
    const [alert, setAlert] = useState({});

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);

    useEffect(() => {
        setName(currentUser.name)
        setEmail(currentUser.email)
    }, [currentUser]);


    const formSubmit = (values, event) => {
        event.preventDefault();
        setName(values.name)
        setEmail(values.email)

        api.editProfile({
            name: values.name,
            email: values.email
        }).then((data) => {
            setAlert({ isDisplay: true, message: 'Изменения приняты', type: 'success' });
        }).catch((err) => {
            setAlert({ isDisplay: true, message: err.message || 'Произошла ошибка при изменении данных', type: 'danger' });
        })
    }

    function handleEditProfile() {
        if (isEditProfileActive) {
            setIsEditProfileActive(false)
        } else {
            setIsEditProfileActive(true);
        }
    }

    function handleSignOut() {
        resetLocalStorage();
        navigate('/signin');
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />

            <section className="profile">
                <h2 className="profile__title">Привет, {name}!</h2>

                <div className={!isEditProfileActive ? "profile__info" : "profile__info-hide"}>
                    <div className="profile__info-container profile__info-bottom-line">
                        <div className="profile__info-label">Имя</div>
                        <div className="profile__info-label-content">{name}</div>
                    </div>
                    <div className="profile__info-container">
                        <div className="profile__info-label">E-mail</div>
                        <div className="profile__info-label-content">{email}</div>
                    </div>
                </div>

                <div className={isEditProfileActive ? "profile__info" : "profile__info-hide"}>
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <div className="input-list">
                            <div className="input-box">
                                <label className="label">Имя</label>
                                <input placeholder={name} className={errors.name ? 'input error-input' : 'input'} type="text" {...register("name", {
                                    required: "Введите имя",
                                    minLength: {
                                        value: 2,
                                        message: "Минимум символов 2"
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "Максимум символов 30"
                                    },
                                    pattern: {
                                        value: /^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\-\s]*$/,
                                        message: "Недопустимые символы"
                                    }
                                })}
                                    required />
                                {errors.name && <label className="error-message">{errors.name.message}</label>}
                            </div>

                            <div className="input-box">
                                <label className="label">E-mail</label>
                                <input placeholder={email} type="text" className={errors.email ? 'input error-input' : 'input'} {...register("email", {
                                    required: "Заполните поле email",
                                    pattern: {
                                        value: /.+@[^@]+\.[^@]{2,}$/,
                                        message: "Невалидный email"
                                    }
                                })} required />
                                {errors.email && <label className="error-message">{errors.email.message}</label>}
                            </div>

                        </div>

                        <ul className="auth-footer auth-footer-signin">
                            <Alert alert={alert} />
                            <li>
                                <button className="auth-footer-register-button" disabled={!isValid}>Сохранить изменения</button>
                            </li>
                        </ul>
                    </form>
                </div>

                <ul className="profile__links">
                    <li>
                        <button className="profile__link profile__edit-button" onClick={handleEditProfile}>Редактировать</button>
                    </li>
                    <li>
                        <button className="profile__link profile__edit-button profile__link-signout" onClick={handleSignOut}>Выйти из аккаунта</button>
                    </li>
                </ul>

            </section >
        </>
    );
};

export default Profile;