import React from 'react';

import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
  return (
    <section className="search-form">
      <form>
        <div className="search-form-container">
          <input className="search-form-input" placeholder="Фильм" required></input>
          <button className="search-form-button"></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
};

export default SearchForm;