import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from 'react-hook-form';

import "../Auth/Auth.css";
import "../Input/Input.css";
import "./Register.css";

import Logo from "../../images/logo.svg";

import Api from '../../utils/MainApi'
import Alert from "../Alert/Alert";

const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
});

const Register = (props) => {
    const name = React.useRef();
    const email = React.useRef();
    const password = React.useRef();

    const [alert, setAlert] = useState({});
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

    const { setCurrentUser, setIsLoggedIn } = props;

    const formSubmit = (values, event) => {
        event.preventDefault();
        api.signup({
            name: values.name,
            email: values.email,
            password: values.password
        }).then((data) => {
            setAlert({ isDisplay: true, message: 'Регистрация прошла успешно', type: 'success' });

            api.signin({
                email: values.email,
                password: values.password
            }).then((data) => {
                localStorage.setItem("jwt", data.token);
    
                api.checkToken().then((res) => {
                    if (res) {
                        setCurrentUser({ name: res.name, email: res.email, _id: res._id, isAuthed: true });
                        setIsLoggedIn(true);
                        navigate('/movies');
                    }
                }).catch((err) => {
                    console.log(err)
                });
            }).catch((err) => {
                setAlert({ isDisplay: true, message: err.message || 'Произошла ошибка при регистрации', type: 'danger' });
            })
        }).catch((err) => {
            setAlert({ isDisplay: true, message: err.message || 'Произошла ошибка при регистрации', type: 'danger' });
        })
    }

    return (
        <>
            <section className="auth">
                <NavLink to="/"><img src={Logo} alt="На главную" /></NavLink>
                <h1 className="auth__header">Рады видеть!</h1>

                <form onSubmit={handleSubmit(formSubmit)}>
                <div className="input-list">
                        <div className="input-box"> 
                            <label className="label">Имя</label>
                            <input className={errors.name ? 'input error-input' : 'input'} type="text" ref={name} {...register("name", {
                                required: "Введите имя",
                                minLength: {
                                    value: 2,
                                    message: "Минимум симвлолов 2"
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
                            <input type="text" ref={email} className={errors.email ? 'input error-input' : 'input'} {...register("email", {
                                required: "Заполните поле email",
                                pattern: {
                                    value: /.+@[^@]+\.[^@]{2,}$/,
                                    message: "Невалидный email"
                                }
                            })} required />
                            {errors.email && <label className="error-message">{errors.email.message}</label>}

                        </div>
                        <div className="input-box">
                            <label className="label">Пароль</label>
                            <input className={errors.password ? 'input error-input' : 'input'} ref={password} type="password" required
                                {...register("password", {
                                    required: "Введите пароль",
                                    minLength: {
                                        value: 6,
                                        message: "Минимум симвлолов 6"
                                    },
                                })} />
                            {errors.password && <label className="error-message">{errors.password.message}</label>}
                        </div>
                    </div>

                    <ul className="auth-footer auth-footer-signin">
                        <Alert alert={alert} />
                        <li>
                            <button className="auth-footer-register-button" disabled={!isValid}>Зарегистрироватся</button>
                        </li>
                        <li className="auth-footer-text-muted">
                        Уже зарегистрированы? <NavLink className="footer-signin" to="/signin">Войти</NavLink>
                        </li>
                    </ul>
                </form>
            </section>
        </>
    );
};

export default Register;