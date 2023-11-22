import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Alert from "../Alert/Alert";
import "../Auth/Auth.css";
import "./Login.css";
import Logo from "../../images/logo.svg";

import {
    SYMBOLS_MIN,
    EMAIL_NOT_VALID,
    FIELD_REQUIRED
} from "../../utils/Messages";

const Login = ({ setCurrentUser, setIsLoggedIn, handleSignIn, handleGetUserInfo }) => {
    const email = React.useRef();
    const password = React.useRef();
    const navigate = useNavigate();

    const [alert, setAlert] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

    const formSubmit = (values, event) => {
        event.preventDefault();
        setIsSubmitting(true);

        handleSignIn({ email: values.email, password: values.password }).then((data) => {
            setAlert({ isDisplay: true, message: data.message, type: 'success' });
            localStorage.setItem("jwt", data.token);
            setIsSubmitting(false);

            handleGetUserInfo().then((res) => {
                if (res) {
                    setCurrentUser({ name: res.name, email: res.email, _id: res._id, isAuthed: true });
                    setIsLoggedIn(true);
                    navigate('/movies');
                }
            }).catch((err) => {
                setAlert({ isDisplay: true, message: err.message, type: 'danger' });
                setIsSubmitting(false);
            });
        }).catch((err) => {
            setAlert({ isDisplay: true, message: err.message, type: 'danger' });
            setIsSubmitting(false);
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
                                required: FIELD_REQUIRED,
                                pattern: {
                                    value: /.+@[^@]+\.[^@]{2,}$/,
                                    message: EMAIL_NOT_VALID
                                }
                            })} required />
                            {errors.email && <label className="error-message">{errors.email.message}</label>}
                        </div>
                        <div className="input-box">
                            <label className="label">Пароль</label>
                            <input className={errors.password ? 'input error-input' : 'input'} ref={password} type="password" required
                                {...register("password", {
                                    required: FIELD_REQUIRED,
                                    minLength: {
                                        value: 6,
                                        message: SYMBOLS_MIN + ' 6'
                                    },
                                })} />
                            {errors.password && <label className="error-message">{errors.password.message}</label>}
                        </div>
                    </div>

                    <ul className="auth-footer auth-footer-signin">
                        <Alert alert={alert} />
                        <li>
                            <button className="auth-footer-register-button" disabled={isSubmitting || !isValid}>Войти</button>
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