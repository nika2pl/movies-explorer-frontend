import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

import Api from '../../utils/MainApi'
import Alert from "../Alert/Alert";

import "../Auth/Auth.css";
import "./Login.css";
import Logo from "../../images/logo.svg";

const Login = (props) => {
    const api = new Api({
        baseUrl: 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const { setCurrentUser, setIsLoggedIn } = props;

    const email = React.useRef();
    const password = React.useRef();
    const navigate = useNavigate();

    const [alert, setAlert] = useState({});

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

    const formSubmit = (values, event) => {
        event.preventDefault();
        api.signin({
            email: values.email,
            password: values.password
        }).then((data) => {
            console.log(data)

            setAlert({ isDisplay: true, message: 'Вход выполнен', type: 'success' });
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
    }

    return (
        <>
            <section className="auth">
                <NavLink to="/"><img src={Logo} alt="На главную" /></NavLink>
                <h1 className="auth__header">Рады видеть!</h1>

                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="input-list">
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
                            <button className="auth-footer-register-button" disabled={!isValid}>Войти</button>
                        </li>
                        <li className="auth-footer-text-muted">
                            Еще не зарегистрированы? <NavLink className="footer-signin" to="/signup">Регистрация</NavLink>
                        </li>
                    </ul>
                </form>
            </section>
        </>
    );
};

export default Login;