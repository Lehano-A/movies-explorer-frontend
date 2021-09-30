import React from "react";

function MoviesCard({ card, handleIsActiveButtonSave }) {
  return (

    <figure className="MoviesCard" >

      <div className="movies-card__poster-box">
        <img className="movies-card__poster" src={Object.values(card).toString()} alt="Постер фильма"></img>
      </div>

      <div className="movies-card__title-duration-button-box">
        <figcaption className="movies-card__title-duration-box">
          <p className="movies-card__title">Лига справедливости Зака Снайдера</p>
          <p className="movies-card__duration">1ч 47м</p>
        </figcaption>
        <button onClick={handleIsActiveButtonSave} className={'movies-card__button-save'}></button>
      </div>

    </figure>

  )

}

export default MoviesCard;