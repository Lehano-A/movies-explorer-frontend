const widthWindowForFirstCount = {
  big: { from: 1210, quantity: 12 },
  middle: { from: 751, to: 1209, quantity: 8 },
  low: { from: 320, to: 750, quantity: 5 },
}

const widthWindowForSecondaryCounts = {
  big: { from: 1210, quantity: 3 },
  middle: { from: 751, to: 1209, quantity: 2 },
  low: { from: 320, to: 750, quantity: 1 },
}

const beatFilmUrl = 'https://api.nomoreparties.co'

const regexEng = /^[\u0400-\u04FF\s-]+$/
const regexRu = /^[\u0061-\u007A\s-]+$/

const errorMessage = {
  '400': 'Данный запрос не может быть выполнен.',
  '401': 'Неправильные почта или пароль',
  '403': 'Вы не являетесь владельцем этой карточки',
  '409': 'Пользователь с таким email уже существует',
  '500': 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
}

export {
  widthWindowForFirstCount,
  widthWindowForSecondaryCounts,
  beatFilmUrl,
  regexEng,
  regexRu,
  errorMessage,
}