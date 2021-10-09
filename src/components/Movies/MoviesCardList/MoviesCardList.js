import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  Preloader,
  isPreloaderActive,
  isSavedMoviesLink,
  resultSearchMovies,
  handleIsActiveButtonSave,
  handleDeleteMovies,
}) {



  return (
    <section className="MoviesCardList">
      <div className="movies-card-list__grid">
        <Preloader
          isPreloaderActive={isPreloaderActive}
        />
        {resultSearchMovies.map((card, i) => {
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