import React, { useEffect } from "react";
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import More from "./More/More";


function Movies({ cards, countedCards, handleCountCards, handleIsActiveButtonSave, handleIsMoviesLink, handleSubmitSearchForm }) {

  useEffect(() => {
    handleIsMoviesLink();
    handleCountCards();
  }, [])

  return (
    <>
      <SearchForm
        handleSubmitSearchForm={handleSubmitSearchForm}
      />

      <MoviesCardList
        countedCards={countedCards}
        handleIsActiveButtonSave={handleIsActiveButtonSave}
      />

      <More
        restCards={cards}
        addMoreCards={handleCountCards}
      />
    </>
  )

}

export default Movies;