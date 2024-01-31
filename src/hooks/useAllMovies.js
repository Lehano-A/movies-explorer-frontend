import { useEffect, useState } from "react";
import moviesApi from "../utils/MoviesApi";


function useAllMovies({
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
}) {

  const [downloadedAllMovies, setDownloadedAllMovies] = useState(null)


  useEffect(() => {
    setDownloadedInitialData(downloadedAllMovies)
  }, [downloadedAllMovies])



  // ПОЛУЧИТЬ ВСЕ ФИЛЬМЫ ОТ СЕРВЕРА
  function getAllMoviesFromApi(enablePreloader, disablePreloader) {
    enablePreloader()

    moviesApi.getMovies(abortController)
      .then((allMovies) => {
        setDownloadedAllMovies(allMovies)
        setIsDownloadedInitialData(true)
      })
      .catch((err) => {
        handleOpenNotificationPopup('error', err)
      })
      .finally(() => { disablePreloader() })
  }



  // ОБРАБОТАТЬ ВСЕ ФИЛЬМЫ (ПЕРЕД ПОИСКОМ)
  function handleAllMoviesBeforeSearch() {

    if (!isActiveFilterShortMovies) {
      const slicedCards = sliceCards(boxMovies.all, sliceTo.beforeSearch)
      return showCards(slicedCards, setMainBoxForDisplay)
    }
  }



  // ОБРАБОТАТЬ ВСЕ ФИЛЬМЫ (ПОСЛЕ ПОИСКА)
  function handleAllMoviesAfterSearch() {
    if (foundMoviesByValue.all !== null) {

      if (!isActiveFilterShortMovies) {
        let slicedCards = sliceCards(foundMoviesByValue.all, sliceTo.afterSearch)

        return showCards(slicedCards, setMainBoxForDisplay)
      }

    }
  }



  return {
    getAllMoviesFromApi,
    handleAllMoviesBeforeSearch,
    handleAllMoviesAfterSearch,
  }
}

export default useAllMovies