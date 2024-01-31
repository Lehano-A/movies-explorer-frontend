import mainApi from "../utils/MainApi";


function useButtonDeleteMovie({ handleOpenNotificationPopup }) {


  // ОБРАБОТАТЬ УДАЛЕНИЕ ФИЛЬМА
  function handleDeleteMovie(dataTargetCard, updateStatesAfterDeletionMovie, abortController) {
    const { _id } = dataTargetCard.card

    sendReqDeleteMovieToApi(_id, updateStatesAfterDeletionMovie, abortController)
  }


  // ОТПРАВИТЬ К СЕРВЕРУ ЗАПРОС УДАЛЕНИЯ ФИЛЬМА ИЗ СОХРАНЁННЫХ
  function sendReqDeleteMovieToApi(_id, updateStatesAfterDeletionMovie, abortController) {
    mainApi.deleteSavedMovie(_id, abortController)
      .then(() => { updateStatesAfterDeletionMovie(_id) })
      .catch((err) => {
        handleOpenNotificationPopup('error', err)
      })
  }



  return { handleDeleteMovie }
}

export default useButtonDeleteMovie