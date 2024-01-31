import React, { useEffect, useState } from "react";
import getTimeFromMinutes from '../../../utils/helpers/timeFromMinutes';
import { BEATFILM_URL } from '../../../utils/constants/constants';
import ButtonSave from "./ButtonSave/ButtonSave";
import ButtonDelete from "./ButtonDelete/ButtonDelete";


function MoviesCard({
  card,
  idCard,
  isTargetCard,
  setDataTargetCard,
  loadedSavedMovies,
  isSavedMoviesCurrentPathname,
  abortController,
}) {

  const { duration, nameRU, } = card
  const trailerURI = card.trailerLink

  const [isActiveSavingIcon, setIsActiveSavingIcon] = useState(null) // АКТИВНАЯ ЛИ ИКОНА СОХРАНЕНИЯ
  const [_idSavedMovie, set_idSavedMovie] = useState(null) // _id СОХРАНЁННОГО ФИЛЬМА



  useEffect(() => {
    return () => abortController.abort()
  }, [])



  useEffect(() => {

    // ЕСЛИ ТЕКУЩАЯ КАРТОЧКА - ЯВЛЯЕТСЯ ЦЕЛЕВОЙ КАРТОЧКОЙ (НА КОТОРОЙ ПРОИЗОШЁЛ КЛИК)
    if (isTargetCard) {
      if (_idSavedMovie) {
        setDataTargetCard({ card, isActiveSavingIcon, _idSavedMovie: _idSavedMovie, setIsActiveSavingIcon }) // ОТПРАВЛЯЕМ НА УДАЛЕНИЕ
      } else

        if (!_idSavedMovie) {
          setDataTargetCard({ card, isActiveSavingIcon, setIsActiveSavingIcon }) // ОТПРАВЛЯЕМ НА СОХРАНЕНИЕ
        }
    }
  }, [isTargetCard])




  return (
    <figure id={idCard} className="movies-card" >

      <div className="movies-card__poster-box">
        <a href={trailerURI} target="_blank" rel='noreferrer'>
          <img
            className="movies-card__poster"
            src={card.thumbnail ? card.image : `${BEATFILM_URL}${card.image.url}`}
            alt="Постер фильма"
          />
        </a>
      </div>


      <div className="movies-card__title-duration-button-box">
        <figcaption className="movies-card__title-duration-box">
          <p className="movies-card__title">{nameRU}</p>
          <p className="movies-card__duration">{getTimeFromMinutes(duration)}</p>
        </figcaption>


        {
          isSavedMoviesCurrentPathname ?
            <ButtonDelete />
            :
            <ButtonSave
              card={card}
              isActiveSavingIcon={isActiveSavingIcon}
              setIsActiveSavingIcon={setIsActiveSavingIcon}
              set_idSavedMovie={set_idSavedMovie}
              loadedSavedMovies={loadedSavedMovies}
            />
        }
      </div>

    </figure>
  )
}

export default MoviesCard;