import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "./../Preloader/Preloader";


function MoviesCardList({
  isMoviesLink,
  isPreloaderActive,
  isMoviesNotFound,
  cards,
  isLoadedSavedMovies,
  getSavedMovies,
  setIsLoadedSavedMovies,
  isSavedMoviesLink,
  handleOpenPopup,
  handleSetIsLikedCard,
  handleDeleteMovies,
  handleDeleteCardfromDOM,
  setIsLikeRemoved,
  isFilterShortMovies,
}) {


  // ИЗМЕНЕНИЕ КЛЮЧА movieId НА id - ДЛЯ ИСПОЛЬЗОВАНИЯ В KEY В ОДНОМ ФОРМАТЕ
  function checkId(card) {
    if (card.movieId) {
      const newKey = {
        id: card.movieId,
      }
      return newKey.id;
    }
    return card.id;
  }


  return (
    <section className="MoviesCardList">

      <Preloader
        isPreloaderActive={isPreloaderActive}
      />

      {isMoviesNotFound ? <p className='movies-card-list__not-found'>Ничего не найдено</p> :

        <div className={`movies-card-list__grid ${!isPreloaderActive && 'movies-card-list__grid_active'}`}>
          {cards.map((card) => {

            return (
              <MoviesCard
                isMoviesLink={isMoviesLink}
                isSavedMoviesLink={isSavedMoviesLink}
                isLoadedSavedMovies={isLoadedSavedMovies}
                setIsLoadedSavedMovies={setIsLoadedSavedMovies}
                getSavedMovies={getSavedMovies}
                handleOpenPopup={handleOpenPopup}
                handleSetIsLikedCard={handleSetIsLikedCard}
                handleDeleteMovies={handleDeleteMovies}
                handleDeleteCardfromDOM={handleDeleteCardfromDOM}
                setIsLikeRemoved={setIsLikeRemoved}
                isFilterShortMovies={isFilterShortMovies}              
                key={checkId(card)}
                card={card}
              />
            )
          })}
        </div>


      }
    </section >
  )

}

export default MoviesCardList;