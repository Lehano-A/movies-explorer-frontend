import React, { useState, useEffect } from "react";
import MenuProfile from "../MenuProfile/MenuProfile";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({
  isFilterShortMoviesDisabled,
  isLikeRemoved,
  isSubmitFixedStateFilter,
  isPreloaderActive,
  isMoviesNotFound,
  isSavedMoviesLink,
  isProfileMenu,
  isFilterShortMovies,
  handleIsReloadedPageActive,
  handleSetIsFilterShortMovies,
  handleValueInputSearchForm,
  handleSetSubmitSearchFormActive,
  handleOpenPopup,
  handleIsSavedMoviesLink,
  handleButtonCloseMenuProfile,
  getSavedMovies,
  setFilterSearchShortFromLocal,
  setLocalMoviesBoxForShow,
  setMoviesFromLocal,
  setIsLikeRemoved,
  setLocalMoviesAfterSearch,
  setIsFilterShortMoviesDisabled,
  valueInputSearchForm,
  timerFilterShortMovies,
  moviesFromLocal,
  filterSearchShortFromLocal,
  currentSearchInLocalSavedMovies,
  localMoviesBoxForShow,
}) {


  const [movies, setMovies] = useState([]);
  const [isDeleteComplete, setIsDeleteComplete] = useState(false);


  useEffect(() => {
    handleIsReloadedPageActive();
    return handleIsSavedMoviesLink(); // ПЕРЕШЛИ НА СТРАНИЦУ - /saved-movies
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
    filterCard(setMovies, id);
    filterCard(setMoviesFromLocal, id);
    setIsDeleteComplete(true);
    return;
  }


  // ЕСЛИ УДАЛИЛИ КАРТОЧКУ ИЛИ СНЯЛИ ЛАЙК
  useEffect(() => {
    if (isDeleteComplete || isLikeRemoved) {
      setLocalMoviesAfterSearch(movies);
      setFilterSearchShortFromLocal(movies);
      setLocalMoviesBoxForShow(movies);
      setIsLikeRemoved(false);
      return setIsDeleteComplete(false);
    }
  }, [isDeleteComplete, isLikeRemoved])



  useEffect(() => {
    if (localMoviesBoxForShow || filterSearchShortFromLocal) {

      // БЕЗ САБМИТА - ЕСЛИ ВЫКЛЮЧИЛИ ФИЛЬТР
      if (!isFilterShortMovies && currentSearchInLocalSavedMovies && valueInputSearchForm) {
        setMovies(localMoviesBoxForShow);
        return
      }

      // САБМИТ - ЕСЛИ НЕТ ФИЛЬТРА
      if (!isSubmitFixedStateFilter && currentSearchInLocalSavedMovies) {
        return setMovies(moviesFromLocal);
      }

      // БЕЗ САБМИТА - ЕСЛИ ВКЛЮЧИЛИ ФИЛЬТР
      if (isSubmitFixedStateFilter && currentSearchInLocalSavedMovies) {
        return setMovies(filterSearchShortFromLocal);
      }

      // ПРИ ПЕРЕХОДЕ НА ССЫЛКУ - /saved-movies ПОКАЗЫВАЮТСЯ ВСЕ СОХРАНЁННЫЕ ФИЛЬМЫ
      if (moviesFromLocal) {
        return setMovies(moviesFromLocal);
      }
    }
  }, [moviesFromLocal, localMoviesBoxForShow, filterSearchShortFromLocal])


  return (
    <>
      <MenuProfile
        isSavedMoviesLink={isSavedMoviesLink}
        isProfileMenu={isProfileMenu}
        handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
      />

      <SearchForm
        isFilterShortMovies={isFilterShortMovies}
        isFilterShortMoviesDisabled={isFilterShortMoviesDisabled}
        isPreloaderActive={isPreloaderActive}
        handleSetIsFilterShortMovies={handleSetIsFilterShortMovies}
        handleValueInputSearchForm={handleValueInputSearchForm}
        handleSetSubmitSearchFormActive={handleSetSubmitSearchFormActive}
        setIsFilterShortMoviesDisabled={setIsFilterShortMoviesDisabled}
        timerFilterShortMovies={timerFilterShortMovies}
      />

      <MoviesCardList
        cards={movies}
        isPreloaderActive={isPreloaderActive}
        isMoviesNotFound={isMoviesNotFound}
        isSavedMoviesLink={isSavedMoviesLink}
        handleOpenPopup={handleOpenPopup}
        handleDeleteCardfromDOM={handleDeleteCardfromDOM}
        getSavedMovies={getSavedMovies}
        setIsLikeRemoved={setIsLikeRemoved}
      />
    </>
  )
}

export default SavedMovies;