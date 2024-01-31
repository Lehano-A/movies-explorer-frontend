// ПОЛУЧИТЬ ДАННЫХ ПОЛЬЗОВАТЕЛЯ ИЗ ХРАНИЛИЩА
function getDataUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem('dataUser'))
}

export default getDataUserFromLocalStorage