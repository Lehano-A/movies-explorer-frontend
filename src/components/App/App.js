import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';

import Error from '../Error/Error';

import oneC from "./../../images/posters/1.jpg";
import twoC from "./../../images/posters/2.jpg";
import treeC from "./../../images/posters/3.jpg";
import fourC from "./../../images/posters/4.jpg";
import fiveC from "./../../images/posters/5.jpg";
import sixC from "./../../images/posters/6.jpg";
import sevenC from "./../../images/posters/7.jpg";
import eightC from "./../../images/posters/8.jpg";
import nineC from "./../../images/posters/9.jpg";
import tenC from "./../../images/posters/10.jpg";
import elevenC from "./../../images/posters/11.jpg";
import twelveC from "./../../images/posters/12.jpg";
import thirtyC from "./../../images/posters/13.jpg";

const posters = [{ 1: oneC }, { 2: twoC }, { 3: treeC }, { 4: fourC }, { 5: fiveC }, { 6: sixC }, { 7: sevenC }, { 8: eightC }, { 9: nineC }, { 10: tenC }, { 11: elevenC }, { 12: twelveC }, { 13: thirtyC }];
const mySavedMovies = [{ 2: twoC }, { 5: fiveC }, { 9: nineC }, { 12: twelveC }, { 5: fiveC }, { 9: nineC }, { 12: twelveC }, { 5: fiveC }, { 9: nineC }, { 12: twelveC }, { 5: fiveC }, { 9: nineC }, { 12: twelveC }, { 5: fiveC }, { 9: nineC }, { 12: twelveC }]

function App() {

  const [isRegLink, setIsRegLink] = useState(false);
  const [isLogLink, setIsLogLink] = useState(false);
  const [isProfileLink, setIsProfileLink] = useState(false);
  const [isMoviesLink, setIsMoviesLink] = useState(false);
  const [isSavedMoviesLink, setIsSavedMoviesLink] = useState(false);
  const [isPageNotFound, setIsPageNotFound] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);

  const [cards,] = useState(posters);// ВСЕ ИМЕЮЩИЕСЯ ФИЛЬМЫ
  const [countedCards, setCountedCards] = useState([]); // ОТБИРАЕМЫЕ ФИЛЬМЫ ПО 12 ШТУК

  const [savedMovies,] = useState(mySavedMovies); // ВСЕ СОХРАНЁННЫЕ ФИЛЬМЫ
  const [countedSavedMovies, setCountedSavedMovies] = useState([]); // ОТБИРАЕМЫЕ СОХРАНЁННЫЕ ФИЛЬМЫ ПО 12 ШТУК

  const [formSignUpInputs, setFormSignUpInputs] = useState({ // ПОЛЯ ФОРМЫ РЕГИСТРАЦИИ
    name: '',
    email: '',
    password: '',
  })

  const [formSignInInputs, setFormSignInInputs] = useState({ // ПОЛЯ ФОРМЫ АУТЕНТИФИКАЦИИ
    email: '',
    password: '',
  })

  const [formProfileInputs, setFormProfileInputs] = useState({ // ПОЛЯ ФОРМЫ АУТЕНТИФИКАЦИИ
    name: '',
    email: '',
  })

  const [error, setError] = useState(false)

  // ОБРАБОТЧИК ПОЯВЛЕНИЯ ОКНА ОШИБКИ
  function handleOpenError() {
    setError(true);
  }

  // ОБРАБОТЧИК ЗАКРЫТИЯ ОКНА ОШИБКИ
  function handleCloseError() {
    setError(false);
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /signup
  function handleIsRegLink() {
    setIsRegLink(true)
    setIsLogLink(false)
    setIsProfileLink(false)
    setIsMoviesLink(false)
    setIsSavedMoviesLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /signin
  function handleIsLogLink() {
    setIsLogLink(true)
    setIsRegLink(false)
    setIsProfileLink(false)
    setIsMoviesLink(false)
    setIsSavedMoviesLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /profile
  function handleIsProfileLink() {
    setIsProfileLink(true)
    setIsLogLink(false)
    setIsRegLink(false)
    setIsMoviesLink(false)
    setIsSavedMoviesLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }

  // ОБРАБОТЧИК СТЭЙТА КЛИКА НА ЛОГО САЙТА (главная страница)
  function handleClickByLogo() {
    setIsLogLink(false)
    setIsRegLink(false)
    setIsMoviesLink(false)
    setIsProfileLink(false)
    setIsSavedMoviesLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /saved-movies
  function handleIsSavedMoviesLink() {
    setIsSavedMoviesLink(true)
    setIsLogLink(false)
    setIsRegLink(false)
    setIsMoviesLink(false)
    setIsProfileLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /movies
  function handleIsMoviesLink() {
    setIsMoviesLink(true)
    setIsLogLink(false)
    setIsRegLink(false)
    setIsSavedMoviesLink(false)
    setIsProfileLink(false)
    setIsPageNotFound(false)
    setIsProfileMenu(false)
  }


  // ОБРАБОТЧИК СТРАНИЦЫ 404 - ОТКРЫТА
  function handlePageNotFoundOpened() {
    setIsPageNotFound(true)
  }


  // ОТКРЫВАЕМ МЕНЮ ПРОФАЙЛА (ПРИ НАЖАТИИ НА КНОПКУ ГАМБУРГЕРА)
  function handleIsProfileMenu() {
    setIsProfileMenu(true)
  }

  // ЗАКРЫВАЕМ МЕНЮ ПРОФАЙЛА (ПРИ НАЖАТИИ НА КНОПКУ ГАМБУРГЕРА)
  function handleButtonCloseMenuProfile() {
    setIsProfileMenu(false)
  }

  function handleSubmitSignIn(e) {
    e.preventDefault();
  }

  function handleEditProfile(e) {
    e.preventDefault();
  }

  function handleSubmitSearchForm(e) {
    e.preventDefault();
  }

  // РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ
  function handleSubmitSignUp(e) {
    e.preventDefault();
    const { name, email, password } = formSignUpInputs;

    return fetch('https://moviefan.nomoredomains.monster/signup', {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`,
        password: `${password}`
      }),
    })
      .then((res) => { return res.json() })
      .then((res) => { console.log(res); handleOpenError() })
      .catch((err) => { console.log(err) })
  }

  // ВРЕМЕННЫЙ ОБРАБОТЧИК КНОПКИ КАРТОЧКИ "СОХРАНИТЬ ФИЛЬМ"
  function handleIsActiveButtonSave(e) {
    e.target.classList.toggle('movies-card__button-save_active')
  }


  /* -------------------------------------------------------------------------- */
  /*                       ОБРАБОТЧИК ПОЛЕЙ ФОРМ (НАЧАЛО)                       */
  /* -------------------------------------------------------------------------- */

  function handleInputsForm(e) {

    const baseUri = e.target.form.baseURI;

    const signUpEndPoint = handleIncludes(baseUri, 'signup')
    const signInEndPoint = handleIncludes(baseUri, 'signin')
    const profileEndPoint = handleIncludes(baseUri, 'profile')

    if (signUpEndPoint) {
      handleInputs(e, setFormSignUpInputs, formSignUpInputs)
    }
    if (signInEndPoint) {
      handleInputs(e, setFormSignInInputs, formSignInInputs)
    }
    if (profileEndPoint) {
      handleInputs(e, setFormProfileInputs, formProfileInputs)
    }
  }

  // ОБРАБОТЧИК ПОЛЕЙ
  function handleInputs(e, setter, setVar) {
    const input = e.target.name;
    const value = e.target.value;

    setter({
      ...setVar,
      [input]: value,
    })

  }

  // СОДЕРЖИТ ЛИ ССЫЛКА НУЖНЫЙ ЭНДПОИНТ
  function handleIncludes(uri, endpoint) {
    return uri.includes(endpoint);
  }

  /* -------------------------------------------------------------------------- */
  /*                        ОБРАБОТЧИК ПОЛЕЙ ФОРМ (КОНЕЦ)                       */
  /* -------------------------------------------------------------------------- */


  /*
  // ОБРАБОТЧИК ПОЛЕЙ ФОРМЫ АУТЕНТИФИКАЦИИ
  function handleSignInInputs(e) {

    const input = e.target.name;
    const value = e.target.value;

    setSignInInputs({
      ...signInInputs,
      [input]: value,
    })
  }
  */



  // ОБРАБОТЧИК ОТБОРА 12 КАРТОЧЕК
  // СРАБАТЫВАЕТ В САМОМ НАЧАЛЕ, ПОСЛЕ РЕНДЕРА ПРИЛОЖЕНИЯ - ОДИН РАЗ,
  // А ТАКЖЕ, КАЖДЫЙ РАЗ ПРИ НАЖАТИИ КНОПКИ "ЕЩЁ" В КОМПОНЕНТЕ <MORE />
  function handleCountCards() {
    const pickedCards = cards.splice(0, 12);

    let currentCards = []

    pickedCards.forEach((card) => {
      currentCards.push(card)
    })

    // К ПРЕДЫДУЩИМ КАРТОЧКАМ УЖЕ НАХОДЯЩИХСЯ В МАССИВЕ (prevCards) - ДОБАВЛЯЕМ НОВЫЕ,
    // КОТОРЫЕ ОТОБРАЛИ В КОЛИЧЕСТВЕ ДО 12 ШТУК КНОПКОЙ "ЕЩЁ" (currentCards)
    setCountedCards((prevCards) => { return [...prevCards, ...currentCards] })
  }

  // ОБРАБОТЧИК СОХРАНЕНИЯ ФИЛЬМА
  function handleSavedMovies() {
    const pickedCards = savedMovies.splice(0, 12);

    let currentCards = []

    pickedCards.forEach((card) => {
      currentCards.push(card)
    })

    setCountedSavedMovies((prevCards) => { return [...prevCards, ...currentCards] })
  }

  // ОБРАБОТЧИК УДАЛЕНИЯ ФИЛЬМА
  function handleDeleteMovies() {

  }

  return (

    <div className="page">
      <div className="page__box">

        <Header
          isRegLink={isRegLink}
          isLogLink={isLogLink}
          isProfileLink={isProfileLink}
          isMoviesLink={isMoviesLink}
          isSavedMoviesLink={isSavedMoviesLink}
          isPageNotFound={isPageNotFound}
          handleIsRegLink={handleIsRegLink}
          handleIsLogLink={handleIsLogLink}
          handleIsProfileLink={handleIsProfileLink}
          handleClickByLogo={handleClickByLogo}
          handleIsProfileMenu={handleIsProfileMenu}
        />

        <Switch>

          <Route exact path="/">
            <Main
              handleClickByLogo={handleClickByLogo}
            />
          </Route>

          <Route path="/movies">
            <Movies
              cards={cards}
              countedCards={countedCards}
              isMoviesLink={isMoviesLink}
              isProfileMenu={isProfileMenu}
              handleCountCards={handleCountCards}
              handleIsActiveButtonSave={handleIsActiveButtonSave}
              handleIsMoviesLink={handleIsMoviesLink}
              handleSubmitSearchForm={handleSubmitSearchForm}
              handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
            />
          </Route>


          <Route path="/profile">
            <Profile
              isProfileLink={isProfileLink}
              isProfileMenu={isProfileMenu}
              handleEditProfile={handleEditProfile}
              handleIsProfileLink={handleIsProfileLink}
              handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
              handleIsMoviesLink={handleIsMoviesLink}
              handleIsSavedMoviesLink={handleIsSavedMoviesLink}
            />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies
              savedMovies={savedMovies}
              countedSavedMovies={countedSavedMovies}
              isSavedMoviesLink={isSavedMoviesLink}
              isProfileMenu={isProfileMenu}
              handleIsActiveButtonSave={handleIsActiveButtonSave}
              handleSavedMovies={handleSavedMovies}
              handleDeleteMovies={handleDeleteMovies}
              handleIsSavedMoviesLink={handleIsSavedMoviesLink}
              handleButtonCloseMenuProfile={handleButtonCloseMenuProfile}
            />
          </Route>


          <Route path="/signup">
            <SignUp
              handleInputsForm={handleInputsForm}
              handleIsRegLink={handleIsRegLink}
              handleSubmitSignUp={handleSubmitSignUp}
            />
          </Route>


          <Route path="/signin">
            <SignIn
              handleInputsForm={handleInputsForm}
              handleIsLogLink={handleIsLogLink}
              handleSubmitSignIn={handleSubmitSignIn}
            />
          </Route>


          <Route path="*">
            <PageNotFound
              handlePageNotFoundOpened={handlePageNotFoundOpened}
            />
          </Route>


        </Switch>

        <Footer
          isPageNotFound={isPageNotFound}
          isProfileLink={isProfileLink}
        />

        <Error
          error={error}
          handleCloseError={handleCloseError}
        />

      </div>
    </div>
  )
};

export default App;
