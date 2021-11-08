import React, { useEffect } from "react";
import MenuProfile from "../MenuProfile/MenuProfile";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import More from "../Movies/More/More";

function SavedMovies({
  savedMovies,
  countedSavedMovies,
  isSavedMoviesLink,
  isProfileMenu,
  handleSavedMovies,
  handleDeleteMovies,
  handleIsSavedMoviesLink,
  handleIsActiveButtonSave,
  handleButtonCloseMenuProfile }) {

  useEffect(() => {
    handleIsSavedMoviesLink();
    handleSavedMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <MenuProfile
        isSavedMoviesLink={isSavedMoviesLink}
        isProfileMenu={isProfileMenu}
        handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
      />

      <SearchForm />

      <MoviesCardList
        isSavedMoviesLink={isSavedMoviesLink}
        countedCards={countedSavedMovies}
        handleIsActiveButtonSave={handleIsActiveButtonSave}
        handleDeleteMovies={handleDeleteMovies}
      />
      <More
        restCards={savedMovies}
        addMoreCards={handleSavedMovies}
      />
    </>
  )

}

export default SavedMovies;