class MainApi {

  // eslint-disable-next-line no-useless-constructor
  constructor() {
  }

  // АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ
  signIn(email, password) {

    return fetch('https://moviefan.nomoredomains.club/signin', {
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

  // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
  signUp(name, email, password) {

    return fetch('https://moviefan.nomoredomains.club/signup', {
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

  _getResponse(res) {

    if (!res.ok) {
      Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json();
  }

}

const apiUsers = new MainApi();

export default apiUsers;
