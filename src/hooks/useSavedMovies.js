import { useEffect, useState } from "react";
import mainApi from "../utils/MainApi";


function useSavedMovies({
  setDownloadedInitialData,
  setIsDownloadedInitialData,
  handleOpenNotificationPopup,
  abortController
}) {

  const [downloadedSavedMovies, setDownloadedSavedMovies] = useState(null)


  useEffect(() => {
    if (downloadedSavedMovies !== null) {
      setDownloadedInitialData(downloadedSavedMovies)
    }
  }, [downloadedSavedMovies])



  // ПОЛУЧЕНИЕ СОХРАНЁННЫХ ФИЛЬМОВ
  function getSavedMoviesFromApi(enablePreloader, disablePreloader) {
    if (enablePreloader) {
      enablePreloader()
    }

    mainApi.getSavedMovies(abortController)
      .then((savedMovies) => {
        setDownloadedSavedMovies(savedMovies)
        setIsDownloadedInitialData(true)
      })
      .catch((err) => {
        handleOpenNotificationPopup('error', err)
      })
      .finally(() => {
        if (disablePreloader) {
          disablePreloader()
        }
      })
  }



  return { getSavedMoviesFromApi }
}

export default useSavedMovies