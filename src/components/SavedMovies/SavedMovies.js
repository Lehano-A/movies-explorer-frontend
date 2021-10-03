import React, { useEffect } from "react";
import SearchForm from "../Main/Movies/SearchForm/SearchForm";
import MoviesCardList from "../Main/Movies/MoviesCardList/MoviesCardList";
import More from "../Main/Movies/More/More";

function SavedMovies({ savedMovies, countedSavedMovies, handleSavedMovies, handleIsSavedMoviesLink, handleIsActiveButtonSave }) {

  useEffect(() => {
    handleIsSavedMoviesLink();
    handleSavedMovies();
  }, [])


  return (
    <>
      <SearchForm />
      <MoviesCardList
        countedCards={countedSavedMovies}
        handleIsActiveButtonSave={handleIsActiveButtonSave}
      />
      <More
        restCards={savedMovies}
        addMoreCards={handleSavedMovies}
      />
    </>
  )

}

export default SavedMovies;