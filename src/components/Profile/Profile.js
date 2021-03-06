import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
import MenuProfile from "../MenuProfile/MenuProfile";
import mainApi from "../../utils/MainApi";
import { ValidationContext } from './../context/ValidationContext';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { parseJSON, stringifyJSON } from './../../utils/helpers/jsonHandler';
import { ErrorMessage } from "../../utils/constants/constants";

function Profile({
  isProfileLink,
  isProfileMenu,
  isMoviesLink,
  isSavedMoviesLink,
  handleOpenPopup,
  handleIsNotLoggedIn,
  handleIsProfileLink,
  handleButtonCloseMenuProfile,
  setShowAllSavedCards,
  setMoviesBoxForMore,
  setFoundMoviesAfterSearchApi,
  setMoviesFromApi,
  setFilterAfterSearchShortFromApi,
  setIsMoviesNotFound,
  setCurrentSearchMoviesFromApi,
  setCurrentSearchInLocalSavedMovies,
  setIsSubmitProfileDisabled,
  setCurrentUser,
  setFilterSearchShortFromLocal,
  setMoviesFromLocal,
  setValues,
  setIsSavedMoviesDownloaded,
  goToMainPage
}) {


  useEffect(() => {
    if (isMoviesLink || isSavedMoviesLink) {
      handler.errors().name = '';
      return handler.errors().email = '';
    }
    return;
  }, [isMoviesLink, isSavedMoviesLink])


  const [isBlockedInput, setIsBlockedInput] = useState(false); // ЗАБЛОКИРОВАНЫ ЛИ ПОЛЯ, ВО ВРЕМЯ ЗАПРОСА

  const nameUser = parseJSON(localStorage.getItem('dataUser'));

  const [titleName, setTitleName] = useState(nameUser.name); // Привет, 'nameUser'

  const [errorSubmitMessage, setErrorSubmitMessage] = useState('');

  const profileSubmitStyle = 'profile__button-submit_disabled';
  // КОНТЕКСТ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const currentUser = React.useContext(CurrentUserContext);
  const { name, email } = currentUser;

  useEffect(() => {
    setValues({ ...values, name: { value: name }, email: { value: email } });
    handleIsProfileLink();
  }, []);

  // КОНТЕКСТ ВАЛИДАЦИИ ФОРМ
  const handler = React.useContext(ValidationContext);
  const { errors, values, handleClickAtInputActive } = handler;
  const nameValue = values().name.value;
  const emailValue = values().email.value;
  const nameError = errors().name;
  const emailError = errors().email;


  // РЕДАКТИРОВАНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  function editUserData(e) {
    setIsBlockedInput(true);

    e.preventDefault();

    mainApi.editUserData({ name: nameValue, email: emailValue })
      .then((user) => {
        setTitleName(nameValue);
        handleOpenPopup({ active: true, message: 'Данные успешно обновлены' });
        setIsSubmitProfileDisabled(true);
        localStorage.setItem('dataUser', stringifyJSON(user));
        setCurrentUser(parseJSON(localStorage.getItem('dataUser')));
        return setIsBlockedInput(false);
      })
      .catch((err) => {
        Object.keys(ErrorMessage).forEach((key) => {

          if (err === key) {
            handleClickAtInputActive();

            return setErrorSubmitMessage(
              <p className={`error__message_profile-position error__message_signin-signup_active`}>{ErrorMessage[err]}</p>
            )
          }
        })
        console.log(err);
        setIsBlockedInput(false);
        return;
      })
  }


  // РАЗЛОГИНИВАНИЕ ПОЛЬЗОВАТЕЛЯ
  function logoutUser(e) {
    e.preventDefault();

    mainApi.logoutUser()
      .then(() => {
        setValues({ name: { value: '', isValid: false }, email: { value: '', isValid: false }, password: { value: '', isValid: false } });
        setIsSavedMoviesDownloaded(false);
        setShowAllSavedCards(false);
        setMoviesBoxForMore([]);
        setFoundMoviesAfterSearchApi([]);
        setMoviesFromApi([]);
        setFilterAfterSearchShortFromApi([]);
        setFilterSearchShortFromLocal([]);
        setMoviesFromLocal([]);
        setIsMoviesNotFound(false); // УБИРАЕМ НАДПИСЬ - "НИЧЕГО НЕ НАЙДЕНО"
        setCurrentSearchMoviesFromApi(false); // СИГНАЛ, ЧТО ПОИСК ОТ API
        setCurrentSearchInLocalSavedMovies(false); // СИГНАЛ, ЧТО ПОИСК ЛОКАЛЬНЫЙ
        localStorage.removeItem('timeBetweenRequests');
        localStorage.removeItem('reloadedPage')
        localStorage.removeItem('dataUser');
        localStorage.removeItem('userLogged');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('pressedSubmit');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('authAfterLogoutActive');
        handleIsNotLoggedIn();
        return goToMainPage();
      })
      .catch((err) => {

        Object.keys(ErrorMessage).forEach((key) => {

          if (err === key) {
            handleClickAtInputActive();
            return (
              <p className={`error__message_profile-position error__message_signin-signup_active`}>{ErrorMessage[err]}</p>
            )
          }
        })
        console.log(err);
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

      <h1 className="profile__hello-title">Привет, {titleName}!</h1>
      <Form errorSubmitMessage={errorSubmitMessage} handleSubmit={editUserData} profilesubmitstyle={profileSubmitStyle} profileFormHeight="profile__form-height" profileButton="profile__button-submit" buttonName="Редактировать">

        <div className="profile__inputs-box">

          <span className={`form__not-valid form__not-valid_profile ${nameError && "form__not-valid_active"}`}>{nameError}</span>

          <div className="profile__name-box">
            <label htmlFor="name" className="profile__label">Имя</label>
            <input disabled={isBlockedInput && true} name="name" defaultValue={name} id="name" type="text" className="profile__input" minLength="2" maxLength="30" autoComplete="off" required></input>
          </div>

          <div className="profile__email-box">
            <label htmlFor="email" className="profile__label">E-mail</label>
            <input disabled={isBlockedInput && true} name="email" defaultValue={email} id="email" type="email" className="profile__input" maxLength="43" autoComplete="off" required></input>
          </div>

          <span className={`form__not-valid form__not-valid_profile ${emailError && 'form__not-valid_active'}`}>{emailError}</span>

        </div>

      </Form>
      <button onClick={logoutUser} className="profile__logout">Выйти из аккаунта</button>
    </div>
  )
}

export default Profile;