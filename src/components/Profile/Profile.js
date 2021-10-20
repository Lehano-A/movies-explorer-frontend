import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import MenuProfile from "../MenuProfile/MenuProfile";
import mainApi from "../../utils/MainApi";
import { ValidationContext } from './../context/ValidationContext';
import { LoggedInContext } from './../context/LoggedInContext';
import { stringifyJSON } from './../../utils/helpers/jsonHandler';
import { errorMessage } from "../../utils/constants/constants";


function Profile({
  isProfileLink,
  isProfileMenu,
  isMoviesLink,
  isSavedMoviesLink,
  handleOpenPopup,
  handleSetInputsProfile,
  handleIsNotLoggedIn,
  handleIsProfileLink,
  handleButtonCloseMenuProfile,
  goToMainPage,
  setShowAllSavedCards,
  setMoviesBoxForMore,
  setFoundMoviesAfterSearchApi,
  setMoviesFromApi,
  setFilterAfterSearchShortFromApi,
  setIsMoviesNotFound,
  setCurrentSearchMoviesFromApi,
  setCurrentSearchInLocalSavedMovies,
}) {

  useEffect(() => {

    if (isMoviesLink || isSavedMoviesLink) {
      handler.errors().name = '';
      return handler.errors().email = '';
    }
    return;
  }, [isMoviesLink, isSavedMoviesLink])


  const dataUserContext = React.useContext(LoggedInContext)

  const [errorSubmitMessage, setErrorSubmitMessage] = useState('')

  const profileSubmitStyle = 'profile__button-submit_disabled';

  const [titleName, setTitleName] = useState('');

  const userEmailContext = dataUserContext.email;
  const userNameContext = dataUserContext.name;
  const handler = React.useContext(ValidationContext);

  const { errors, values, handleClickAtInputActive } = handler;

  const nameValue = values().name;
  const emailValue = values().email;
  const nameError = errors().name;
  const emailError = errors().email;


  useEffect(() => {
    handleIsProfileLink();
    getDataUserFromLocal();
  }, []);

  useEffect(() => {

  }, [isMoviesLink, isSavedMoviesLink])

  // ПОЛУЧЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА
  function getDataUserFromLocal() {
    const data = JSON.parse(localStorage.getItem('dataUser'));
    handleSetInputsProfile(
      {
        name: data.name,
        email: data.email
      }
    )
    return;
  }

  
  // ОБРАБОТЧИК ПУСТЫХ ПОЛЕЙ ПРИ ОБНОВЛЕНИИ
  function changeVoidValue() {
    if (!emailValue) {
      return { name: nameValue, email: userEmailContext }
    }
    if (!nameValue) {
      return { name: userNameContext, email: emailValue }
    }
    return { name: nameValue, email: emailValue }
  }


  // РЕДАКТИРОВАНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  function editUserData(e) {
    e.preventDefault();
    console.log(emailValue === false, nameValue)
    mainApi.editUserData(changeVoidValue())
      .then((user) => {
        handleOpenPopup({ active: true, message: 'Данные успешно обновлены' })
        setTitleName(user.name)
        console.log(user)
        return localStorage.setItem('dataUser', stringifyJSON(user))
      })
      .catch((err) => {
        Object.keys(errorMessage).forEach((key) => {

          if (err === key) {
            handleClickAtInputActive();

            return setErrorSubmitMessage(
              <p className={`error__message_profile-position error__message_signin-signup_active`}>{errorMessage[err]}</p>
            )
          }
        })
        console.log(err)
        return;
      })
  }



  // РАЗЛОГИНИВАНИЕ ПОЛЬЗОВАТЕЛЯ
  function logoutUser(e) {
    e.preventDefault();

    mainApi.logoutUser()
      .then((user) => {
        console.log(user)

        setShowAllSavedCards(false);
        setMoviesBoxForMore([]);
        setFoundMoviesAfterSearchApi([]);
        setMoviesFromApi([]);
        setFilterAfterSearchShortFromApi([]);
        setIsMoviesNotFound(false) // УБИРАЕМ НАДПИСЬ - "НИЧЕГО НЕ НАЙДЕНО"
        setCurrentSearchMoviesFromApi(false) // СИГНАЛ, ЧТО ПОИСК ОТ API
        setCurrentSearchInLocalSavedMovies(false) // СИГНАЛ, ЧТО ПОИСК ЛОКАЛЬНЫЙ
        localStorage.removeItem('reloadedPage')
        localStorage.removeItem('dataUser');
        localStorage.removeItem('userLogged');
        handleIsNotLoggedIn();
        return goToMainPage();
      })
      .catch((err) => {

        Object.keys(errorMessage).forEach((key) => {

          if (err === key) {

            handleClickAtInputActive();
            return (
              <p className={`error__message_profile-position error__message_signin-signup_active`}>{errorMessage[err]}</p>
            )
          }
        })
        console.log(err)
        return;
      })
  }

  return (
    <div className="Profile">

      <MenuProfile
        isProfileLink={isProfileLink}
        isProfileMenu={isProfileMenu}
        handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
      />

      <h1 className="profile__hello-title">Привет, {titleName ? titleName : userNameContext}!</h1>
      <Form errorSubmitMessage={errorSubmitMessage} handleSubmit={editUserData} profilesubmitstyle={profileSubmitStyle} profileFormHeight="profile__form-height" profileButton="profile__button-submit" buttonName="Редактировать">

        <div className="profile__inputs-box">

          <span className={`form__not-valid form__not-valid_profile ${nameError && "form__not-valid_active"}`}>{nameError}</span>

          <div className="profile__name-box">
            <label htmlFor="name" className="profile__label">Имя</label>
            <input name="name" defaultValue={userNameContext || nameValue} id="name" type="text" className="profile__input" minLength="2" maxLength="30" autoComplete="off" required></input>
          </div>

          <div className="profile__email-box">
            <label htmlFor="email" className="profile__label">E-mail</label>
            <input name="email" defaultValue={userEmailContext || emailValue} id="email" type="email" className="profile__input" maxLength="43" autoComplete="off" required></input>
          </div>

          <span className={`form__not-valid form__not-valid_profile ${emailError && 'form__not-valid_active'}`}>{emailError}</span>

        </div>

      </Form>
      <button onClick={logoutUser} className="profile__logout">Выйти из аккаунта</button>
    </div>
  )
}

export default Profile;