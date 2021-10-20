import React, { useState, useEffect } from "react";
import MenuProfile from "../MenuProfile/MenuProfile";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";


function SavedMovies({
  moviesFromLocal,
  resultSearchMovies,
  isFilterShortMovies,
  handleSetIsFilterShortMovies,
  handleValueInputSearchForm,
  handleSetSubmitSearchFormActive,
  handleSetValueInputSearchForm,
  filterSearchShortFromLocal,
  currentSearchInLocalSavedMovies,
  isSubmitFixedStateFilter,
  isPreloaderActive,
  isMoviesNotFound,
  isSavedMoviesLink,
  isProfileMenu,
  localMoviesBoxForShow,
  localSavedMovies,
  handleLocalSavedMovies,
  getSavedMovies,
  handleOpenPopup,
  handleDeleteMovies,
  handleIsSavedMoviesLink,
  handleButtonCloseMenuProfile
}) {


  const [movies, setMovies] = useState([]);
  const [isPushedButtonDelete, setIsPushedButtonDelete] = useState(false)

  useEffect(() => {
    return handleIsSavedMoviesLink() // ПЕРЕШЛИ НА СТРАНИЦУ - /saved-movies
  }, [])


  // УДАЛЕНИЕ КАРТОЧКИ ИЗ DOM
  function handleDeleteCardfromDOM(id) {
    setIsPushedButtonDelete(true)
    setMovies((prevCards) => {
      const filterCards = prevCards.filter((card) => {
        if (card._id !== id) {
          return card;
        }
      })
      return [...filterCards];
    })
  }


  useEffect(() => {

    if (localSavedMovies || localMoviesBoxForShow || filterSearchShortFromLocal) {

      if (!isSubmitFixedStateFilter && isPushedButtonDelete) {
        return;
      }

      if (!isSubmitFixedStateFilter && currentSearchInLocalSavedMovies) {
        return setMovies(localMoviesBoxForShow)
      }

      if (isSubmitFixedStateFilter && currentSearchInLocalSavedMovies) {
        return setMovies(filterSearchShortFromLocal)
      }

      if (moviesFromLocal) {
        return setMovies(moviesFromLocal)
      }

    }
  }, [moviesFromLocal, localSavedMovies, localMoviesBoxForShow, filterSearchShortFromLocal])


  return (
    <>
      <MenuProfile
        isSavedMoviesLink={isSavedMoviesLink}
        isProfileMenu={isProfileMenu}
        handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
      />

      <SearchForm
        resultSearchMovies={resultSearchMovies}
        isFilterShortMovies={isFilterShortMovies}
        handleSetIsFilterShortMovies={handleSetIsFilterShortMovies}
        handleValueInputSearchForm={handleValueInputSearchForm}
        handleSetSubmitSearchFormActive={handleSetSubmitSearchFormActive}
        handleSetValueInputSearchForm={handleSetValueInputSearchForm}
      />

      <MoviesCardList
        cards={movies}
        isPreloaderActive={isPreloaderActive}
        isMoviesNotFound={isMoviesNotFound}
        isSavedMoviesLink={isSavedMoviesLink}
        localSavedMovies={localSavedMovies}
        handleLocalSavedMovies={handleLocalSavedMovies}
        getSavedMovies={getSavedMovies}
        handleOpenPopup={handleOpenPopup}
        handleDeleteCardfromDOM={handleDeleteCardfromDOM}
        handleDeleteMovies={handleDeleteMovies}
      />
    </>
  )
}

export default SavedMovies;