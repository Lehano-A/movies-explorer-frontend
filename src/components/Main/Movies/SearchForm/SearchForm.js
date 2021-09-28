import React from "react";

function SearchForm() {

  return (
    <section className="SearchForm">
      <form className="search-form__form">
        <input className="search-form__input" placeholder="Фильм"></input>
        <button className="search-form__button-search" type="submit"></button>
      </form>

      <div className="search-form__short-films">
        <label className="search-form__label" >
          <input className="search-form__invisible-checkbox" type="checkbox" id="short-films"></input>
          <span className="search-form__visible-checkbox">
            <span className="search-form__switch"></span>
          </span>
          <span className="search-form__label-name">Короткометражки</span>
        </label>
      </div>
    </section>
  )

}

export default SearchForm;