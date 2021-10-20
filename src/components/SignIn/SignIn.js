import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import mainApi from "../../utils/MainApi";
import { errorMessage } from './../../utils/constants/constants';
import { ValidationContext } from './../context/ValidationContext';

function SignIn({
  isMainLink,
  isRegLink,
  handleIsLoggedIn,
  handleIsLogLink,
  stringifyJSON,
  parseJSON,
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



  const [errorSubmitMessage, setErrorSubmitMessage] = useState('')

  const handler = React.useContext(ValidationContext);

  const { errors, values, handleClickAtInputActive } = handler;

  const emailError = errors().email;
  const emailValue = values().email;

  const passwordError = errors().password;
  const passwordValue = values().password;



  // АУТЕНТИФИКАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function handleSubmitSignIn(e) {

    e.preventDefault()

    mainApi.signIn(emailValue, passwordValue)
      .then((res) => {

        if (!parseJSON(localStorage.getItem('savedMovies'))) {
          localStorage.setItem('savedMovies', stringifyJSON([]));
        }
        localStorage.setItem('authAfterLogoutActive', stringifyJSON(true))
        localStorage.setItem('dataUser', stringifyJSON(res))
        localStorage.setItem('userLogged', stringifyJSON(true))
        localStorage.setItem('reloadedPage', stringifyJSON(true))

        return handleIsLoggedIn();
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
        return console.log(err);
      })
  }


  return (

    <div className="SignIn">

      <Form errorSubmitMessage={errorSubmitMessage} buttonName="Войти" handleSubmit={handleSubmitSignIn} regQuestion="Ещё не зарегистрированы?" inOrup="up" regOrLogin="Регистрация">
        <div className="form__input-box">
          <label htmlFor="email" className="form__label">E-mail</label>
          <input name="email" type="email" className="form__input" maxLength="43" required></input>
          <span htmlFor="email" className={`form__not-valid ${emailError && 'form__not-valid_active'}`}>{emailError}</span>

          <label htmlFor="password" className="form__label">Пароль</label>
          <input name="password" type="password" className="form__input" minLength="7" maxLength="30" autoComplete="off" required></input>
          <span className={`form__not-valid ${passwordError} && 'form__not-valid_active'}`}>{passwordError}</span>
        </div>
      </Form>

    </div>
  )
}

export default SignIn;