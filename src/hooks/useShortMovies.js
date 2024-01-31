function useShortMovies({ isActiveFilterShortMovies, boxMovies, sliceCards, showCards, foundMoviesByValue, setMainBoxForDisplay }) {


  // ОБРАБОТАТЬ КОРОТКОМЕТРАЖКИ (ПЕРЕД ПОИСКОМ)
  function handleShortMoviesBeforeSearch() {
    if (isActiveFilterShortMovies) {

      const slicedCards = sliceCards(boxMovies.shorts)
      return showCards(slicedCards, setMainBoxForDisplay)
    }
  }


  // ОБРАБОТАТЬ КОРОТКОМЕТРАЖКИ (ПОСЛЕ ПОИСКА)
  function handleShortMoviesAfterSearch() {

    if (isActiveFilterShortMovies) {
      const slicedCards = sliceCards(foundMoviesByValue.shorts)
      return showCards(slicedCards, setMainBoxForDisplay)
    }
  }


  return {
    handleShortMoviesBeforeSearch,
    handleShortMoviesAfterSearch,
  }
}

export default useShortMovies