import React from 'react';
import logo from './../../images/logo.svg';
import practicum_logo from './../../images/practicum_logo.svg';

function Header() {
  return (
    <header className="header">

      <div className="header__top">
        <img className="header__logo" src={logo} alt="Логотип сайта"></img>
        <div className="header__button-box">
          <button className="header__button-signup">Регистрация</button>
          <button className="header__button-signin">Войти</button>
        </div>
      </div>

      <div className="header__title-box">
        <img className="header__practicum-logo" src={practicum_logo} alt="Логотип Практикума"></img>
        <h1 className="header__title">Учебный проект студента факультета Веб-разработки.</h1>
      </div>

      <nav className="header__info-buttons">
        <button className="header__button-info">О проекте</button>
        <button className="header__button-info">Технологии</button>
        <button className="header__button-info">Студент</button>
      </nav>
    </header>
  )
}

export default Header;