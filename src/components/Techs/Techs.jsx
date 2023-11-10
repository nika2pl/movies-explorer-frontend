import React from 'react';

import "./Techs.css";
import "../Title/Title.css";

const Techs = () => {
    return (
        <section className="techs" id="techs">
            <div className="techs__container">
                <h2 className="title">Технологии</h2>
                <div className="techs-info">
                    <h2 className="techs-info__title">7 технологий</h2>
                    <p className="techs-info__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                </div>

                <div className="navtab-techs">
                    <ul className="navtab-links">
                        <li className="navtab-techs-link-container navtab-techs__link">
                            HTML
                        </li>
                        <li className="navtab-techs-link-container navtab-techs__link">
                            CSS
                        </li>
                        <li className="navtab-techs-link-container navtab-techs__link">
                            JS
                        </li>
                        <li className="navtab-techs-link-container navtab-techs__link">
                            React
                        </li>
                        <li className="navtab-techs-link-container navtab-techs__link">
                            Git
                        </li>
                        <li className="navtab-techs-link-container navtab-techs__link">
                            Express.js
                        </li>
                        <li className="navtab-techs-link-container navtab-techs__link">
                            mongoDB
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Techs;