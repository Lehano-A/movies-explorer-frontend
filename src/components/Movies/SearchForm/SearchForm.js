import React, { useState } from "react";

function SearchForm({
  isFilterShortMovies,
  isPreloaderActive,
  handleValueInputSearchForm,
  handleSetSubmitSearchFormActive,
  handleSetIsFilterShortMovies,
}) {

  const [timer, setTimer] = useState(false); // ТАЙМЕР НА КНОПКУ СОХРАНЕНИЯ ФИЛЬМА

  let valueInput = React.createRef();

  // ВКЛЮЧИЛИ ТАЙМЕР
  function handleSetTimerActive() {
    setTimer(true)
  }


  // САБМИТ ФОРМЫ ПОИСКА ФИЛЬМА + ЗНАЧЕНИЕ ПОЛЯ ВВОДА
  function handleSubmitSearchForm(e) {
    e.preventDefault();
    localStorage.setItem('pressedSubmit', true)
    if (!timer) {
      handleSetTimerActive() // ВКЛЮЧИЛИ ТАЙМЕР
      setTimeout(setTimer, 1000, false);
      handleSetSubmitSearchFormActive(); // САБМИТ - АКТИВНО
      handleValueInputSearchForm(valueInput.current.value)
    }
  }










  return (
    <section className="SearchForm">

      <form className="search-form__form" onSubmit={handleSubmitSearchForm}>
        <div className="search-form__input-button-box">
          <input className="search-form__input" ref={valueInput} placeholder="Фильм" required></input>
          <button className="search-form__button-search" disabled={isPreloaderActive && true} type="submit"></button>
        </div>

        <div className="search-form__short-films">
          <label className="search-form__label">
            <input className={`search-form__invisible-checkbox ${isFilterShortMovies && 'search-form__visible-checkbox_active'}`}
              type="checkbox" id="shortFilms" onChange={handleSetIsFilterShortMovies}></input>
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