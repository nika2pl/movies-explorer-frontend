import React from 'react';

import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = ({handleChangeInput, query, handleChangeCheckbox, checkbox}) => {
  return (
    <section className="search-form">
      <form onSubmit={handleChangeInput} id="form">
        <div className="search-form-container">
          <input className="search-form-input" name="query" defaultValue={query} placeholder="Фильм" required></input>
          <button className="search-form-button" type="submit"></button>
        </div>
        <FilterCheckbox handleChangeCheckbox={handleChangeCheckbox} checkbox={checkbox} />
      </form>
    </section>
  );
};

export default SearchForm;