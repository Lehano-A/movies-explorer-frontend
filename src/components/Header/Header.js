import React, { useEffect } from 'react';
import logo from './../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ isRegLink, isLogLink, isProfileLink, isPageNotFound, handleIsReg, handleIsLog, handleIsProfile, handleClickByLogo }) {

  const location = useLocation();
  const pathName = location.pathname;

  const signUpUrl = pathName === '/signup'; // URL ФОРМЫ РЕГИСТРАЦИИ
  const signInUrl = pathName === '/signin'; // URL ФОРМЫ АУТЕНТИФИКАЦИИ
  const profileUrl = pathName === '/profile'; // URL ФОРМЫ ПРОФАЙЛА
  const MainUrl = pathName === '/'; // URL ГЛАВНОЙ СТРАНИЦЫ

  // СТЭЙТ ВНУТРЕННЕЙ ССЫЛКИ ИЛИ URL - TRUE
  const activeLink = (isRegLink || signUpUrl) || (isLogLink || signInUrl) || (isProfileLink || profileUrl);

  // ПРИМЕНИТЬ СВЕТЛЫЙ ФОН ШАПКИ, НА ВСЕ СТРАНИЦЫ, КРОМЕ: ГЛАВНОЙ И 404
  function useLightBg() {
    if (!MainUrl && activeLink)
      return 'header_light-bg'
  }

  // УБРАТЬ ШАПКУ, ЕСЛИ 404
  function removeHead() {
    if (isPageNotFound)
      return 'header__head_disabled'
  }

  // В ШАПКЕ ТОЛЬКО ЛОГО (ДЛЯ - /signup, /signin)
  function showOnlyLogo() {
    if (activeLink && !MainUrl)
      return 'header__head_only-logo'
  }

  // ОБРАБОТЧИК ДАЛЬНЕЙШЕЙ ЛОГИКИ ПРИ НАЖАТИИ НА ССЫЛКИ
  // РЕГИСТРАЦИИ, АУТЕНТИФИКАЦИИ И ПРОФИЛЯ
  function handleRegLogProfile() {

    // ЕСЛИ ОТКРЫТА ФОРМА РЕГИСТРАЦИИ
    if (pathName === '/signup') {
      return <h1 className="signup__title">Добро пожаловать!</h1>;
    }

    // ЕСЛИ ОТКРЫТА ФОРМА АУТЕНТИФИКАЦИИ
    if (pathName === '/signin') {
      return <h1 className="signup__title">Рады видеть!</h1>;
    }

    // ЕСЛИ ПОЛЬЗОВАТЕЛЬ ЗАЛОГИНЕН, ТО ИНИЦИАЛИЗИРУЮТСЯ ССЫЛКИ:
    // ФИЛЬМЫ, СОХРАНЁННЫЕ ФИЛЬМЫ И АККАУНТ
    if (isProfileLink && (!isRegLink && !isLogLink)) {
      return <>
        <ul className="header__links">
          <li><Link to="/movies" className="header__link-movies">Фильмы</Link></li>
          <li><Link to="/saved-movies" className="header__link-saved-movies">Сохранённые фильмы</Link></li>
        </ul>
        <Link to="/profile" className="header__profile">
          <p>Аккаунт</p>
          <span className="header__profile-icon"></span>
        </Link>
      </>
    }

    // ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕЗАЛОГИНЕН
    if (!isProfileLink) {
      return <ul className="header__signin-signup-box">
        <li><Link onClick={handleIsReg} to="/signup" className="header__link-signup">Регистрация</Link></li>
        <li><Link onClick={handleIsLog} to="/signin" className="header__link-signin">Войти</Link></li>
      </ul>
    }
  }

  return (
    <header className={`Header ${useLightBg()} ${removeHead()}`}>

      <div className={`header__head ${showOnlyLogo()}`}>

        <Link onClick={handleClickByLogo} to="/"><img className="header__logo" src={logo} alt="Логотип сайта"></img></Link>

        {handleRegLogProfile()}

      </div>

    </header>

  )
}

export default Header;