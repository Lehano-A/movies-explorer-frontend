import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import mainApi from "../../utils/MainApi";
import { ErrorMessage } from './../../utils/constants/constants';
import { ValidationContext } from './../context/ValidationContext';
import { stringifyJSON } from './../../utils/helpers/jsonHandler';

function SignIn({
  isMainLink,
  isRegLink,
  handleIsLogLink,
  getDataUser,
  getSavedMoviesStorage,
  setEmptySavedMoviesFromStorage,
  setActiveAuthAfterLogoutStorage,
  setActiveReloadedPageStorage,
  setCurrentUser,
  setIsAuth,
  setIsLoggedIn
}) {


  useEffect(() => {
    handleIsLogLink();
  }, []);


  useEffect(() => {

    if (isRegLink || isMainLink) {
      handler.errors().name = '';
      return handler.errors().email = '';
    }
    return;
  }, [isRegLink, isMainLink])


  const [isBlockedInput, setIsBlockedInput] = useState(false); // ЗАБЛОКИРОВАНЫ ЛИ ПОЛЯ, ВО ВРЕМЯ ЗАПРОСА

  const [errorSubmitMessage, setErrorSubmitMessage] = useState('');

  const handler = React.useContext(ValidationContext);

  const { errors, values, handleClickAtInputActive } = handler;

  const emailError = errors().email;

  const passwordError = errors().password;


  // АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function handleSubmitSignIn(e) {

    setIsBlockedInput(true);

    e.preventDefault()
    const emailValue = values().email.value;
    const passwordValue = values().password.value;

    mainApi.signIn(emailValue, passwordValue)
      .then((dataUser) => {
        getDataUser(); // ПОЛУЧЕНИЕ ДАННЫХ ПРОФАЙЛА
        setIsBlockedInput(false);
        if (!getSavedMoviesStorage()) { // ЕСЛИ НЕТ В ХРАНИЛИЩЕ КЛЮЧА СОХРАНЁННЫХ ФИЛЬМОВ
          setEmptySavedMoviesFromStorage(); // СОЗДАЁМ ПУСТОЙ МАССИВ
        }
        setActiveAuthAfterLogoutStorage();
        setActiveReloadedPageStorage();
        setCurrentUser(dataUser);
        setIsAuth(localStorage.setItem('isAuth', stringifyJSON(true)));
        setIsLoggedIn(true);
        return;
      })
      .catch((err) => {
        setIsBlockedInput(false);
        Object.keys(ErrorMessage).forEach((key) => {

          if (err === key) {
            handleClickAtInputActive();

            return setErrorSubmitMessage(
              <p className={`error__message_signin-signup error__message_signin-signup_active`}>{ErrorMessage[err]}</p>
            )
          }
        })
        console.log(err);
        return setIsBlockedInput(false);
      })
  }


  return (

    <div className="SignIn">

      <Form errorSubmitMessage={errorSubmitMessage} buttonName="Войти" handleSubmit={handleSubmitSignIn} regQuestion="Ещё не зарегистрированы?" inOrup="up" regOrLogin="Регистрация">
        <div className="form__input-box">
          <label htmlFor="email" className="form__label">E-mail</label>
          <input disabled={isBlockedInput && true} name="email" type="email" className="form__input" maxLength="43" required></input>
          <span htmlFor="email" className={`form__not-valid ${emailError && 'form__not-valid_active'}`}>{emailError}</span>

          <label htmlFor="password" className="form__label">Пароль</label>
          <input disabled={isBlockedInput && true} name="password" type="password" className="form__input" minLength="7" maxLength="30" autoComplete="off" required></input>
          <span htmlFor="password" className={`form__not-valid ${passwordError && 'form__not-valid_active'}`}>{passwordError}</span>
        </div>
      </Form>

    </div>
  )
}

export default SignIn;