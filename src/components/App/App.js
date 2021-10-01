import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';



import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Main/Movies/Movies';
import SignUp from '../Main/SignUp/SignUp'
import SignIn from '../Main/SignIn/SignIn'

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



function App() {


  const [isRegLink, setIsRegLink] = useState(false);
  const [isLogLink, setIsLogLink] = useState(false);
  const [isProfileLink, setIsProfileLink] = useState(false);

  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  const [cards, setCards] = useState(posters)
  const [countedCards, setCountedCards] = useState([])


  useEffect(() => {
    handleCountCards();
  }, [])

  // ОБРАБОТЧИК ССЫЛКИ РЕГИСТРАЦИИ
  function handleIsReg() {
    setIsRegLink(true)
    setIsLogLink(false)
    setIsProfileLink(false)
  }

  // ОБРАБОТЧИК ССЫЛКИ АУТЕНТИФИКАЦИИ
  function handleIsLog() {
    setIsLogLink(true)
    setIsRegLink(false)
    setIsProfileLink(false)
  }

  // ОБРАБОТЧИК ССЫЛКИ ПРОФАЙЛА
  function handleIsProfile() {
    setIsProfileLink(true)
    setIsLogLink(false)
    setIsRegLink(false)
  }

  function handleClickByLogo() {
    setIsProfileLink(false)
    setIsLogLink(false)
    setIsRegLink(false)
  }

  // ЗАЛОГИНЕН ЛИ ПОЛЬЗОВАТЕЛЬ
  function handleIsSignUp() {
    setIsSignUp(true)
  }

  // ЗАРЕГИСТРИРОВАН ЛИ ПОЛЬЗОВАТЕЛЬ
  function handleIsSignIn() {
    setIsSignIn(true)
  }

  function handleSubmitSignIn(e) {
    e.preventDefault();
  }

  function handleSubmitSignUp(e) {
    e.preventDefault();
  }



  // ВРЕМЕННЫЙ ОБРАБОТЧИК КНОПКИ КАРТОЧКИ "ДОБАВИТЬ В ИЗБРАННОЕ"
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


  return (

    <div className="page">
      <div className="page__box">

        <Header
          isRegLink={isRegLink}
          isLogLink={isLogLink}
          isProfileLink={isProfileLink}
          handleIsReg={handleIsReg}
          handleIsLog={handleIsLog}
          handleIsProfile={handleIsProfile}
          handleClickByLogo={handleClickByLogo}
        />

        <Switch>

          <Route path="/movies">
            <Movies
              cards={cards}
              countedCards={countedCards}
              handleCountCards={handleCountCards}
              handleIsActiveButtonSave={handleIsActiveButtonSave}
            />
          </Route>


          <Route path="/saved-movies">

          </Route>


          <Route path="/signup">
            <SignUp
              handleSubmitSignUp={handleSubmitSignUp}
            />
          </Route>

          <Route path="/signin">
            <SignIn
              handleSubmitSignIn={handleSubmitSignIn}
            />

          </Route>

          <Route path="/">
            <Main />
          </Route>



        </Switch>
        <Footer />


      </div>
    </div>
  )
};

export default App;
