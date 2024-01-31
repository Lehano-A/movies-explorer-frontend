import { useEffect, useState } from "react";
import mainApi from "../utils/MainApi";
import transformLinksImagesWhenNotActiveLike from "../utils/helpers/transformLinksImagesWhenNotActiveLike";


function useButtonSaveMovie({
  getSavedMoviesFromApi,
  handleOpenNotificationPopup,
  abortController
}) {

  const [timerNextUse, setTimerNextUse] = useState(null) // ВРЕМЕННАЯ БЛОКИРОВКА СОХРАНЕНИЯ


  useEffect(() => {
    return () => setTimerNextUse(null)
  }, [])


  // ОБРАБОТАТЬ СОХРАНЕНИЕ ФИЛЬМА
  function handleButtonSaveMovie(dataTargetCard) {
    if (!timerNextUse) {
      setTimerNextUse(true)
      setTimeout(setTimerNextUse, 400, false)

      const { card, _idSavedMovie = null, isActiveSavingIcon, setIsActiveSavingIcon } = dataTargetCard


      if (!isActiveSavingIcon) {
        const { imageLink, thumbnailLink } = transformLinksImagesWhenNotActiveLike(card)

        const dataForSaving = {
          ...card,
          imageURI: imageLink,
          thumbnailURI: thumbnailLink,
        }

        sendReqSaveMovieToApi(dataForSaving, setIsActiveSavingIcon, abortController)
      } else


        if (isActiveSavingIcon) {
          sendReqDeleteMovieToApi(_idSavedMovie, setIsActiveSavingIcon, abortController)
        }
    }
  }



  // ОТПРАВИТЬ ЗАПРОС НА СОХРАНЕНИЕ ФИЛЬМА
  function sendReqSaveMovieToApi(dataForSaving, setIsActiveSavingIcon, abortController) {

    mainApi.saveMovie(dataForSaving, abortController)
      .then(() => {
        setIsActiveSavingIcon(true) // ДОБАВЛЯЕМ АКТИВНЫЙ КЛАСС ИКОНКЕ
        getSavedMoviesFromApi() // ОТПРАВЛЯЕМ ЗАПРОС НА ПОЛУЧЕНИЕ ОБНОВЛЁННОЙ ПАЧКИ СОХРАНЁННЫХ ФИЛЬМОВ
      })
      .catch((err) => {
        handleOpenNotificationPopup('error', err)
      })
  }



  // // ОТПРАВИТЬ ЗАПРОС НА УДАЛЕНИЕ ФИЛЬМА ИЗ СОХРАНЁННЫХ
  function sendReqDeleteMovieToApi(id, setIsActiveSavingIcon, abortController) {

    mainApi.deleteSavedMovie(id, abortController)
      .then(() => {
        setIsActiveSavingIcon(false) // УБИРАЕМ АКТИВНОСТЬ С ИКОНКИ
        getSavedMoviesFromApi() // ОТПРАВЛЯЕМ ЗАПРОС НА ПОЛУЧЕНИЕ ОБНОВЛЁННОЙ ПАЧКИ СОХРАНЁННЫХ ФИЛЬМОВ
      })
      .catch((err) => {
        handleOpenNotificationPopup('error', err)
      })
  }















  // // ОБРАБОТАТЬ ССЫЛКИ ИЗОБРАЖЕНИЙ КАРТОЧКИ
  // function handleLinksImages(imageLink, thumbnailLink) {
  //   setImageURI(imageLink)
  //   setThumbnailURI(thumbnailLink)
  // }



  // // ОБРАБОТАТЬ КЛИК ПО КНОПКЕ "СОХРАНИТЬ"
  // function handleClickButtonSaveMovie(e) {
  //   handleSavingIcon(e, card, _idTargetCard, handleLinksImages, removeActivityFromIconButtonSave, abortController)
  // }



  // // АКТИВИРОВАТЬ ИКОНКУ КНОПКИ "СОХРАНИТЬ"
  // function activateIconButtonSave() {
  //   setIsActiveSavingIcon(true)
  // }



  // // УБРАТЬ АКТИВНОСТЬ С ИКОНКИ КНОПКИ "СОХРАНИТЬ"
  // function removeActivityFromIconButtonSave() {
  //   setIsActiveSavingIcon(false)
  // }



  return {
    sendReqDeleteMovieToApi,
    handleButtonSaveMovie,
  }
}

export default useButtonSaveMovie