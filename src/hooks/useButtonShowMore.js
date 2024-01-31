import calculateQuantityCardsForOneShow from "../utils/helpers/calculateQuantityCardsForOneShow";
import { PARAMS_AFTER_FIRST_DISPLAY, PARAMS_FOR_FIRST_DISPLAY } from "../utils/constants/constants";


function useButtonShowMore({
  boxMovies,
  mainBoxForDisplay,
  foundMoviesByValue,
  totalAllCardsDisplayed,
  isActiveFilterShortMovies,
  setIsDisplayButtonShowMore,
  setSliceTo,
}) {


  // ОБРАБОТАТЬ КНОПКУ "ЕЩЁ"
  function handleButtonShowMore() {
    const quantity = calculateQuantityCardsForOneShow(PARAMS_AFTER_FIRST_DISPLAY)

    // ЕСЛИ ЕЩЁ НЕ БЫЛО ПОИСКА
    if (foundMoviesByValue.all === null) {
      setSliceTo({ beforeSearch: totalAllCardsDisplayed + quantity, afterSearch: null })
      return
    }

    // ЕСЛИ УЖЕ БЫЛ ПОИСК
    if (foundMoviesByValue.all !== null) {
      setSliceTo({ beforeSearch: null, afterSearch: totalAllCardsDisplayed + quantity })
      return
    }
  }



  // ПРОВЕРКА НАДОБНОСТИ ОТОБРАЖЕНИЯ КНОПКИ "ЕЩЁ"
  function checkNeedDisplayButtonShowMore() {
    if (boxMovies.all !== null && !foundMoviesByValue.all) {
      if (!isActiveFilterShortMovies) {
        if (mainBoxForDisplay.length < boxMovies.all.length) {
          return setIsDisplayButtonShowMore(true)
        }
      }

      if (isActiveFilterShortMovies) {
        if (mainBoxForDisplay.length < boxMovies.shorts.length) {
          return setIsDisplayButtonShowMore(true)
        }
      }
    }


    if (foundMoviesByValue.all) {
      if (!isActiveFilterShortMovies) {
        if (mainBoxForDisplay.length < foundMoviesByValue.all.length) {
          return setIsDisplayButtonShowMore(true)
        }
      }

      if (isActiveFilterShortMovies) {
        if (mainBoxForDisplay.length < foundMoviesByValue.shorts.length) {
          return setIsDisplayButtonShowMore(true)
        }
      }
    }


    return setIsDisplayButtonShowMore(false)
  }



  return {
    handleButtonShowMore,
    checkNeedDisplayButtonShowMore
  }
}

export default useButtonShowMore