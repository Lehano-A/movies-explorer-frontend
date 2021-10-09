import React, { useEffect } from "react";
import MenuProfile from "../MenuProfile/MenuProfile";
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import More from "./More/More";
import Preloader from "./Preloader/Preloader";


function Movies({
  selectedCards,
  isMoviesLink,
  isProfileMenu,
  resultSearchMovies,
  pushedSubmitSearchForm,
  isPreloaderActive,
  handleCountCards,
  handleIsActiveButtonSave,
  handleIsMoviesLink,
  handleSubmitSearchForm,
  handleButtonCloseMenuProfile,
  handleSetValueInputSearchForm,
  handleShowResultSearchMovies,
}) {

  useEffect(() => {
    handleIsMoviesLink();
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
        handleSetValueInputSearchForm={handleSetValueInputSearchForm}
      />


      {resultSearchMovies && <MoviesCardList
        Preloader={Preloader}
        isPreloaderActive={isPreloaderActive}
        selectedCards={selectedCards}
        resultSearchMovies={resultSearchMovies}
        handleIsActiveButtonSave={handleIsActiveButtonSave}
        handleCountCards={handleCountCards}
        handleShowResultSearchMovies={handleShowResultSearchMovies}
      />}

      <More
        selectedCards={selectedCards}
        addMoreCards={handleCountCards}
      />
    </>
  )

}

export default Movies;