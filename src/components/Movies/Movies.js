import React, { useState, useEffect } from "react";
import MenuProfile from "../MenuProfile/MenuProfile";
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import More from "./More/More";
import { parseJSON } from './../../utils/helpers/jsonHandler'

function Movies({
  isMoviesLink,
  isProfileMenu,
  isPreloaderActive,
  isMoviesNotFound,
  isFilterShortMovies,
  isLoadedSavedMovies,
  isSavedMoviesLink,
  isReloadedPage,
  isSubmitFixedStateFilter,
  isPressedSubmitSearchForm,
  isFilterShortMoviesDisabled,
  handleOpenPopup,
  handleCountCards,
  handleSetIsFilterShortMovies,
  handleValueInputSearchForm,
  handleSetSubmitSearchFormActive,
  handleIsMoviesLink,
  handleButtonCloseMenuProfile,
  handleIsReloadedPageActive,
  getSavedMovies,
  setIsLikeRemoved,
  setIsFilterShortMoviesDisabled,
  moviesFromApi,
  moviesBoxForMore,
  fourthApiFlag,
  currentSearchMoviesFromApi,
  filterAfterSearchShortFromApi,
  foundMoviesAfterSearchApi,
  timerFilterShortMovies
}) {

  const [movies, setMovies] = useState([]);

  const afterRegBeforeFirstSubmit = parseJSON(localStorage.getItem('afterRegBeforeFirstSubmit'));


  useEffect(() => {

    if (!afterRegBeforeFirstSubmit) {
      handleValueInputSearchForm(''); // ПРИ ВОЗВРАТЕ НА /movies - СБРАСЫВАЕМ ЗНАЧЕНИЕ ПОИСКА
      handleIsReloadedPageActive();
    }

    return handleIsMoviesLink();
  }, [])


  useEffect(() => {
    if (isReloadedPage && !isSavedMoviesLink && !afterRegBeforeFirstSubmit) {
      return handleSetSubmitSearchFormActive();
    }
  }, [isReloadedPage,
    isSavedMoviesLink,
    afterRegBeforeFirstSubmit
  ])


  useEffect(() => {

    // ОТ API
    if (isReloadedPage && !isSubmitFixedStateFilter) {
      localStorage.removeItem('reloadedPage');
      return setMovies(moviesBoxForMore);
    } // ЕСЛИ БЫЛА ОБНОВЛЕНА СТРАНИЦА, ТО ПОКАЗЫВАЕМ ФИЛЬМЫ ИЗ ХРАНИЛИЩА, КЛЮЧ - movies

    if (filterAfterSearchShortFromApi.length >= 1 && currentSearchMoviesFromApi) {
      return setMovies(filterAfterSearchShortFromApi);
    }

    if (fourthApiFlag && !isSubmitFixedStateFilter && currentSearchMoviesFromApi) {
      return setMovies(moviesBoxForMore);
    }
  }, [isReloadedPage,
    fourthApiFlag,
    moviesFromApi,
    moviesBoxForMore,
    filterAfterSearchShortFromApi,
    isSubmitFixedStateFilter
  ])


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
        isFilterShortMoviesDisabled={isFilterShortMoviesDisabled}
        handleSetIsFilterShortMovies={handleSetIsFilterShortMovies}
        handleValueInputSearchForm={handleValueInputSearchForm}
        handleSetSubmitSearchFormActive={handleSetSubmitSearchFormActive}
        setIsFilterShortMoviesDisabled={setIsFilterShortMoviesDisabled}
        timerFilterShortMovies={timerFilterShortMovies}
      />

      <MoviesCardList
        isPreloaderActive={isPreloaderActive}
        isMoviesNotFound={isMoviesNotFound}
        isPressedSubmitSearchForm={isPressedSubmitSearchForm}
        isMoviesLink={isMoviesLink}
        isLoadedSavedMovies={isLoadedSavedMovies}
        handleOpenPopup={handleOpenPopup}
        getSavedMovies={getSavedMovies}
        setIsLikeRemoved={setIsLikeRemoved}
        cards={movies}
      />

      <More
        isSubmitFixedStateFilter={isSubmitFixedStateFilter}
        resultSearchMovies={foundMoviesAfterSearchApi}
        addMoreCards={handleCountCards}
        filterAfterSearchShortFromApi={filterAfterSearchShortFromApi}
      />
    </>
  )
}

export default Movies;