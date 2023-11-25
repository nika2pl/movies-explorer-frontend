import React from 'react';

import "./Portfolio.css";

const Portfolio = () => {
    return (
        <div className="portfolio-container">
            <h5 className="portfolio-header">Портфолио</h5>

            <ul className="portfolio-links">
                <li className="portfolio-link portfolio-link-margin-top-off">
                    <a target="_blank" href="https://nika2pl.github.io/mesto/">Проект Mesto</a>
                </li>
                <li className="portfolio-link">
                    <a target="_blank" href="https://nika2pl.github.io/russian-travel/">Проект Путешествия по России</a>
                </li>
                <li className="portfolio-link portfolio-link-bottom-border-off">
                    <a target="_blank" href="https://github.com/nika2pl/how-to-learn">Проект Научиться учиться</a>
                </li>
            </ul>
        </div>
    );
};

export default Portfolio;