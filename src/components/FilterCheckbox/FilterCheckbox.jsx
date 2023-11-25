import React from 'react';

import "./FilterCheckbox.css";

const FilterCheckbox = ({handleChangeCheckbox, checkbox}) => {
    return (
        <div className="checkbox-container">
            <label className="switch">
                <input className="checkbox-input" type="checkbox" name="shorts" defaultChecked={checkbox} onClick={handleChangeCheckbox}/>
                <span className="slider round"></span>
            </label>
            <span className="checkbox-text">Короткометражки</span>
        </div>
    );
};

export default FilterCheckbox;