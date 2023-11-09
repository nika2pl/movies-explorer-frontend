import React from 'react';

import "./FilterCheckbox.css";

const FilterCheckbox = () => {
    return (
        <div className="checkbox-container">
            <label className="switch">
                <input className="checkbox-input" type="checkbox" />
                <span className="slider round"></span>
            </label>
            <span className="checkbox-text">Короткометражки</span>
        </div>
    );
};

export default FilterCheckbox;