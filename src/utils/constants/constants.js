
const PARAMS_FOR_FIRST_DISPLAY = {
  big: { from: 1210, quantity: 12 },
  middle: { from: 751, to: 1209, quantity: 8 },
  low: { from: 320, to: 750, quantity: 5 },
};

const PARAMS_AFTER_FIRST_DISPLAY = {
  big: { from: 1210, quantity: 3 },
  middle: { from: 751, to: 1209, quantity: 2 },
  low: { from: 320, to: 750, quantity: 1 },
};

const MAX_DURATION_SHORT_MOVIES = 40;

const BEATFILM_URL = 'https://api.nomoreparties.co';

const REGEX_EMAIL = /^[a-zA-Z0-9]+[-_.a-zA-Z0-9]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const REGEX_NAME = /^[a-zA-Z\s-]{1,50}$|^[а-яА-Я\s-]{1,50}$/
const REGEX_PASSWORD = /^.{7,30}$/

const ERROR_MESSAGES_FORM = {
  name: "Допустимо использовать символы: А-я, A-z, '-', пробел. Мин: 1, Макс: 50 символов",
  email: "Допустимо использовать символы: А-я, A-z, 123, '@', '-', '.', '_'. Мин: 6, Макс: 70 символов",
  password: "Мин: 7, Макс: 30 символов"
}

const MAIN_PATHNAME = '/'

const MOVIES_PATHNAME = '/movies'

const SAVED_MOVIES_PATHNAME = '/saved-movies'

const SIGNIN_PATHNAME = '/signin'

const SIGNUP_PATHNAME = '/signup'

const PROFILE_PATHNAME = '/profile'

export {
  PARAMS_FOR_FIRST_DISPLAY,
  PARAMS_AFTER_FIRST_DISPLAY,
  MAX_DURATION_SHORT_MOVIES,
  BEATFILM_URL,

  REGEX_EMAIL,
  REGEX_NAME,
  REGEX_PASSWORD,
  ERROR_MESSAGES_FORM,

  MAIN_PATHNAME,
  MOVIES_PATHNAME,
  SAVED_MOVIES_PATHNAME,
  SIGNIN_PATHNAME,
  SIGNUP_PATHNAME,
  PROFILE_PATHNAME,
};