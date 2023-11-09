import React from 'react';

import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__container">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>

                <div className="footer-links-container">
                    <div className="footer__copyright">© 2020</div>
                    <ul className="footer__links">
                        <li><a className="footer__link"  target="_blank" href="https://practicum.yandex.ru/">Яндекс.Практикум</a></li>
                        <li><a className="footer__link"  target="_blank" href="https://github.com/nika2pl">Github</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;