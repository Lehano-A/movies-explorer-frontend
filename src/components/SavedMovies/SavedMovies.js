import React, { useState, useEffect } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import useSavedMovies from "../../hooks/useSavedMovies";
import usePreloader from "../../hooks/usePreloader";
import useActionsWithCards from "../../hooks/useActionsWithCards";
import useFilterShortMovies from "../../hooks/useFilterShortMovies";
import useFindMovies from "../../hooks/useFindMovies";
import useButtonDeleteMovie from "../../hooks/useButtonDeleteMovie";
import More from "../Movies/More/More";



function SavedMovies({ handleOpenNotificationPopup }) {

  const abortController = new AbortController()

  const [isActiveFilterShortMovies, setIsActiveFilterShortMovies] = useState(null)
  const [isDownloadedInitialData, setIsDownloadedInitialData] = useState(null)

  const [mainBoxForDisplay, setMainBoxForDisplay] = useState([]);
  const [foundMoviesByValue, setFoundMoviesByValue] = useState({ all: null, shorts: null })
  const [savedMovies, setSavedMovies] = useState({ all: [], shorts: [] })
  const [downloadedInitialData, setDownloadedInitialData] = useState(null)


  const {
    handleSearchMovies,
    sortMovies,
  } = useFindMovies({
    boxMoviesForSearch: savedMovies,
    isActiveFilterShortMovies,
    setFoundMoviesByValue,
  })

  const { switchFilterShortMovies } = useFilterShortMovies({ setIsActiveFilterShortMovies })

  const {
    isActivePreloader,
    enablePreloader,
    disablePreloader
  } = usePreloader()

  const { getSavedMoviesFromApi } = useSavedMovies({ setDownloadedInitialData, setIsDownloadedInitialData, handleOpenNotificationPopup, abortController })

  const { showCards, filterCardsAfterRemovedLike } = useActionsWithCards(isActiveFilterShortMovies)

  const { handleDeleteMovie } = useButtonDeleteMovie({ handleOpenNotificationPopup })



  useEffect(() => {
    getSavedMoviesFromApi(enablePreloader, disablePreloader)
    return () => { abortController.abort() }
  }, [])



  // ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА СОХРАНЁННЫХ ФИЛЬМОВ
  useEffect(() => {
    if (downloadedInitialData !== null) {
      const { all, shorts } = sortMovies(downloadedInitialData)
      setSavedMovies({ all, shorts })
      setDownloadedInitialData(null)
    }
  }, [downloadedInitialData])



  /*
    КОГДА ПРОИСХОДИТ:
    1) ОБРАБОТКА ПЕРВОНАЧАЛЬНО ЗАГРУЖЖЕНЫХ СОХРАНЁННЫХ ФИЛЬМОВ
    2) ПОИСК ФИЛЬМОВ
    3) ПЕРЕКЛЮЧЕНИЕ ФИЛЬТРА КОРОТКОМЕТРАЖЕК

  */
  useEffect(() => {
    if (foundMoviesByValue.all !== null) {
      if (!isActiveFilterShortMovies) {
        return showCards(foundMoviesByValue.all, setMainBoxForDisplay)
      }

      if (isActiveFilterShortMovies) {
        return showCards(foundMoviesByValue.shorts, setMainBoxForDisplay)
      }
    }


    if (foundMoviesByValue.all === null) {
      if (!isActiveFilterShortMovies) {
        return showCards(savedMovies.all, setMainBoxForDisplay)
      }

      if (isActiveFilterShortMovies) {
        return showCards(savedMovies.shorts, setMainBoxForDisplay)
      }
    }
  }, [savedMovies, foundMoviesByValue, isActiveFilterShortMovies])



  // ОБНОВИТЬ СОСТОЯНИЯ, ПОСЛЕ УДАЛЕНИЯ ФИЛЬМА
  function updateStatesAfterDeletionMovie(idCard) {
    const filteredSavedMovies = filterCardsAfterRemovedLike(savedMovies.all, idCard)
    const filteredFoundMovies = filterCardsAfterRemovedLike(foundMoviesByValue.all, idCard)

    const sortedSavedMovies = sortMovies(filteredSavedMovies)
    const sortedFoundMovies = sortMovies(filteredFoundMovies)

    setFoundMoviesByValue({ all: sortedFoundMovies.all, shorts: sortedFoundMovies.shorts })
    setSavedMovies({ all: sortedSavedMovies.all, shorts: sortedSavedMovies.shorts })
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
        loadedSavedMovies={savedMovies.all}
        isSavedMoviesCurrentPathname={true}
        isActivePreloader={isActivePreloader}
        isDownloadedInitialData={isDownloadedInitialData}
        updateStatesAfterDeletionMovie={updateStatesAfterDeletionMovie}
        handleDeleteMovie={handleDeleteMovie}
        abortController={abortController}
      />

      <More />

    </>
  )
}

export default SavedMovies;