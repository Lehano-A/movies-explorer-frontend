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
  setLocalMoviesAfterSearch,
  valueInputSearchForm,
  timerFilterShortMovies,
  isFilterShortMoviesDisabled,
  setIsFilterShortMoviesDisabled
}) {


  const [movies, setMovies] = useState([]);
  const [isDeleteComplete, setIsDeleteComplete] = useState(false)


  useEffect(() => {
    return handleIsSavedMoviesLink() // ПЕРЕШЛИ НА СТРАНИЦУ - /saved-movies
  }, [])


  // ФИЛЬТР УДАЛЁННОЙ КАРТОЧКИ ИЗ МАССИВ
  function filterCard(handle, id) {
    handle((prevCards) => {
      const filterCards = prevCards.filter((card) => {
        if (card._id !== id) {
          return card;
        }
      })
      return [...filterCards];
    })
  }


  // УДАЛЕНИЕ КАРТОЧКИ ИЗ DOM
  function handleDeleteCardfromDOM(id) {
    filterCard(setMovies, id)
    filterCard(setMoviesFromLocal, id)
    setIsDeleteComplete(true)
    return;
  }


  // ЕСЛИ УДАЛИЛИ КАРТОЧКУ ИЛИ СНЯЛИ ЛАЙК
  useEffect(() => {
    if (isDeleteComplete || isLikeRemoved) {
      setLocalMoviesAfterSearch(movies)
      setFilterSearchShortFromLocal(movies)
      setLocalMoviesBoxForShow(movies)
      setIsLikeRemoved(false)
      return setIsDeleteComplete(false)
    }
  }, [isDeleteComplete, isLikeRemoved])


  useEffect(() => {
    if (localSavedMovies || localMoviesBoxForShow || filterSearchShortFromLocal) {

      // БЕЗ САБМИТА - ЕСЛИ ВЫКЛЮЧИЛИ ФИЛЬТР
      if (!isFilterShortMovies && currentSearchInLocalSavedMovies && valueInputSearchForm) {
        setMovies(localMoviesBoxForShow)
        return
      }

      // САБМИТ - ЕСЛИ НЕТ ФИЛЬТРА
      if (!isSubmitFixedStateFilter && currentSearchInLocalSavedMovies) {
        return setMovies(moviesFromLocal)
      }

      // БЕЗ САБМИТА - ЕСЛИ ВКЛЮЧИЛИ ФИЛЬТР
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
        isFilterShortMoviesDisabled={isFilterShortMoviesDisabled}
        setIsFilterShortMoviesDisabled={setIsFilterShortMoviesDisabled}
        timerFilterShortMovies={timerFilterShortMovies}
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
        getSavedMovies={getSavedMovies}
        handleOpenPopup={handleOpenPopup}
        handleDeleteCardfromDOM={handleDeleteCardfromDOM}
        handleDeleteMovies={handleDeleteMovies}
        setIsLikeRemoved={setIsLikeRemoved}
        isFilterShortMovies={isFilterShortMovies}

      />
    </>
  )
}

export default SavedMovies;