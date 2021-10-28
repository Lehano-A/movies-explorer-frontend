import React, { useState, useEffect, useRef } from "react";
import getTimeFromMinutes from '../../../utils/helpers/timeFromMinutes';
import mainApi from "../../../utils/MainApi";
import { beatFilmUrl } from '../../../utils/constants/constants';
import { errorMessage } from './../../../utils/constants/constants';

function MoviesCard({
  isMoviesLink,
  card,
  isLoadedSavedMovies,
  getSavedMovies,
  isSavedMoviesLink,
  handleOpenPopup,
  handleDeleteCardfromDOM,
  setIsLikeRemoved,
}) {


  const _isMounted = useRef(true);

  const [image, setImage] = useState('');

  const [thumbnail, setThumbnail] = useState('');

  const [trailer, setTrailer] = useState('');

  const [isPressedButtonSave, setIsPressedButtonSave] = useState(null); // НАЖАЛИ ЛИ КНОПКУ

  const [iconSaveButton, setIconSaveButton] = useState(null); //  СТОИТ ИЛИ НЕ СТОИТ ЛАЙК (ТЕКУЩЕЕ СОСТОЯНИЕ)

  const [isLocalLikedMovie, setIsLocalLikedMovie] = useState(false); // ПРОВЕРКА ХРАНИЛИЩА НА СОХРАНЁННУЮ КАРТОЧКУ

  const [isSignalForSaveApi, setIsSignalForSaveApi] = useState(false);

  const [isPressedButtonDelete, setIsPressedButtonDelete] = useState(false); // НАЖАТА ЛИ КНОПКА УДАЛЕНИЯ - /saved-movies

  const [timer, setTimer] = useState(false); // ТАЙМЕР НА КНОПКУ СОХРАНЕНИЯ ФИЛЬМА

  const [idCard, setIdCard] = useState(''); // id (или _id) - ДЛЯ УДАЛЕНИЯ - /movies и /saved-movies

  const { country, director, duration, year, description, nameEN, nameRU, id } = card;


  // ОБРАБОТЧИК ДОБАВЛЕНИЯ КОРРЕКТНОГО КЛЮЧА image
  function handleSetImage(data) {
    setImage(data)
  }

  // ОБРАБОТЧИК ДОБАВЛЕНИЯ КЛЮЧА thumbnail ДЛЯ ВОЗМОЖНОСТИ СОХРАНЕНИЯ КАРТОЧКИ
  function handleSetThumbnail(data) {
    setThumbnail(data)
  }

  // ОБРАБОТЧИК СБРОСА image
  function handleSetImageReset() {
    setImage('')
  }

  // ОБРАБОТЧИК СБРОСА thumbnail
  function handleSetThumbnailReset() {
    setThumbnail('')
  }

  // ЕСТЬ СИГНАЛ ДЛЯ СОХРАНЕНИЯ ФИЛЬМА
  function handleSetIsSignalForSaveApiYes() {
    setIsSignalForSaveApi(true)
  }

  // НЕТ СИГНАЛА ДЛЯ СОХРАНЕНИЯ ФИЛЬМА
  function handleSetIsSignalForSaveApiNo() {
    setIsSignalForSaveApi(false)
  }

  // ИЗМЕНЕНИЕ ИКОНКИ ЛАЙКА
  // КОГДА ФИЛЬМЫ ЗАГРУЗИЛИСЬ В ЛОКАЛЬНОЕ ХРАНИЛИЩЕ
  useEffect(() => {
    if (isMoviesLink) { // ЕСЛИ ОТКРЫТА СТРАНИЦА /movies
      if (isLocalLikedMovie) {
        handleAddClassIconButtonActive() // ДОБАВИЛИ АКТИВНЫЙ КЛАСС ИКОНКЕ
      }
    }
  }, [isLocalLikedMovie, isMoviesLink])


  // ОБРАБОТКА КЛЮЧЕЙ trailer - trailerLink
  // ЗАПИСЫВАЕМ URI trailer В ЗАВИСИМОСТИ ОТ ТОГО, КАКАЯ КАРТОЧКА ПРИШЛА:
  // СОХРАНЁННАЯ КАРТОЧКА ИЛИ С BEATFILM
  useEffect(() => {
    let valueTrailer = null;

    if (card.trailer) {
      valueTrailer = card.trailer;
    } else {
      valueTrailer = card.trailerLink
    }
    setTrailer(valueTrailer)
  }, [])


  useEffect(() => {
    if (iconSaveButton === false) {
      setIsLikeRemoved(true) // ДЛЯ /saved-movies
    }
  }, [iconSaveButton])


  // ДЕЛАЕМ ЛАЙК - АКТИВЕН
  function handleAddClassIconButtonActive() {
    setIconSaveButton('movies-card__button-save_active');
  }


  // ДЕЛАЕМ ЛАЙК - НЕАКТИВЕН
  function handleAddClassIconButtonNotActive() {

    setIconSaveButton(false)
  }


  // КНОПКА СОХРАНЕНИЯ - НАЖАТА
  function handlePressButtonSavePressed() {
    setIsPressedButtonSave(true)
  }


  // КНОПКА СОХРАНЕНИЯ - СОСТОЯНИЕ СБРОШЕНО
  function handlePressButtonSaveNotPressed() {
    setIsPressedButtonSave(false)
  }


  // КНОПКА УДАЛЕНИЯ - АКТИВНА - /saved-movies
  function handleSetIsPressedButtonDeleteActive() {
    setIsPressedButtonDelete(true)
  }


  // КНОПКА УДАЛЕНИЯ - НЕАКТИВНА - /saved-movies
  function handleSetIsPressedButtonDeleteNotActive() {
    setIsPressedButtonDelete(false)
  }


  // ВКЛЮЧИЛИ ТАЙМЕР
  function handleSetTimerActive() {
    setTimer(true)
  }


  // ОПРЕДЕЛЕНИЕ ТИП КНОПКИ КАРТОЧКИ (КНОПКА ЛАЙК ИЛИ УДАЛЕНИЕ)
  function getCurrentIconButton() {
    return isSavedMoviesLink ? 'movies-card__button-delete' : 'movies-card__button-save'
  }


  // ПОЛУЧЕНИЕ ФИЛЬМОВ ИЗ ХРАНИЛИЩА
  function getMoviesLocalStorage() {
    return JSON.parse(localStorage.getItem('savedMovies'))
  }


  // ПРОВЕРКА КАРТОЧЕК НА ЛАЙК - /movies
  useEffect(() => {
    if (isLoadedSavedMovies) {
      checkLike()
    }
  }, [isLoadedSavedMovies]) // ЕСЛИ СОХРАНЁННЫЕ ФИЛЬМЫ ЗАГРУЖЕНЫ В ХРАНИЛИЩЕ


  // ПРОВЕРКА КАРТОЧЕК НА ЛАЙК (СТАВИТСЯ, ЕСЛИ ОНА НАШЛАСЬ В ХРАНИЛИЩЕ - НА СТРАНИЦЕ /movies)
  function checkLike() {
    const savedMovies = getMoviesLocalStorage() // БЕРЁМ ФИЛЬМЫ ИЗ ХРАНИЛИЩА

    savedMovies.forEach((idSavedCard) => {
      if (idSavedCard.movieId === card.id) { // ЕСЛИ ТЕКУЩАЯ КАРТОЧКА НАШЛАСЬ В ХРАНИЛИЩЕ
        setIsLocalLikedMovie(true) // ТОГДА ЛАЙК - АКТИВЕН
      }
    })
  }


  // ПОЛУЧЕНИЕ _id (КАК В БД) ДЛЯ ВОЗМОЖНОСТИ УДАЛИТЬ ФИЛЬМ ПО ТОГГЛУ - /movies
  function get_IdCurrentCardFromLocal() {
    const localMovies = getMoviesLocalStorage();

    localMovies.forEach((movie) => {
      if (movie.movieId === card.id) { // ЕСЛИ СОВПАЛ id с movieId

        setIdCard(movie._id)
      }
    })
  }


  // 1 - SAVE
  // КНОПКА СОХРАНЕНИЯ
  function buttonSave(e) {
    if (!timer) {
      handleSetTimerActive() // ВКЛЮЧИЛИ ТАЙМЕР
      setTimeout(setTimer, 400, false);
      handlePressButtonSavePressed() // СООБЩАЕМ, ЧТО БЫЛА НАЖАТА КНОПКА

      const button = e.currentTarget.classList;
      const activeLike = button.contains('movies-card__button-save_active') // СТОИТ ИЛИ НЕ СТОИТ ЛАЙК

      if (activeLike) { // ЕСЛИ ЛАЙК АКТИВЕН

        get_IdCurrentCardFromLocal(); // ТО ПОЛУЧАЕМ _id ТЕКУЩЕЙ КАРТОЧКИ ИЗ ХРАНИЛИЩА
        return buttonDelete() // И ДЕЛАЕМ ЗАПРОС НА УДАЛЕНИЕ
      }

      handleSetIsSignalForSaveApiYes() // РАЗРЕШЕНИЕ НА СОХРАНЕНИЕ (СИГНАЛ ДЛЯ ФУНКЦИИ)
    }
    return;
  }


  // 2 - SAVE
  // ОБРАБОТКА ПЕРЕД ПЕРЕДАЧЕЙ ДАННЫХ В API
  // ЕСЛИ ПОСТАВИЛИ ЛАЙК, ТОГДА ДЕЛАЕМ ПРОВЕРКУ НАЛИЧИЯ thumbnail
  useEffect(() => {
    if (isPressedButtonSave && isSignalForSaveApi) {
      if (card.thumbnail) {
        const imageUri = `${card.image}`

        handleSetImage(imageUri)
        handleSetThumbnail(card.thumbnail)
        return;
      }
      handleSetImage(`${beatFilmUrl}${card.image.url}`)
      handleSetThumbnail(`${beatFilmUrl}${card.image.formats.thumbnail.url}`)
    }
  }, [isPressedButtonSave, isSignalForSaveApi])


  // 3 - SAVE
  // ЗАПРОС НА СОХРАНЕНИЕ ФИЛЬМА
  useEffect(() => {
    if (_isMounted.current) {
      if (thumbnail) {
        saveMovie();
      }
      return;
    }
  }, [thumbnail]) // ЕСЛИ ПОЯВИЛСЯ КЛЮЧ С ИЗОБРАЖЕНИЕМ ДЛЯ КАРТОЧКИ


  // 4 - SAVE
  // API СОХРАНЕНИЕ ФИЛЬМА
  function saveMovie() {

    mainApi.saveMovie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameEN,
      nameRU,
      thumbnail,
      id,
    }
    )
      .then(() => {
        handleSetImageReset() // ДЕФОЛТИМ СОСТОЯНИЕ image
        handleSetThumbnailReset() // ДЕФОЛТИМ СОСТОЯНИЕ thumbnail
        handleAddClassIconButtonActive() // ДОБАВЛЯЕМ АКТИВНЫЙ КЛАСС ИКОНКЕ
        handlePressButtonSaveNotPressed() // ДЕФОЛТИМ СОСТОЯНИЕ КНОПКИ
        handleSetIsSignalForSaveApiNo() // ДЕФОЛТИМ РАЗРЕШЕНИЕ НА СОХРАНЕНИЕ
        return getSavedMovies() // ОБНОВЛЯЕМ ХРАНИЛИЩЕ
      })
      .catch((err) => {
        console.log(err);

        return handleOpenPopup({ active: true, message: errorMessage[500] })
      })
  }


  // 1 - DELETE
  // КНОПКА УДАЛЕНИЯ КАРТОЧКИ - /saved-movies
  function buttonDelete() {

    if (isSavedMoviesLink) {
      setIdCard(card._id)
    }

    handleSetIsPressedButtonDeleteActive() // СООБЩИЛИ, ЧТО КНОПКА УДАЛЕНИЯ НАЖАТА
  }


  // 2 - DELETE
  // ЗАПРОС НА УДАЛЕНИЕ ФИЛЬМА
  useEffect(() => {
    if (_isMounted.current) {
      if (isPressedButtonDelete) {
        deleteMovie();
        handleSetIsPressedButtonDeleteNotActive() // СБРОСИЛИ СОСТОЯНИЕ УДАЛЕНИЯ
      }
    }
  }, [isPressedButtonDelete]) // ЕСЛИ КНОПКУ УДАЛЕНИЯ КАРТОЧКИ НАЖАЛИ


  // 3 - DELETE
  // API УДАЛЕНИЯ ФИЛЬМА ИЗ СОХРАНЁННЫХ
  function deleteMovie() {
    mainApi.deleteSavedMovie(idCard)
      .then(() => {
        handlePressButtonSaveNotPressed() // ДЕФОЛТИМ СОСТОЯНИЕ КНОПКИ
        handleAddClassIconButtonNotActive() // УБИРАЕМ АКТИВНЫЙ КЛАСС С ИКОНКИ

        if (isSavedMoviesLink) { // ЕСЛИ ОТКРЫТА СТРАНИЦА /saved-movies
          handleDeleteCardfromDOM(idCard); // УДАЛЯЕМ КАРТОЧКУ ИЗ DOM
        }
        return getSavedMovies() // ОБНОВЛЯЕМ ХРАНИЛИЩЕ
      })
      .catch((err) => {
        console.log(err)

        if (err === '403') {
          return handleOpenPopup({ active: true, message: errorMessage[403] })
        }

        return handleOpenPopup({ active: true, message: errorMessage[500] })

      })
  }


  return (

    <figure className="MoviesCard" >

      <div className="movies-card__poster-box">
        <a href={trailer} target="_blank" rel='noreferrer'><img className="movies-card__poster" src={card.thumbnail ? card.image : `${beatFilmUrl}${card.image.url}`} alt="Постер фильма"></img></a>
      </div>

      <div className="movies-card__title-duration-button-box">
        <figcaption className="movies-card__title-duration-box">
          <p className="movies-card__title">{nameRU}</p>
          <p className="movies-card__duration">{getTimeFromMinutes(duration)}</p>
        </figcaption>
        <button onClick={isSavedMoviesLink ? buttonDelete : buttonSave} className={`${getCurrentIconButton()} ${iconSaveButton}`}></button>
      </div>

    </figure>

  )
}

export default MoviesCard;