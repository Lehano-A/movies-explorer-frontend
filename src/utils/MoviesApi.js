class MoviesApi {
  constructor() {
  }


  getMovies() {

    return fetch('https://api.nomoreparties.co/beatfilm-movies')
      .then((res) => { return this._getResponse(res) })
  };

  _getResponse(res) {

    if (!res.ok) {
      Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json();
  }

}

const moviesApi = new MoviesApi();

export default moviesApi;