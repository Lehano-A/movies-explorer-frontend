import React, { useState, useEffect } from "react";
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import More from "./More/More";
import { PARAMS_AFTER_FIRST_DISPLAY, PARAMS_FOR_FIRST_DISPLAY } from "../../utils/constants/constants";
import useAllMovies from "../../hooks/useAllMovies";
import usePreloader from "../../hooks/usePreloader";
import calculateQuantityCardsForOneShow from "../../utils/helpers/calculateQuantityCardsForOneShow";
import useButtonShowMore from "../../hooks/useButtonShowMore";
import useFilterShortMovies from "../../hooks/useFilterShortMovies";
import useFindMovies from "../../hooks/useFindMovies";
import useActionsWithCards from "../../hooks/useActionsWithCards";
import useSavedMovies from "../../hooks/useSavedMovies";
import useButtonSaveMovie from "../../hooks/useButtonSaveMovie";
import useShortMovies from "../../hooks/useShortMovies";



function Movies({ handleOpenNotificationPopup }) {

  const abortController = new AbortController()

  const [mainBoxForDisplay, setMainBoxForDisplay] = useState([]);
  const [boxMovies, setBoxMovies] = useState({ all: null, shorts: null, sliceTo: null });
  const [savedMovies, setSavedMovies] = useState([])
  const [foundMoviesByValue, setFoundMoviesByValue] = useState({ all: null, shorts: null, sliceTo: null })
  const [sliceTo, setSliceTo] = useState({
    beforeSearch: null,
    afterSearch: null
  })
  const [totalAllCardsDisplayed, setTotalAllCardsDisplayed] = useState(null)
  const [downloadedInitialData, setDownloadedInitialData] = useState(null) // ВСЕ ФИЛЬМЫ

  const [isActiveFilterShortMovies, setIsActiveFilterShortMovies] = useState(null)
  const [isDownloadedInitialData, setIsDownloadedInitialData] = useState(null)
  const [isDisplayButtonShowMore, setIsDisplayButtonShowMore] = useState(null)

  const { handleButtonShowMore, checkNeedDisplayButtonShowMore } = useButtonShowMore({
    boxMovies,
    mainBoxForDisplay,
    foundMoviesByValue,
    totalAllCardsDisplayed,
    isActiveFilterShortMovies,
    setIsDisplayButtonShowMore,
    setSliceTo,
  })

  const { sliceCards, showCards } = useActionsWithCards(isActiveFilterShortMovies, setTotalAllCardsDisplayed)

  const { getAllMoviesFromApi, handleAllMoviesBeforeSearch, handleAllMoviesAfterSearch } = useAllMovies({
    isActiveFilterShortMovies,
    boxMovies,
    sliceTo,
    sliceCards,
    showCards,
    foundMoviesByValue,
    setMainBoxForDisplay,
    setIsDownloadedInitialData,
    setDownloadedInitialData,
    handleOpenNotificationPopup,
    abortController
  })

  const { handleShortMoviesBeforeSearch, handleShortMoviesAfterSearch } = useShortMovies({
    isActiveFilterShortMovies,
    boxMovies,
    sliceCards,
    showCards,
    foundMoviesByValue,
    setMainBoxForDisplay
  })

  const {
    handleSearchMovies,
    sortMovies,
  } = useFindMovies({
    boxMoviesForSearch: boxMovies,
    isActiveFilterShortMovies,
    setFoundMoviesByValue,
    setTotalAllCardsDisplayed,
  })

  const { switchFilterShortMovies, handleSwitchFilterShortMovies } = useFilterShortMovies({
    isActiveFilterShortMovies,
    boxMovies,
    foundMoviesByValue,
    sliceTo,
    setMainBoxForDisplay,
    sliceCards,
    showCards,
    setIsActiveFilterShortMovies,
  })

  const {
    isActivePreloader,
    enablePreloader,
    disablePreloader
  } = usePreloader()

  const { getSavedMoviesFromApi } = useSavedMovies({
    setDownloadedInitialData: setSavedMovies,
    setIsDownloadedInitialData,
    handleOpenNotificationPopup,
    abortController
  })

  const { handleButtonSaveMovie } = useButtonSaveMovie({ getSavedMoviesFromApi, handleOpenNotificationPopup, abortController })



  // ПЕРВИЧНЫЙ РЕНДЕР
  useEffect(() => {
    getAllMoviesFromApi(enablePreloader, disablePreloader)
    getSavedMoviesFromApi()

    return () => abortController.abort()
  }, [])



  // КОГДА ОСУЩЕСТВЛЕНА ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА ФИЛЬМОВ (ПРИ МОНТИРОВАНИИ)
  useEffect(() => {
    if (downloadedInitialData !== null) {
      const { all, shorts } = sortMovies(downloadedInitialData)
      const quantity = calculateQuantityCardsForOneShow(PARAMS_FOR_FIRST_DISPLAY)

      setBoxMovies({ all, shorts, sliceTo: quantity })
      setDownloadedInitialData(null)
    }
  }, [downloadedInitialData])



  // КОГДА ОБРАБОТАНЫ ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА ФИЛЬМОВ
  // ИЛИ КОГДА ПРОИСХОДИТ ИЗМЕНЕНИЕ МАССИВА С НАЙДЕННЫМИ ФИЛЬМАМИ
  useEffect(() => {
    if (!isActiveFilterShortMovies) {
      const quantity = checkWhatIsNeedDisplayAllMovies(totalAllCardsDisplayed)

      if (foundMoviesByValue.all) {
        return setSliceTo({ beforeSearch: null, afterSearch: quantity })
      }

      if (!foundMoviesByValue.all) {
        return setSliceTo({ beforeSearch: quantity, afterSearch: null })
      }
    }


    if (isActiveFilterShortMovies) {
      if (!foundMoviesByValue.shorts) {
        return setSliceTo((prevState) => ({ ...prevState }))
      }

      if (foundMoviesByValue.shorts) {
        return setSliceTo({ beforeSearch: null, afterSearch: null })
      }
    }
  }, [boxMovies, foundMoviesByValue])



  useEffect(() => {
    // ВСЕ ФИЛЬМЫ - ДО ПОИСКА
    if (sliceTo.beforeSearch !== null || sliceTo.afterSearch !== null) {
      if (boxMovies.all !== null && foundMoviesByValue.all === null) {
        return handleAllMoviesBeforeSearch()
      }

      // ВСЕ ФИЛЬМЫ - ПОСЛЕ ПОИСКА
      if (foundMoviesByValue.all !== null) {
        return handleAllMoviesAfterSearch()
      }
    }

    // КОРОТКОМЕТРАЖКИ - ДО ПОИСКА
    if (boxMovies.shorts !== null && foundMoviesByValue.all === null) {
      return handleShortMoviesBeforeSearch()
    }

    // КОРОТКОМЕТРАЖКИ - ПОСЛЕ ПОИСКА
    if (foundMoviesByValue.shorts !== null) {
      return handleShortMoviesAfterSearch()
    }
  }, [sliceTo])



  // КОГДА ПРОИСХОДИТ ПЕРЕКЛЮЧЕНИЕ СОСТОЯНИЯ ФИЛЬТРА КОРОТКОМЕТРАЖЕК
  useEffect(() => {
    handleSwitchFilterShortMovies()
  }, [isActiveFilterShortMovies])



  // КОГДА ИЗМЕНЯЕТСЯ ОСНОВНОЙ БОКС ОТОБРАЖЕНИЯ КАРТОЧЕК ИЛИ ПЕРЕКЛЮЧАЕТСЯ ФИЛЬТР КОРОТКОМЕТРАЖЕК
  useEffect(() => {
    checkNeedDisplayButtonShowMore()   // ПРОВЕРКА НАДОБНОСТИ ОТОБРАЖЕНИЯ КНОПКИ "ЕЩЁ"
  }, [mainBoxForDisplay, isActiveFilterShortMovies])



  // ПРОВЕРИТЬ, СКОЛЬКО НУЖНО ОТОБРАЗИТЬ КАРТОЧЕК ИЗ ALLMOVIES
  function checkWhatIsNeedDisplayAllMovies(totalAllCardsDisplayed) {
    if (totalAllCardsDisplayed === null) {
      return calculateQuantityCardsForOneShow(PARAMS_FOR_FIRST_DISPLAY)
    }

    if (totalAllCardsDisplayed > 0) {
      return calculateQuantityCardsForOneShow(PARAMS_AFTER_FIRST_DISPLAY)
    }
  }



  return (
    <>
      <SearchForm
        isActivePreloader={isActivePreloader}
        isActiveFilterShortMovies={isActiveFilterShortMovies}
        switchFilterShortMovies={switchFilterShortMovies}
        handleSearchMovies={handleSearchMovies}
      />


      <MoviesCardList
        cards={mainBoxForDisplay}
        loadedSavedMovies={savedMovies}
        isActivePreloader={isActivePreloader}
        isDownloadedInitialData={isDownloadedInitialData}
        handleButtonSaveMovie={handleButtonSaveMovie}
        abortController={abortController}
      />


      <More
        isDisplayButtonShowMore={isDisplayButtonShowMore}
        handleButtonShowMore={handleButtonShowMore}
      />
    </>
  )
}

export default Movies;