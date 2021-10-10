import React from "react";

function SearchForm({ handleSubmitSearchForm, handleSetValueInputSearchForm }) {

  return (
    <section className="SearchForm">

      <form onSubmit={handleSubmitSearchForm} onChange={handleSetValueInputSearchForm} className="search-form__form">
        <div className="search-form__input-button-box">
          <input className="search-form__input" placeholder="Фильм" required></input>
          <button className="search-form__button-search" type="submit"></button>
        </div>

        <div className="search-form__short-films">
          <label className="search-form__label">
            <input className="search-form__invisible-checkbox" type="checkbox" id="short-films"></input>
            <span className="search-form__visible-checkbox">
              <span className="search-form__switch"></span>
            </span>
            <span className="search-form__label-name">Короткометражки</span>
          </label>
        </div>

      </form>
    </section>
  )
}

export default SearchForm;