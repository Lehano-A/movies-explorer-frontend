import React, { useState, useEffect } from "react";
import MenuProfile from "../MenuProfile/MenuProfile";
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import More from "./More/More";

function Movies({

  isLoggedIn,
  isMoviesLink,
  isProfileMenu,
  isPreloaderActive,
  isMoviesNotFound,
  isFilterShortMovies,
  isLoadedSavedMovies,
  isSavedMoviesLink,
  handleLocalSavedMovies,
  getSavedMovies,
  setIsLoadedSavedMovies,
  moviesFromApi,
  fifthApiStep,
  moviesBoxForMore,
  isReloadedPage,
  isSubmitFixedStateFilter,
  currentSearchMoviesFromApi,
  filterAfterSearchShortFromApi,
  foundMoviesAfterSearchApi,
  isPressedSubmitSearchForm,
  handleOpenPopup,
  handleCountCards,
  handleSetIsFilterShortMovies,
  handleValueInputSearchForm,
  handleSetSubmitSearchFormActive,
  handleIsMoviesLink,
  handleButtonCloseMenuProfile,
  handleSetValueInputSearchForm,
  handleShowResultSearchMovies,
  firstLoggingUser,
}) {

  const [movies, setMovies] = useState([])


  useEffect(() => {

    if (isLoggedIn) {

      if (localStorage.getItem('authAfterLogoutActive')) {
        handleSetSubmitSearchFormActive()
        localStorage.removeItem('authAfterLogoutActive')
      }

      handleIsMoviesLink();
      return
    }
  }, [isLoggedIn])



  useEffect(() => {
    if (isReloadedPage && !isSavedMoviesLink && !firstLoggingUser) {
      return handleSetSubmitSearchFormActive()
    }
  }, [isReloadedPage, isSavedMoviesLink, firstLoggingUser])



  useEffect(() => {
    // ОТ API
    if (isReloadedPage && !isSubmitFixedStateFilter) {

      localStorage.removeItem('reloadedPage')
      return setMovies(moviesBoxForMore)
    } // ЕСЛИ БЫЛА ОБНОВЛЕНА СТРАНИЦА, ТО ПОКАЗЫВАЕМ ФИЛЬМЫ ИЗ ХРАНИЛИЩА

    if (filterAfterSearchShortFromApi.length >= 1 && currentSearchMoviesFromApi) {
      return setMovies(filterAfterSearchShortFromApi)
    }

    if (fifthApiStep && !isSubmitFixedStateFilter && currentSearchMoviesFromApi) {
      return setMovies(moviesBoxForMore)
    }

  }, [isReloadedPage, fifthApiStep, moviesFromApi, moviesBoxForMore, filterAfterSearchShortFromApi, isSubmitFixedStateFilter])


  return (
    <>
      <MenuProfile
        isMoviesLink={isMoviesLink}
        isProfileMenu={isProfileMenu}
        handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
      />

      <SearchForm
        isFilterShortMovies={isFilterShortMovies}
        isPreloaderActive={isPreloaderActive}
        handleSetIsFilterShortMovies={handleSetIsFilterShortMovies}
        handleValueInputSearchForm={handleValueInputSearchForm}
        handleSetSubmitSearchFormActive={handleSetSubmitSearchFormActive}
        handleSetValueInputSearchForm={handleSetValueInputSearchForm}
      />

      <MoviesCardList
        cards={movies}
        isPreloaderActive={isPreloaderActive}
        isMoviesNotFound={isMoviesNotFound}
        isPressedSubmitSearchForm={isPressedSubmitSearchForm}
        isMoviesLink={isMoviesLink}
        getSavedMovies={getSavedMovies}
        isLoadedSavedMovies={isLoadedSavedMovies}
        setIsLoadedSavedMovies={setIsLoadedSavedMovies}
        handleLocalSavedMovies={handleLocalSavedMovies}
        handleOpenPopup={handleOpenPopup}
        handleShowResultSearchMovies={handleShowResultSearchMovies}
      />

      <More
        resultSearchMovies={foundMoviesAfterSearchApi}
        addMoreCards={handleCountCards}
        isSubmitFixedStateFilter={isSubmitFixedStateFilter}
        filterAfterSearchShortFromApi={filterAfterSearchShortFromApi}
      />
    </>
  )
}

export default Movies;