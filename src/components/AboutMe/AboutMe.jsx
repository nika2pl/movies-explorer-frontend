import React from 'react';

import "./AboutMe.css";
import "../Title/Title.css";
import Portfolio from "../Portfolio/Portfolio";

const AboutMe = () => {
    return (
        <div className="about-me" id="student"> 
            <div className="about-me__container">
                <h2 className="title">Студент</h2>
                <div className="student-container">
                    <div className="student-info">
                        <h3 className="student-info-header">Никита</h3>
                        <h4 className="student-info-preheader">
                            Фронтенд-разработчик, 24 года
                        </h4>
                        <p className="student-info-text">
                        👋 Живу в Санкт-Петербурге. 🔥 Учусь в Яндекс Практикум. Интересуюсь околоайти тематикой.
                        </p>
                        <a className="student-info-footer-link" target="_blank" href="https://github.com/nika2pl">Github</a>
                    </div>
                    <div className="student-picture-container">
                        <div className="student-picture"></div>
                    </div>
                </div>
                <Portfolio />
            </div>
        </div>
    );
};

export default AboutMe;