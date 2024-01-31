// ПРОВЕРИТЬ ПОЛЬЗОВАТЕЛЯ НА УСПЕШНЫЙ ВХОД
function checkUserLoggedIn() {
  if (localStorage.getItem('isLoggedIn')) {
    return true
  }
}

export default checkUserLoggedIn