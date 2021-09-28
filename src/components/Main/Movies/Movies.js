import React from "react";
import Header from '../../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import More from "./More/More";


function Movies({ handleIsCountCards }) {

  return (
    <>
      <SearchForm />
      <MoviesCardList
        handleIsCountCards={handleIsCountCards}
      />
      <More />
    </>
  )

}

export default Movies;