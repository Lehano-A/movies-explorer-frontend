class MainApi {

  constructor() {
    this.baseUrl = 'https://diplom.lehano.ru/api';
  }


  // АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ
  signIn(data) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => { return this._getResponse(res); })
  };



  // РЕДАКТИРОВАНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  editUserData(data, abortController) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      withCredentials: true,
      credentials: 'include',
      signal: abortController.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => { return this._getResponse(res); })
  };



  // ПОЛУЧЕНИЕ ДАННЫХ ПРОФАЙЛА
  getUserData(abortController) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      signal: abortController.signal
    })
      .then((res) => { return this._getResponse(res); })
  };



  // РАЗЛОГИНИВАНИЕ ПОЛЬЗОВАТЕЛЯ
  logoutUser() {
    return fetch(`${this.baseUrl}/users/logout`, {
      withCredentials: true,
      credentials: 'include',
    })
      .then((res) => { return this._getResponse(res); })
  };



  // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
  signUp(data) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => { return this._getResponse(res); })
  };



  // ПОЛУЧЕНИЕ СОХРАНЁННЫХ ФИЛЬМОВ
  getSavedMovies(abortController) {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      signal: abortController.signal
    })
      .then((res) => { return this._getResponse(res); })
  };



  // СОХРАНЕНИЕ ФИЛЬМА
  saveMovie(data, abortController) {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.imageURI,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnailURI,
        nameEN: data.nameEN,
        nameRU: data.nameRU,
        movieId: data.id,
      }),
    })
      .then((res) => { return this._getResponse(res); })
  };



  // УДАЛЕНИЕ СОХРАНЁННОГО ФИЛЬМА
  deleteSavedMovie(idCard, abortController) {
    return fetch(`${this.baseUrl}/movies/${idCard}`, {
      method: 'DELETE',
      withCredentials: true,
      credentials: 'include',
      signal: abortController.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => { return this._getResponse(res); })
  };



  _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(res.json());
    }
    return res.json();
  }
}

const mainApi = new MainApi();

export default mainApi;
