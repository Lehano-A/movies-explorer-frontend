import React, { useEffect, useState } from "react";


function SearchForm({
  isActivePreloader,
  isActiveFilterShortMovies,
  switchFilterShortMovies,
  handleSearchMovies,
}) {

  const [timerNextUse, setTimerNextUse] = useState(null); // ТАЙМЕР СЛЕДУЮЩЕГО ВОЗМОЖНОГО ИСПОЛЬЗОВАНИЯ САБМИТА
  const [isDisabledFilterShortMovies, setIsDisabledFilterShortMovies] = useState(null)

  let valueInput = React.createRef();


  useEffect(() => {

    return () => {
      setTimerNextUse(null)
      setIsDisabledFilterShortMovies(null)
    }
  }, [])



  // ОБРАБОТАТЬ ИЗМЕНЕНИЕ ФИЛЬТРА "КОРОТКОМЕТРАЖЕК"
  function handleChangeFilterShortMovies() {
    switchFilterShortMovies()

    setIsDisabledFilterShortMovies(true)
    setTimeout(setIsDisabledFilterShortMovies, 1000, false)
  }



  // ВКЛЮЧИЛИ ТАЙМЕР
  function handleSetTimerActive() {
    setTimerNextUse(true);
  }



  // САБМИТ ФОРМЫ ПОИСКА ФИЛЬМА + ЗНАЧЕНИЕ ПОЛЯ ВВОДА
  function handleSubmitSearchForm(e) {
    e.preventDefault();

    if (!timerNextUse) {
      handleSetTimerActive(); // ВКЛЮЧИЛИ ТАЙМЕР
      setTimeout(setTimerNextUse, 100, false);

      handleSearchMovies(valueInput.current.value)
    }
  }


  return (
    <section className="search-form">

      <form className="search-form__form" onSubmit={handleSubmitSearchForm}>
        <div className="search-form__input-button-box">
          <input
            className="search-form__input"
            ref={valueInput}
            placeholder="Фильм">
          </input>

          <button
            className="search-form__button-search"
            disabled={isActivePreloader && true}
            type="submit">
          </button>
        </div>


        <div className="search-form__short-films">
          <label className="search-form__label">

            <input
              className={`search-form__invisible-checkbox ${isActiveFilterShortMovies ? 'search-form__visible-checkbox_active' : ''}`}
              id="shortFilms"
              type="checkbox"
              disabled={isDisabledFilterShortMovies && true}
              onChange={handleChangeFilterShortMovies}>
            </input>

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