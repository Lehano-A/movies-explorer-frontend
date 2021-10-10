import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  Preloader,
  selectedCards,
  isPreloaderActive,
  isSavedMoviesLink,
  handleIsActiveButtonSave,
  handleDeleteMovies,
}) {


  return (
    <section className="MoviesCardList">
      <Preloader
        isPreloaderActive={isPreloaderActive}
      />
      <div className="movies-card-list__grid">

        {selectedCards.map((card, i) => {
          return (
            <MoviesCard
              isSavedMoviesLink={isSavedMoviesLink}
              handleIsActiveButtonSave={handleIsActiveButtonSave}
              handleDeleteMovies={handleDeleteMovies}
              key={i}
              card={card}
            />
          )
        })}

      </div>
    </section>
  )

}

export default MoviesCardList;