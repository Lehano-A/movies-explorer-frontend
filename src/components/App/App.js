import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Main/Movies/Movies';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';

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
  const [isMainPage, setIsMainPage] = useState(false);

  const [isSignIn, setIsSignIn] = useState(false);

  const [cards, setCards] = useState(posters);// ВСЕ ИМЕЮЩИЕСЯ ФИЛЬМЫ
  const [countedCards, setCountedCards] = useState([]); // ОТБИРАЕМЫЕ ФИЛЬМЫ ПО 12 ШТУК

  const [savedMovies, setSavedMovies] = useState(mySavedMovies); // ВСЕ СОХРАНЁННЫЕ ФИЛЬМЫ
  const [countedSavedMovies, setCountedSavedMovies] = useState([]); // ОТБИРАЕМЫЕ СОХРАНЁННЫЕ ФИЛЬМЫ ПО 12 ШТУК


  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /signup
  function handleIsRegLink() {
    setIsRegLink(true)
    setIsLogLink(false)
    setIsProfileLink(false)
    setIsMoviesLink(false)
    setIsSavedMoviesLink(false)
    setIsMainPage(false)
    setIsPageNotFound(false)
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /signin
  function handleIsLogLink() {
    setIsLogLink(true)
    setIsRegLink(false)
    setIsProfileLink(false)
    setIsMoviesLink(false)
    setIsSavedMoviesLink(false)
    setIsMainPage(false)
    setIsPageNotFound(false)
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /profile
  function handleIsProfileLink() {
    setIsProfileLink(true)
    setIsLogLink(false)
    setIsRegLink(false)
    setIsMoviesLink(false)
    setIsSavedMoviesLink(false)
    setIsMainPage(false)
    setIsPageNotFound(false)
  }

  // ОБРАБОТЧИК СТЭЙТА КЛИКА НА ЛОГО САЙТА
  function handleClickByLogo() {
    setIsMainPage(true)
    setIsLogLink(false)
    setIsRegLink(false)
    setIsMoviesLink(false)
    setIsSavedMoviesLink(false)
    setIsPageNotFound(false)
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /saved-movies
  function handleIsSavedMoviesLink() {
    setIsSavedMoviesLink(true)
    setIsMainPage(false)
    setIsLogLink(false)
    setIsRegLink(false)
    setIsMoviesLink(false)
    setIsPageNotFound(false)
  }

  // ОБРАБОТЧИК СТЭЙТА ССЫЛКИ /movies
  function handleIsMoviesLink() {
    setIsMoviesLink(true)
    setIsMainPage(false)
    setIsLogLink(false)
    setIsRegLink(false)
    setIsSavedMoviesLink(false)
    setIsPageNotFound(false)
  }


  // ОБРАБОТЧИК СТРАНИЦЫ 404 - ОТКРЫТА
  function handlePageNotFoundOpened() {
    setIsPageNotFound(true)
  }

  // ОБРАБОТЧИК СТРАНИЦЫ 404 - ЗАКРЫТА
  function handlePageNotFoundClosed() {
    setIsPageNotFound(false)
  }

    // ЗАЛОГИНЕН ЛИ ПОЛЬЗОВАТЕЛЬ
  function handleIsSignIn() {
    setIsSignIn(true)
  }

  function handleSubmitSignIn(e) {
    e.preventDefault();
  }

  function handleSubmitSignUp(e) {
    e.preventDefault();
  }

  function handleEditProfile(e) {
    e.preventDefault();
  }

  function handleSubmitSearchForm(e) {
    e.preventDefault();
  }

  // ВРЕМЕННЫЙ ОБРАБОТЧИК КНОПКИ КАРТОЧКИ "СОХРАНИТЬ ФИЛЬМ"
  function handleIsActiveButtonSave(e) {
    e.target.classList.toggle('movies-card__button-save_active')
  }

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

  function handleSavedMovies() {
    const pickedCards = savedMovies.splice(0, 12);

    let currentCards = []

    pickedCards.forEach((card) => {
      currentCards.push(card)
    })

    setCountedSavedMovies((prevCards) => { return [...prevCards, ...currentCards] })
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
              handleCountCards={handleCountCards}
              handleIsActiveButtonSave={handleIsActiveButtonSave}
              handleIsMoviesLink={handleIsMoviesLink}
              handleSubmitSearchForm={handleSubmitSearchForm}
            />
          </Route>


          <Route path="/profile">
            <Profile
              handleEditProfile={handleEditProfile}
              handleIsProfileLink={handleIsProfileLink}
            />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies
              savedMovies={savedMovies}
              countedSavedMovies={countedSavedMovies}
              handleIsActiveButtonSave={handleIsActiveButtonSave}
              handleSavedMovies={handleSavedMovies}
              handleIsSavedMoviesLink={handleIsSavedMoviesLink}
            />
          </Route>


          <Route path="/signup">
            <SignUp
              handleIsRegLink={handleIsRegLink}
              handleSubmitSignUp={handleSubmitSignUp}
            />
          </Route>


          <Route path="/signin">
            <SignIn
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

      </div>
    </div>
  )
};

export default App;
