import React from "react";
import buttonSave from './../../../../images/button_save_icon.svg';
const posterMovie = 'https://games.mail.ru/hotbox/content_files/news/2021/03/11/a39f3faf699941e2921f40d58df3593d.jpg'

function MoviesCard(props) {

  return (

    <figure className="MoviesCard">

      <div className="movies-card__poster-box">
        <img className="movies-card__poster" src={Object.values(props).toString()} alt="Постер фильма"></img>
      </div>

      <div className="movies-card__title-duration-button-box">
        <figcaption className="movies-card__title-duration-box">
          <p className="movies-card__title">Лига справедливости Зака Снайдера</p>
          <p className="movies-card__duration">1ч 47м</p>
        </figcaption>
        <button className="movies-card__button-save"></button>
      </div>

    </figure>

  )

}

export default MoviesCard;