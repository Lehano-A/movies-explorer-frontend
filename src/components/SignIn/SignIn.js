import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import mainApi from "../../utils/MainApi";

import {
  errorMessage,
} from './../../utils/constants/constants';

import { ValidationContext } from './../context/ValidationContext';

function SignIn({
  isMainLink,
  isRegLink,
  handleIsLoggedIn,
  handleIsLogLink,
  stringifyJSON,
  getMoviesFromStorage,
  getSavedMoviesStorage,
  getSavedMovies,
  setEmptySavedMoviesFromStorage,
  setActiveAuthAfterLogoutStorage,
  setActiveUserLoggedStorage,
  setActiveReloadedPageStorage,
  setCurrentUser,  
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


  const [loggedAfterGetDataProfile, setLoggedAfterGetDataProfile] = useState(false)

  const [isBlockedInput, setIsBlockedInput] = useState(false); // ЗАБЛОКИРОВАНЫ ЛИ ПОЛЯ, ВО ВРЕМЯ ЗАПРОСА

  const [errorSubmitMessage, setErrorSubmitMessage] = useState('')

  const handler = React.useContext(ValidationContext);

  const { errors, values, handleClickAtInputActive } = handler;

  const emailError = errors().email;

  const passwordError = errors().password;


  // АВТОРИЗАЦИЯ, ТОЛЬКО ПОСЛЕ ПОЛУЧЕНИЯ ПРОФАЙЛА
  useEffect(() => {
    if (loggedAfterGetDataProfile) {
      setLoggedAfterGetDataProfile(false);
      return handleIsLoggedIn();
    }
    return;
  }, [loggedAfterGetDataProfile])


  // ПОЛУЧЕНИЕ ДАННЫХ ПРОФАЙЛА
  function getDataUser() {
    mainApi.getUserData()
      .then((data) => {
        localStorage.setItem('dataUser', stringifyJSON(data.user));
        return setLoggedAfterGetDataProfile(true);
      })
      .catch((err) => { console.log(err) })
  }


  // АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function handleSubmitSignIn(e) {

    setIsBlockedInput(true)

    e.preventDefault()
    const emailValue = values().email;
    const passwordValue = values().password;

    mainApi.signIn(emailValue, passwordValue)
      .then((dataUser) => {
        getDataUser(); // ПОЛУЧЕНИЕ ДАННЫХ ПРОФАЙЛА

        if (!getSavedMoviesStorage()) { // ЕСЛИ НЕТ В ХРАНИЛИЩЕ СОХРАНЁННЫХ ФИЛЬМОВ
          setEmptySavedMoviesFromStorage(); // СОЗДАЁМ ПУСТОЙ МАССИВ
        }
        if (!getMoviesFromStorage()) { // ЕСЛИ НЕТ В ХРАНИЛИЩЕ ФИЛЬМОВ          
          getSavedMovies(); // ТОГДА СКАЧИВАЕМ МАССИВ С СЕРВЕРА
                            // ЕСЛИ НЕТ И НА СЕРВЕРЕ, ТО СОЗДАСТСЯ ПУСТОЙ МАССИВ
        }

        setActiveAuthAfterLogoutStorage();
        setActiveUserLoggedStorage();
        setActiveReloadedPageStorage();
        setCurrentUser(dataUser);
        setIsBlockedInput(false)
        return;
      })
      .catch((err) => {

        Object.keys(errorMessage).forEach((key) => {

          if (err === key) {
            handleClickAtInputActive();

            return setErrorSubmitMessage(
              <p className={`error__message_signin-signup error__message_signin-signup_active`}>{errorMessage[err]}</p>
            )
          }
        })
        console.log(err);
        return setIsBlockedInput(false)
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
          <span className={`form__not-valid ${passwordError} && 'form__not-valid_active'}`}>{passwordError}</span>
        </div>
      </Form>

    </div>
  )
}

export default SignIn;