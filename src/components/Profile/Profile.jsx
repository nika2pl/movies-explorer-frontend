import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Alert from "../Alert/Alert";

import Header from "../Header/Header";
import "./Profile.css";

import {
    SYMBOLS_MIN,
    SYMBOLS_MAX,
    EMAIL_NOT_VALID,
    SYMBOLS_NOT_ALLOWED
} from "../../utils/Messages";

const Profile = (props) => {
    const { currentUser, isLoggedIn, handleLogout, handleUpdateProfile } = props;

    const navigate = useNavigate();

    const [isEditProfileActive, setIsEditProfileActive] = React.useState(false);
    const { reset, register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({ mode: 'onChange' });
    const [noticeMessage, setNoticeMessage] = useState({});

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [isSubmitting, setIsSubmitting] = useState(false);

    let defaultValues = {};

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    useEffect(() => {
        defaultValues.name = name;
        defaultValues.email = email;
        reset({ ...defaultValues });
    }, [name, email]);


    const formSubmit = async (values, event) => {
        event.preventDefault();
        setIsSubmitting(true);

        handleUpdateProfile({ name: values.name, email: values.email }).then((res) => {
            setName(values.name);
            setEmail(values.email);
            setNoticeMessage({ isDisplay: true, message: res.message, type: 'success' });
            setIsSubmitting(false);
        }).catch((err) => {
            setNoticeMessage({ isDisplay: true, message: err.message, type: 'danger' });
            setIsSubmitting(false)
        })
    }

    function handleEditProfile() {
        if (isEditProfileActive) {
            setIsEditProfileActive(false)
        } else {
            setIsEditProfileActive(true);
        }
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
                                <input className={errors.name ? 'input error-input' : 'input'} type="text" {...register("name", {
                                    minLength: {
                                        value: 2,
                                        message: SYMBOLS_MIN + " 2"
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: SYMBOLS_MAX + " 30"
                                    },
                                    pattern: {
                                        value: /^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\-\s]*$/,
                                        message: SYMBOLS_NOT_ALLOWED
                                    }
                                })}
                                />
                                {errors.name && <label className="error-message">{errors.name.message}</label>}
                            </div>

                            <div className="input-box">
                                <label className="label">E-mail</label>
                                <input type="text" className={errors.email ? 'input error-input' : 'input'} {...register("email", {
                                    pattern: {
                                        value: /.+@[^@]+\.[^@]{2,}$/,
                                        message: EMAIL_NOT_VALID
                                    }
                                })} />
                                {errors.email && <label className="error-message">{errors.email.message}</label>}
                            </div>

                        </div>

                        <ul className="auth-footer auth-footer-signin">
                            <Alert alert={noticeMessage} />
                            <li>
                                <button className="auth-footer-register-button" disabled={isSubmitting || !isDirty || !isValid} >Сохранить изменения</button>
                            </li>
                        </ul>
                    </form>
                </div>

                <ul className="profile__links">
                    <li>
                        <button className="profile__link profile__edit-button" onClick={handleEditProfile}>Редактировать</button>
                    </li>
                    <li>
                        <button className="profile__link profile__edit-button profile__link-signout" onClick={() => { handleLogout(); navigate('/signin'); }}>Выйти из аккаунта</button>
                    </li>
                </ul>

            </section >
        </>
    );
};

export default Profile;