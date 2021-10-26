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
  handleButtonCloseMenuProfile,
  setFilterSearchShortFromLocal,
  setLocalMoviesBoxForShow,
  setMoviesFromLocal,
  isLikeRemoved,
  setIsLikeRemoved,
}) {


  const [movies, setMovies] = useState([]);
  const [isDeleteComplete, setIsDeleteComplete] = useState(false)


  useEffect(() => {
    return handleIsSavedMoviesLink() // ПЕРЕШЛИ НА СТРАНИЦУ - /saved-movies
  }, [])


  // УДАЛЕНИЕ КАРТОЧКИ ИЗ DOM
  function handleDeleteCardfromDOM(id) {

    setMovies((prevCards) => {
      const filterCards = prevCards.filter((card) => {
        if (card._id !== id) {
          return card;
        }
      })
      setIsDeleteComplete(true);
      return [...filterCards];
    })
  }


  // ЕСЛИ УДАЛИЛИ КАРТОЧКУ ИЛИ СНЯЛИ ЛАЙК
  useEffect(() => {
    if (isDeleteComplete || isLikeRemoved) {

      setMoviesFromLocal(movies)
      setFilterSearchShortFromLocal(movies)
      setLocalMoviesBoxForShow(movies)
      setIsLikeRemoved(false)
      return setIsDeleteComplete(false)
    }
  }, [isDeleteComplete, isLikeRemoved])


  useEffect(() => {
    if (localSavedMovies || localMoviesBoxForShow || filterSearchShortFromLocal) {

      // ЕСЛИ ПОИСК ТОЛЬКО ПО САБМИТУ (БЕЗ ФИЛЬТРА)
      if (!isFilterShortMovies && currentSearchInLocalSavedMovies) {
        setMovies(localMoviesBoxForShow)
        return
      }

      // ЕСЛИ НЕТ ФИЛЬТРА И БЫЛА НАЖАТА КНОПКА ФИЛЬТРА
      if (!isSubmitFixedStateFilter && currentSearchInLocalSavedMovies) {
        return setMovies(localSavedMovies)
      }

      // ЕСЛИ ЕСТЬ ФИЛЬТР И БЫЛА НАЖАТА КНОПКА ФИЛЬТРА
      if (isSubmitFixedStateFilter && currentSearchInLocalSavedMovies) {
        return setMovies(filterSearchShortFromLocal)
      }

      // ПРИ ПЕРЕХОДЕ НА ССЫЛКУ - /saved-movies ПОКАЗЫВАЮТСЯ ВСЕ СОХРАНЁННЫЕ ФИЛЬМЫ
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
        setIsLikeRemoved={setIsLikeRemoved}
      />
    </>
  )
}

export default SavedMovies;