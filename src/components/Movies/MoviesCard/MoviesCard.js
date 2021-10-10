import React from "react";
import getTimeFromMinutes from './../../../utils/helperFunctions'


function MoviesCard({
  card,
  isSavedMoviesLink,
  handleIsActiveButtonSave,
  handleDeleteMovies }) {


  return (

    <figure className="MoviesCard" >

      <div className="movies-card__poster-box">
        <a href={card.trailerLink} target="_blank" rel='noreferrer'><img className="movies-card__poster" src={`https://api.nomoreparties.co${card.image.url}`} alt="Постер фильма"></img></a>
      </div>


      <div className="movies-card__title-duration-button-box">
        <figcaption className="movies-card__title-duration-box">
          <p className="movies-card__title">{card.nameRU}</p>
          <p className="movies-card__duration">{getTimeFromMinutes(card.duration)}</p>
        </figcaption>
        <button onClick={isSavedMoviesLink ? handleDeleteMovies : handleIsActiveButtonSave} className={`${isSavedMoviesLink ? 'movies-card__button-delete' : 'movies-card__button-save'}`}></button>
      </div>

    </figure>

  )

}

export default MoviesCard;