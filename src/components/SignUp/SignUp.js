import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import mainApi from "../../utils/MainApi";
import { ValidationContext } from './../context/ValidationContext'
import { stringifyJSON } from "../../utils/helpers/jsonHandler";
import { errorMessage } from "././../../utils/constants/constants";


function SignUp({
  isMainLink,
  isLogLink,
  handleIsLoggedIn,
  handleSetFirstLoggingUserActive,
  handleIsRegLink,
  handleRedirectMovies,
}) {


  useEffect(() => {
    handleIsRegLink();
  }, []);


  useEffect(() => {

    if (isLogLink || isMainLink) {
      handler.errors().name = '';
      return handler.errors().email = '';
    }
    return;

  }, [isLogLink, isMainLink])

  const [errorSubmitMessage, setErrorSubmitMessage] = useState('')

  const handler = React.useContext(ValidationContext);

  const { errors, values, handleClickAtInputActive } = handler;

  const { name, email, password } = errors();

  const emailValue = values().email;

  const passwordValue = values().password;

  const namedValue = values().name;

  const [dataForAuth, setDataForAuth] = useState({})

  const [successReg, setSuccessReg] = useState(false)


  function authAfterReg() {
    mainApi.signIn(dataForAuth.email, dataForAuth.password)
      .then((user) => {
        handleSetFirstLoggingUserActive(); // ПЕРВОЕ ПОСЕЩЕНИЕ ПОЛЬЗОВАТЕЛЯ
        return console.log(user)
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
        return console.log(err)
      })
  }


  useEffect(() => {
    if (dataForAuth && successReg) {

      return authAfterReg()
    }
    return;
  }, [dataForAuth, successReg])


  // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function handleSubmitSignUp(e) {
    e.preventDefault();

    mainApi.signUp(namedValue, emailValue, passwordValue)
      .then((user) => {
        console.log(user)
        setDataForAuth({
          email: emailValue,
          password: passwordValue,
        })
        setSuccessReg(true);
        handleRedirectMovies();
        localStorage.setItem('dataUser', stringifyJSON(user));
        localStorage.setItem('userLogged', stringifyJSON(true));
        localStorage.setItem('savedMovies', stringifyJSON([]));
        localStorage.setItem('authAfterLogoutActive', stringifyJSON(true));

        handleIsLoggedIn();
      })
      .catch((err) => {
        console.log(err)
        Object.keys(errorMessage).forEach((key) => {

          if (err === key) {
            handleClickAtInputActive();

            return setErrorSubmitMessage(
              <p className={`error__message_signin-signup error__message_signin-signup_active`}>{errorMessage[err]}</p>
            )
          }
        })
        console.log(err)
        return;
      })
  }

  return (

    <div className="SignUp">

      <Form errorSubmitMessage={errorSubmitMessage} handleSubmit={handleSubmitSignUp} buttonName="Зарегистрироваться" regQuestion="Уже зарегистрированы?" inOrup="in" regOrLogin="Войти">

        <label htmlFor="name" className="form__label">Имя</label>
        <input name="name" type="text" className="form__input" minLength="2" maxLength="30" autoComplete="off" required></input>
        <span className={`form__not-valid ${name && 'form__not-valid_active'}`}>{name}</span>

        <label htmlFor="email" className="form__label">E-mail</label>
        <input name="email" type="email" className="form__input" maxLength="43" autoComplete="off" required></input>
        <span className={`form__not-valid ${email && 'form__not-valid_active'}`}>{email}</span>

        <label htmlFor="password" className="form__label">Пароль</label>
        <input name="password" type="password" className="form__input" minLength="7" maxLength="30" autoComplete="off" required></input>
        <span className={`form__not-valid ${email && 'form__not-valid_active'}`}>{password}</span>

      </Form>

    </div>
  )

}

export default SignUp;