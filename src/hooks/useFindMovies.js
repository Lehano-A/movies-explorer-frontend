import { MAX_DURATION_SHORT_MOVIES } from "../utils/constants/constants"


function useFindMovies({
  boxMoviesForSearch,
  isActiveFilterShortMovies,
  setFoundMoviesByValue,
  setTotalAllCardsDisplayed = null,
}) {


  // ОБРАБОТАТЬ ПОИСК ФИЛЬМОВ
  function handleSearchMovies(searchValue) {
    const regexWithSearchValue = new RegExp(searchValue.trim(), 'i')

    if (setTotalAllCardsDisplayed) { // ЕСЛИ ПЕРЕДАЁТСЯ setTotalAllCardsDisplayed (НАПРИМЕР, ИЗ SAVED-MOVIES НЕ ПЕРЕДАЁТСЯ)
      setTotalAllCardsDisplayed(null)
    }

    if (!isActiveFilterShortMovies) { // ЕСЛИ ИЩЕТСЯ "ПУСТАЯ СТРОКА"
      handleSearchInAllMovies(boxMoviesForSearch.all, regexWithSearchValue)
      return
    }

    if (isActiveFilterShortMovies) {
      handleSearchInShortMovies(boxMoviesForSearch.all, regexWithSearchValue)
      return
    }
  }



  // ОБРАБОТАТЬ ПОИСК ВО ВСЕХ ФИЛЬМАХ
  function handleSearchInAllMovies(boxMoviesForSearch, regexWithSearchValue) {

    const { all, shorts } = sortMovies(boxMoviesForSearch, regexWithSearchValue)
    setFoundMoviesByValue({ all, shorts })
  }



  // ОБРАБОТАТЬ ПОИСК В КОРОТКОМЕТРАЖКАХ
  function handleSearchInShortMovies(boxMoviesForSearch, regexWithSearchValue) {

    const { all, shorts } = sortMovies(boxMoviesForSearch, regexWithSearchValue)
    setFoundMoviesByValue({ all, shorts })
  }



  /*
    ОТСОРТИРОВАТЬ ФИЛЬМЫ (ВСЕ И КОРОТКОМЕТРАЖКИ)
    ЕСЛИ ПЕРЕДАЁТСЯ РЕГУЛЯРНОЕ ВЫРАЖЕНИЕ, ТОГДА БУДЕТ ИСКАТЬ С ЕГО УЧЁТОМ
  */
  function sortMovies(boxMoviesForSearch, regexWithSearchValue) {

    const all = []
    const shorts = []

    if (!regexWithSearchValue) {
      boxMoviesForSearch.forEach((movie) => {
        all.push(movie)

        if (movie.duration <= MAX_DURATION_SHORT_MOVIES) {
          shorts.push(movie)
        }
      })
    }


    if (regexWithSearchValue) {
      boxMoviesForSearch.forEach((movie) => {
        if (regexWithSearchValue.test(movie.nameRU)) {
          all.push(movie)

          if (movie.duration <= MAX_DURATION_SHORT_MOVIES) {
            shorts.push(movie)
          }
        }
      })
    }

    return { all, shorts }
  }



  return {
    handleSearchMovies,
    sortMovies,
  }
}

export default useFindMovies