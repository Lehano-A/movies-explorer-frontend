const WidthWindowForFirstCount = {
  big: { from: 1210, quantity: 12 },
  middle: { from: 751, to: 1209, quantity: 8 },
  low: { from: 320, to: 750, quantity: 5 },
}

const WidthWindowForSecondaryCounts = {
  big: { from: 1210, quantity: 3 },
  middle: { from: 751, to: 1209, quantity: 2 },
  low: { from: 320, to: 750, quantity: 1 },
}

const DurationMovie = 40;

const QuantitySavedMovies = 100;

const BeatFilmUrl = 'https://api.nomoreparties.co'

const RegexEmail = /^(([-_.]?([a-zA-Z0-9]))+)@([a-zA-Z0-9]+(-)?[a-zA-Z0-9]+)+.+([a-z]+){2}$/
const RegexName = /^[a-zA-Z]+$|^[а-яА-Я]+$/

const ErrorMessage = {
  '400': 'Данный запрос не может быть выполнен.',
  '401': 'Неправильные почта или пароль',
  '403': 'Вы не являетесь владельцем этой карточки',
  '409': 'Пользователь с таким email уже существует',
  '500': 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
}

export {
  WidthWindowForFirstCount,
  WidthWindowForSecondaryCounts,
  DurationMovie,
  QuantitySavedMovies,
  BeatFilmUrl,
  RegexEmail,
  RegexName,
  ErrorMessage,
}