function useFilterShortMovies({
  isActiveFilterShortMovies,
  boxMovies,
  foundMoviesByValue,
  sliceTo,
  setMainBoxForDisplay,
  sliceCards,
  showCards,
  setIsActiveFilterShortMovies,
}) {


  // ПЕРЕКЛЮЧИТЬ ФИЛЬТР КОРОТКОМЕТРАЖЕК
  function switchFilterShortMovies() {
    setIsActiveFilterShortMovies(prevState => !prevState)
  }



  // ОБРАБОТАТЬ ПЕРЕКЛЮЧЕНИЕ ФИЛЬТРА КОРОТКОМЕТРАЖЕК
  function handleSwitchFilterShortMovies() {
    if (boxMovies.all && !foundMoviesByValue.all) {
      if (!isActiveFilterShortMovies) {
        const slicedCards = sliceCards(boxMovies.all, sliceTo.beforeSearch)
        return showCards(slicedCards, setMainBoxForDisplay)
      }


      if (isActiveFilterShortMovies) {
        return showCards(boxMovies.shorts, setMainBoxForDisplay)
      }
    }


    if (foundMoviesByValue.all) {
      if (!isActiveFilterShortMovies) {
        const slicedCards = sliceCards(foundMoviesByValue.all, sliceTo.afterSearch)
        return showCards(slicedCards, setMainBoxForDisplay)
      }


      if (isActiveFilterShortMovies) {
        return showCards(foundMoviesByValue.shorts, setMainBoxForDisplay)
      }
    }
  }



  return {
    isActiveFilterShortMovies,
    switchFilterShortMovies,
    handleSwitchFilterShortMovies,
  }
}

export default useFilterShortMovies