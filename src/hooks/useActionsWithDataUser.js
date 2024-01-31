import mainApi from "../utils/MainApi";


function useActionsWithDataUser({
  changeDataUser,
  handleOpenNotificationPopup,
  abortController,
} = {}) {


  // ПОЛУЧИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ОТ СЕРВЕРА
  function getDataUserFromApi() {
    mainApi.getUserData(abortController)
      .then((data) => {
        saveDataUserInLocalStorage(data)
        saveDataUserInState(data)
      })
      .catch((err) => {
        handleOpenNotificationPopup('error', err)
      })
  }



  // СОХРАНИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ В СТЭЙТ
  function saveDataUserInState(data) {
    const dataUser = formatDataUser(data)
    changeDataUser(dataUser)
  }



  // СОХРАНИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ В ХРАНИЛИЩЕ
  function saveDataUserInLocalStorage(data) {
    const dataUser = formatDataUser(data)
    localStorage.setItem('dataUser', JSON.stringify(dataUser))
  }



  // ФОРМАТИРОВАТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
  function formatDataUser(data) {
    if (!data.name) {
      return {
        name: data.user.name,
        email: data.user.email,
      }
    }

    return data
  }



  return {
    getDataUserFromApi,
    saveDataUserInState,
    saveDataUserInLocalStorage,
  }
}

export default useActionsWithDataUser