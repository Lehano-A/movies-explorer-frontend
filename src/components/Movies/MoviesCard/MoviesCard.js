import React from "react";


function MoviesCard({
  card,
  isSavedMoviesLink,
  handleIsActiveButtonSave,
  handleDeleteMovies }) {

  return (

      <figure className="MoviesCard" >

        <div className="movies-card__poster-box">
          <img className="movies-card__poster" src={`https://api.nomoreparties.co${card.image.url}`} alt="Постер фильма"></img>
        </div>

        <div className="movies-card__title-duration-button-box">
          <figcaption className="movies-card__title-duration-box">
            <p className="movies-card__title">{card.nameRU}</p>
            <p className="movies-card__duration">{card.duration}</p>
          </figcaption>
          <button onClick={isSavedMoviesLink ? handleDeleteMovies : handleIsActiveButtonSave} className={`${isSavedMoviesLink ? 'movies-card__button-delete' : 'movies-card__button-save'}`}></button>
        </div>

      </figure>

  )

}

export default MoviesCard;