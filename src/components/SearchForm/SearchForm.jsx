import React from 'react';

import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return (
    <div className="search-form">
      <div className="search-form-container">
        <input className="search-form-input" placeholder="Фильм" checked></input>
        <button className="search-form-button"></button>
      </div>
      <FilterCheckbox />
    </div>
  );
};

export default SearchForm;