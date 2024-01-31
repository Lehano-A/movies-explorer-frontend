import { useEffect } from "react"

function ButtonSave({
  card,
  isActiveSavingIcon,
  setIsActiveSavingIcon,
  set_idSavedMovie,
  loadedSavedMovies,
}) {


  useEffect(() => {
    loadedSavedMovies.forEach((savedMovie) => {

      // ЕСЛИ ТЕКУЩАЯ КАРТОЧКА СОВПАДАЕТ С КАРТОЧКОЙ В СОХРАНЁННЫХ ФИЛЬМАХ
      if (savedMovie.movieId === card.id) {
        setIsActiveSavingIcon(true) // ТОГДА АКТИВИРУЕМ ИКОНКУ
        set_idSavedMovie(savedMovie._id)
      }

    })
  }, [loadedSavedMovies])



  return (
    <button
      id='save'
      className={`movies-card__button-save ${isActiveSavingIcon ? 'movies-card__button-save_active' : ''}`}>
    </button>
  )
}

export default ButtonSave