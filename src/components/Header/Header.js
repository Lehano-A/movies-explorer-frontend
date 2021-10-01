import React, { useEffect } from 'react';
import logo from './../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';

function Header({ isRegLink, isLogLink, isProfileLink, isPageNotFound, handleIsReg, handleIsLog, handleIsProfile, handleClickByLogo }) {
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;

  const MainUrl = pathName === '/'; // URL ГЛАВНОЙ СТРАНИЦЫ

  function goToMainPage() {
    history.push('/')
  }

  // СТЭЙТ ВНУТРЕННЕЙ ССЫЛКИ ИЛИ URL - TRUE
  const activeLink = (isRegLink || isLogLink);

  // ПРИМЕНИТЬ СВЕТЛЫЙ ФОН ШАПКИ, НА ВСЕ СТРАНИЦЫ, КРОМЕ: ГЛАВНОЙ И 404
  function useLightBg() {
    return (!MainUrl && (activeLink || isProfileLink)) && 'header_light-bg'
  }

  // УБРАТЬ ШАПКУ, ЕСЛИ 404
  function removeHead() {
    return isPageNotFound && 'header__head_disabled'
  }

  // ПОКАЗЫВАЕМ В ШАПКЕ ТОЛЬКО ЛОГО (ДЛЯ - /signup, /signin)
  function showOnlyLogo() {
    return (activeLink && !MainUrl) && 'header__head_only-logo'
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
        <Link to="/profile" className="header__profile-button">
          <p>Аккаунт</p>
          <span className="header__profile-button-icon"></span>
        </Link>
      </>
    }

    // ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕЗАЛОГИНЕН
    if (!isProfileLink) {
      return <ul className="header__signin-signup-box">
        <li><Link to="/signup" className="header__link-signup">Регистрация</Link></li>
        <li><Link to="/signin" className="header__link-signin">Войти</Link></li>
      </ul>
    }
  }

  return (
    <header className={`Header ${useLightBg()} ${removeHead()}`}>

      <div className={`header__head ${showOnlyLogo()}`}>

        <Link to="/"><img onClick={goToMainPage} className="header__logo" src={logo} alt="Логотип сайта"></img></Link>

        {handleRegLogProfile()}

      </div>

    </header>

  )
}

export default Header;