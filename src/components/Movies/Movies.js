import React, { useEffect } from "react";
import MenuProfile from "../MenuProfile/MenuProfile";
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import More from "./More/More";


function Movies({
  cards,
  countedCards,
  isMoviesLink,
  isProfileMenu,
  handleCountCards,
  handleIsActiveButtonSave,
  handleIsMoviesLink,
  handleSubmitSearchForm,
  handleButtonCloseMenuProfile, }) {

  useEffect(() => {
    handleIsMoviesLink();
    handleCountCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>

      <MenuProfile
        isMoviesLink={isMoviesLink}
        isProfileMenu={isProfileMenu}
        handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
      />

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