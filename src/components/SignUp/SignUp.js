import React, { useState, useEffect, useRef } from "react";
import Form from "../Form/Form";
import mainApi from "../../utils/MainApi";
import { ValidationContext } from './../context/ValidationContext'
import { stringifyJSON } from "../../utils/helpers/jsonHandler";
import { ErrorMessage } from "././../../utils/constants/constants";


function SignUp({
  isMainLink,
  isLogLink,
  handleIsRegLink,
  handleRedirectMovies,
  setCurrentUser,
  setActiveAfterRegBeforeFirstSubmitStorage,
  setActiveAuthAfterLogoutStorage,
  setEmptyMoviesFromStorage,
  setEmptySavedMoviesFromStorage,
  getDataUser,
  setIsAuth,
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


  const _isMounted = useRef(true);

  const [isBlockedInput, setIsBlockedInput] = useState(false); // ЗАБЛОКИРОВАНЫ ЛИ ПОЛЯ, ВО ВРЕМЯ ЗАПРОСА

  const [errorSubmitMessage, setErrorSubmitMessage] = useState('');

  const handler = React.useContext(ValidationContext);

  const { errors, values, handleClickAtInputActive } = handler;

  const { name, email, password } = errors();

  const [dataForAuth, setDataForAuth] = useState({}); // ДАННЫЕ ДЛЯ АВТОАУТЕНТИФИКАЦИИ

  const [successReg, setSuccessReg] = useState(false);



  // АВТОАУТЕНТИФИКАЦИЯ, ПОСЛЕ РЕГИСТРАЦИИ
  function authAfterReg() {
    setDataForAuth({});
    setSuccessReg(false);

    mainApi.signIn(dataForAuth.email, dataForAuth.password)
      .then((dataUser) => {
        getDataUser(); // ПОЛУЧЕНИЕ ДАННЫХ ПРОФАЙЛА
        setActiveAuthAfterLogoutStorage();
        setEmptyMoviesFromStorage();
        setEmptySavedMoviesFromStorage();
        handleRedirectMovies();
        setCurrentUser(dataUser);
        return setIsAuth(localStorage.setItem('isAuth', stringifyJSON(true)));
      })
      .catch((err) => {

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


  useEffect(() => {
    if (_isMounted.current) {
      if (dataForAuth && successReg) {
        return authAfterReg();
      }
      return
    }
  }, [dataForAuth, successReg])



  // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function handleSubmitSignUp(e) {
    setIsBlockedInput(true);

    e.preventDefault();

    const nameValue = values().name.value;
    const emailValue = values().email.value;
    const passwordValue = values().password.value;

    mainApi.signUp(emailValue, passwordValue, nameValue)
      .then((user) => {
        setDataForAuth({
          email: emailValue,
          password: passwordValue,
        });
        setSuccessReg(true);
        localStorage.setItem('dataUser', stringifyJSON({ name: user.name, email: user.email }));
        setActiveAfterRegBeforeFirstSubmitStorage(); // УДАЛИТСЯ ИЗ ХРАНИЛИЩА, КАК ТОЛЬКО ОСУЩЕСТВИТСЯ ПЕРВЫЙ ПОИСК
        setEmptySavedMoviesFromStorage();
        setActiveAuthAfterLogoutStorage();
        setIsBlockedInput(false);
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
        console.log(err)
        return;
      })
  }


  return (

    <div className="SignUp">

      <Form errorSubmitMessage={errorSubmitMessage} handleSubmit={handleSubmitSignUp} buttonName="Зарегистрироваться" regQuestion="Уже зарегистрированы?" inOrup="in" regOrLogin="Войти">

        <label htmlFor="name" className="form__label">Имя</label>
        <input disabled={isBlockedInput && true} name="name" type="text" className="form__input" minLength="2" maxLength="30" autoComplete="off" required></input>
        <span className={`form__not-valid ${name && 'form__not-valid_active'}`}>{name}</span>

        <label htmlFor="email" className="form__label">E-mail</label>
        <input disabled={isBlockedInput && true} name="email" type="email" className="form__input" maxLength="43" autoComplete="off" required></input>
        <span className={`form__not-valid ${email && 'form__not-valid_active'}`}>{email}</span>

        <label htmlFor="password" className="form__label">Пароль</label>
        <input disabled={isBlockedInput && true} name="password" type="password" className="form__input" minLength="7" maxLength="30" autoComplete="off" required></input>
        <span className={`form__not-valid ${password && 'form__not-valid_active'}`}>{password}</span>

      </Form>

    </div>
  )

}

export default SignUp;