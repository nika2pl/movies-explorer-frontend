import React from 'react';
import { NavLink } from "react-router-dom";

import "../Auth/Auth.css";
import "./Login.css";
import Logo from "../../images/logo.svg";

const Login = () => {
    return (
        <>
            <section className="auth">
                <NavLink to="/"><img src={Logo} alt="На главную" /></NavLink>
                <h1 className="auth__header">Рады видеть!</h1>

                <form>
                    <div className="auth__input-list">
                        <div className="auth__input-box">
                            <label className="auth__label">E-mail</label>
                            <input className="auth__input" type="text" required />
                        </div>
                        <div className="auth__input-box">
                            <label className="auth__label">Пароль</label>
                            <input className="auth__input" type="password" required />
                            <label className="auth__error-message"></label>
                        </div>
                    </div>

                    <ul className="auth__footer auth__footer-signin">
                        <li>
                            <NavLink className="auth__footer-register-button" to="/signup">Войти</NavLink>
                        </li>
                        <li className="auth__footer-text-muted">
                            Еще не зарегистрированы? <NavLink className="footer-signin" to="/signup">Регистрация</NavLink>
                        </li>
                    </ul>
                </form>
            </section>
        </>
    );
};

export default Login;