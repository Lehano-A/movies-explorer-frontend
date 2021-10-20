class MainApi {

  constructor() {
    this.baseUrl = 'https://moviefan.nomoredomains.club';
  }


  // АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ
  signIn(email, password) {

    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`
      }),
    })
      .then((res) => { return this._getResponse(res) })
  };



  // РЕДАКТИРОВАНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  editUserData(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${data.name}`,
        email: `${data.email}`
      }),
    })
      .then((res) => { return this._getResponse(res) })
  };



  // РАЗЛОГИНИВАНИЕ ПОЛЬЗОВАТЕЛЯ
  logoutUser() {

    return fetch(`${this.baseUrl}/users/logout`, {
      withCredentials: true,
      credentials: 'include',
    })
      .then((res) => { return this._getResponse(res) })
  };



  // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
  signUp(name, email, password) {

    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`,
        password: `${password}`
      }),
    })
      .then((res) => { return this._getResponse(res) })
  };



  // ПОЛУЧЕНИЕ СОХРАНЁННЫХ ФИЛЬМОВ
  getSavedMovies() {
    return fetch(`${this.baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => { return this._getResponse(res) })
  };



  // СОХРАНЕНИЕ ФИЛЬМА
  saveMovie(data) {

    return fetch(`${this.baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: `${data.country}`,
        director: `${data.director}`,
        duration: `${data.duration}`,
        year: `${data.duration}`,
        description: `${data.description}`,
        image: `${data.image}`,
        trailer: `${data.trailer}`,
        nameRU: `${data.nameRU}`,
        nameEN: `${data.nameEN}`,
        thumbnail: `${data.thumbnail}`,
        movieId: `${data.id}`,
      }),
    })
      .then((res) => { return this._getResponse(res) })
  };



  // УДАЛЕНИЕ СОХРАНЁННОГО ФИЛЬМА
  deleteSavedMovie(idCard) {
    return fetch(`${this.baseUrl}/movies/${idCard}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => { return this._getResponse(res) })
  };



  _getResponse(res) {

    if (!res.ok) {
      return Promise.reject(`${res.status}`)
    }
    return res.json();
  }
}

const mainApi = new MainApi();

export default mainApi;
