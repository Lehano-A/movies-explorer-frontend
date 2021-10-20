class MoviesApi {

  constructor() {
    this.url = 'https://api.nomoreparties.co/beatfilm-movies';
  }

  getMovies() {
    return fetch(this.url)
      .then((res) => { return this._getResponse(res) })
  };

  _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json();
  }

}

const moviesApi = new MoviesApi();

export default moviesApi;