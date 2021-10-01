import React from "react";
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import More from "./More/More";


function Movies({ cards, countedCards, handleCountCards, isActiveButtonSave, handleIsActiveButtonSave }) {

  return (
    <>
      <SearchForm />
      <MoviesCardList
        countedCards={countedCards}
        handleIsActiveButtonSave={handleIsActiveButtonSave}

      />
      <More
        cards={cards}
        handleCountCards={handleCountCards}
      />
    </>
  )

}

export default Movies;